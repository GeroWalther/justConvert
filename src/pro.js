// The one-time "Pro" purchase, handled by RevenueCat. The entitlement is called
// `pro`, exactly as in version 1, so everyone who already bought it keeps it.
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import Purchases from 'react-native-purchases';

import { loadJSON, saveJSON } from './storage';

// Keys are public SDK keys. Anything that is not part of a key (a stray ";" in
// .env made version 1 fall back to a hard-coded copy) is stripped.
const clean = (key) => (key || '').replace(/[^A-Za-z0-9_]/g, '');
const IOS_KEY = clean(process.env.EXPO_PUBLIC_IOS_REVCAT_KEY) || 'appl_IdXjoLTYMEwWUxxFnmQHIcCvKOO';
const ANDROID_KEY = clean(process.env.EXPO_PUBLIC_ANDROID_REVCAT_KEY);
const CACHE_KEY = 'jc.pro.v1';

const ProContext = createContext({ isPro: false });

function hasPro(info) {
  return !!(info && info.entitlements && info.entitlements.active && info.entitlements.active.pro);
}

export function ProProvider({ children }) {
  const [isPro, setIsPro] = useState(false);
  const [configured, setConfigured] = useState(false);

  const apply = useCallback((info) => {
    const pro = hasPro(info);
    setIsPro(pro);
    saveJSON(CACHE_KEY, pro);
    return pro;
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      // Remembered so a Pro customer is not locked out while offline or while the store is slow.
      const remembered = await loadJSON(CACHE_KEY, false);
      if (alive && remembered) setIsPro(true);

      const apiKey = Platform.OS === 'ios' ? IOS_KEY : ANDROID_KEY;
      const usable = Platform.OS === 'ios' ? apiKey.startsWith('appl_') : apiKey.startsWith('goog_');
      if (!usable) return;
      try {
        Purchases.configure({ apiKey });
        if (!alive) return;
        setConfigured(true);
        Purchases.addCustomerInfoUpdateListener((info) => {
          if (alive) apply(info);
        });
        const info = await Purchases.getCustomerInfo();
        if (alive) apply(info);
      } catch (e) {
        // Keep whatever we remembered; the listener corrects it once the store answers.
      }
    })();
    return () => {
      alive = false;
    };
  }, [apply]);

  const loadPackages = useCallback(async () => {
    if (!configured) throw new Error('store not ready');
    const offerings = await Purchases.getOfferings();
    const packages = offerings && offerings.current ? offerings.current.availablePackages : [];
    if (!packages || !packages.length) throw new Error('nothing for sale');
    return packages;
  }, [configured]);

  // Resolves to true when the purchase unlocked Pro, false when the user cancelled.
  const purchase = useCallback(
    async (pkg) => {
      try {
        const result = await Purchases.purchasePackage(pkg);
        return apply(result.customerInfo);
      } catch (e) {
        if (e && e.userCancelled) return false;
        throw e;
      }
    },
    [apply]
  );

  const restore = useCallback(async () => apply(await Purchases.restorePurchases()), [apply]);

  const value = useMemo(() => ({ isPro, configured, loadPackages, purchase, restore }), [isPro, configured, loadPackages, purchase, restore]);
  return <ProContext.Provider value={value}>{children}</ProContext.Provider>;
}

export function usePro() {
  return useContext(ProContext);
}
