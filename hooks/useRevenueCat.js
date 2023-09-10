import { Platform } from 'react-native';
import Purchases from 'react-native-purchases';
import { useState, useEffect } from 'react';

function useRevenueCat() {
  const [currentOffering, setCurrentOffering] = useState(null);
  const [customerInfo, setCustomerInfo] = useState(null);
  const isProMember = customerInfo?.activeSubscriptions.includes('pro');

  useEffect(() => {
    const fetchData = async () => {
      // Purchases.setDebugEnabled(true);
      if (Platform === 'android') {
        await Purchases.configure({
          apiKey: process.env.EXPO_PUBLIC_ANDROID_REVCAT_KEY,
        });
      } else {
        await Purchases.configure({
          apiKey: 'appl_IdXjoLTYMEwWUxxFnmQHIcCvKOO',
        });
      }
      const offerings = await Purchases.getOfferings();
      console.log('OFERINGS: ', offerings);
      const customerInfo = await Purchases.getCustomerInfo();
      console.log('CUSTOMERINFO: ', customerInfo);

      if (offerings.current !== null) {
        setCurrentOffering(offerings.current);
      }
      setCustomerInfo(customerInfo);
    };

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const customerInfoUpdated = async (purchaserInfo) => {
      setCustomerInfo(purchaserInfo);
    };
    Purchases.addCustomerInfoUpdateListener(customerInfoUpdated);
  }, []);
  return { currentOffering, customerInfo, isProMember };
}
export default useRevenueCat;
