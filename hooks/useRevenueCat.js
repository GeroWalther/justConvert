import { Platform } from 'react-native';
import Purchases from 'react-native-purchases';
import { useQuery } from '@tanstack/react-query';
import {
  EXPO_PUBLIC_IOS_REVCAT_KEY,
  EXPO_PUBLIC_ANDROID_REVCAT_KEY,
} from '../credentials';

function useRevenueCat() {
  const {
    data: currentOffering,
    error: offeringError,
    isLoading: isOfferingLoading,
  } = useQuery(['currentOffering'], fetchCurrentOffering);

  const {
    data: customerInfo,
    error: customerInfoError,
    isLoading: isCustomerInfoLoading,
  } = useQuery(['customerInfo'], fetchCustomerInfo);

  const isProMember = customerInfo?.activeSubscriptions;

  async function fetchCurrentOffering() {
    if (Platform.OS === 'android') {
      await Purchases.configure({
        apiKey: EXPO_PUBLIC_ANDROID_REVCAT_KEY,
      });
    } else {
      await Purchases.configure({
        apiKey: EXPO_PUBLIC_IOS_REVCAT_KEY,
      });
    }

    const offerings = await Purchases.getOfferings();
    return offerings.current;
  }

  async function fetchCustomerInfo() {
    const customerInfo = await Purchases.getCustomerInfo();
    return customerInfo;
  }

  return {
    currentOffering,
    customerInfo,
    isProMember,
    offeringError,
    customerInfoError,
    isOfferingLoading,
    isCustomerInfoLoading,
  };
}
export default useRevenueCat;
