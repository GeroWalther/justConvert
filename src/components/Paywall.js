import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { openBrowserAsync } from 'expo-web-browser';

import { usePro } from '../pro';
import { useTheme } from '../theme';
import { success } from '../haptics';

const TERMS_URL = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';
const PRIVACY_URL = 'https://www.privacypolicies.com/live/bc37d64b-1024-4aec-9ede-2e5039536fcc';

function Benefit({ icon, children }) {
  const t = useTheme();
  return (
    <View style={styles.benefit}>
      <View style={[styles.benefitIcon, { backgroundColor: t.card }]}>
        <MaterialCommunityIcons name={icon} size={20} color={t.accent} />
      </View>
      <Text style={[styles.benefitText, { color: t.text }]}>{children}</Text>
    </View>
  );
}

export default function Paywall({ visible, onClose, unitCount, currencyCount, categoryCount }) {
  const t = useTheme();
  const { isPro, configured, loadPackages, purchase, restore } = usePro();
  const [packages, setPackages] = useState(null);
  const [failed, setFailed] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setFailed(false);
    setPackages(null);
    try {
      setPackages(await loadPackages());
    } catch (e) {
      setFailed(true);
    }
  }, [loadPackages]);

  useEffect(() => {
    if (visible && !isPro) load();
  }, [visible, isPro, load, configured]);

  async function buy(pkg) {
    setBusy(true);
    try {
      if (await purchase(pkg)) success();
    } catch (e) {
      Alert.alert('Purchase not completed', 'Something went wrong and you have not been charged. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  async function restorePurchases() {
    setBusy(true);
    try {
      if (await restore()) {
        success();
        Alert.alert('Welcome back', 'Your Pro purchase has been restored.');
      } else {
        Alert.alert('Nothing to restore', 'No Pro purchase was found for this Apple Account.');
      }
    } catch (e) {
      Alert.alert('Could not restore', 'Please check your connection and try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={[styles.sheet, { backgroundColor: t.bg }]}>
        <Pressable onPress={onClose} hitSlop={12} accessibilityRole="button" accessibilityLabel="Close" style={[styles.close, { backgroundColor: t.card }]}>
          <MaterialCommunityIcons name="close" size={20} color={t.text} />
        </Pressable>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={[styles.crown, { backgroundColor: t.card, borderColor: t.gold }]}>
            <MaterialCommunityIcons name="crown" size={34} color={t.gold} />
          </View>
          <Text style={[styles.title, { color: t.text }]}>{isPro ? 'You have Pro' : 'justConvert Pro'}</Text>
          <Text style={[styles.subtitle, { color: t.muted }]}>
            {isPro ? 'Every unit and currency is unlocked. Thank you for your support!' : 'Pay once. Every unit and every currency, for good.'}
          </Text>

          <View style={styles.benefits}>
            <Benefit icon="cash-multiple">{currencyCount > 5 ? `${currencyCount} currencies` : 'All currencies'} with daily exchange rates</Benefit>
            <Benefit icon="format-list-bulleted">
              All {unitCount} units across {categoryCount} categories
            </Benefit>
            <Benefit icon="infinity">One-time purchase, no subscription</Benefit>
          </View>

          {isPro ? (
            <Pressable onPress={onClose} style={[styles.buy, { backgroundColor: t.accent }]} accessibilityRole="button">
              <Text style={[styles.buyText, { color: t.onAccent }]}>Done</Text>
            </Pressable>
          ) : busy || (!packages && !failed) ? (
            <ActivityIndicator size="large" color={t.accent} style={styles.spinner} />
          ) : failed ? (
            <View style={styles.failed}>
              <Text style={[styles.failedText, { color: t.muted }]}>The store could not be reached. Check your connection and try again.</Text>
              <Pressable onPress={load} style={[styles.retry, { borderColor: t.border, backgroundColor: t.card }]} accessibilityRole="button">
                <Text style={[styles.retryText, { color: t.text }]}>Try again</Text>
              </Pressable>
            </View>
          ) : (
            packages.map((pkg) => (
              <Pressable
                key={pkg.identifier}
                onPress={() => buy(pkg)}
                accessibilityRole="button"
                accessibilityLabel={`Upgrade for ${pkg.product.priceString}`}
                style={({ pressed }) => [styles.buy, { backgroundColor: t.accent, opacity: pressed ? 0.85 : 1 }]}>
                <Text style={[styles.buyText, { color: t.onAccent }]}>Upgrade for {pkg.product.priceString}</Text>
                <Text style={[styles.buySub, { color: t.onAccent }]}>One-time payment</Text>
              </Pressable>
            ))
          )}

          {!isPro && !busy ? (
            <Pressable onPress={restorePurchases} hitSlop={10} accessibilityRole="button" style={styles.restore}>
              <Text style={[styles.restoreText, { color: t.accent }]}>Restore purchase</Text>
            </Pressable>
          ) : null}

          {!isPro ? (
            <Text style={[styles.legal, { color: t.faint }]}>
              Payment is charged to your Apple Account when you confirm the purchase. This is a single payment, not a subscription: upgrade once and Pro
              stays unlocked. By upgrading you agree to the Terms of Use and the Privacy Policy.
            </Text>
          ) : null}
          <View style={styles.links}>
            <Pressable onPress={() => openBrowserAsync(TERMS_URL)} hitSlop={8} accessibilityRole="link">
              <Text style={[styles.link, { color: t.muted }]}>Terms of Use</Text>
            </Pressable>
            <Pressable onPress={() => openBrowserAsync(PRIVACY_URL)} hitSlop={8} accessibilityRole="link">
              <Text style={[styles.link, { color: t.muted }]}>Privacy Policy</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  sheet: { flex: 1 },
  close: { position: 'absolute', top: 16, right: 16, zIndex: 2, width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  content: { paddingHorizontal: 24, paddingTop: 44, paddingBottom: 48, alignItems: 'center', maxWidth: 560, width: '100%', alignSelf: 'center' },
  crown: { width: 72, height: 72, borderRadius: 36, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  title: { fontSize: 28, fontWeight: '800', textAlign: 'center' },
  subtitle: { fontSize: 16, textAlign: 'center', marginTop: 8, lineHeight: 22 },
  benefits: { alignSelf: 'stretch', marginTop: 26, marginBottom: 26, gap: 14 },
  benefit: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  benefitIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  benefitText: { flex: 1, fontSize: 16, fontWeight: '500' },
  buy: { alignSelf: 'stretch', borderRadius: 16, paddingVertical: 15, alignItems: 'center', marginBottom: 10 },
  buyText: { fontSize: 18, fontWeight: '800' },
  buySub: { fontSize: 12, fontWeight: '600', opacity: 0.85, marginTop: 2 },
  spinner: { marginVertical: 22 },
  failed: { alignSelf: 'stretch', alignItems: 'center', gap: 12, marginBottom: 6 },
  failedText: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
  retry: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 20, paddingVertical: 10 },
  retryText: { fontSize: 15, fontWeight: '700' },
  restore: { marginTop: 8, paddingVertical: 8 },
  restoreText: { fontSize: 15, fontWeight: '700' },
  legal: { fontSize: 11, lineHeight: 16, textAlign: 'center', marginTop: 18 },
  links: { flexDirection: 'row', gap: 24, marginTop: 14 },
  link: { fontSize: 12, textDecorationLine: 'underline' },
});
