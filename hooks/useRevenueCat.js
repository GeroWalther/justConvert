import { Platform } from 'react-native';
import Purchases from 'react-native-purchases';
import { useQuery, useQueryClient } from '@tanstack/react-query';

function useRevenueCat() {
  const queryClient = useQueryClient();

  queryClient.invalidateQueries({ queryKey: ['customerInfo'] });

  const { data: currentOffering, isLoading: isOfferingLoading } = useQuery(
    ['currentOffering'],
    fetchCurrentOffering
  );

  const { data: customerInfo, isLoading: isCustomerInfoLoading } = useQuery(
    ['customerInfo'],
    fetchCustomerInfo
  );

  const isProMember =
    Array.isArray(customerInfo?.activeSubscriptions) &&
    customerInfo?.activeSubscriptions.length > 0;

  async function fetchCurrentOffering() {
    if (Platform.OS === 'android') {
      await Purchases.configure({
        apiKey: process.env.EXPO_PUBLIC_ANDROID_REVCAT_KEY,
      });
    } else {
      await Purchases.configure({
        apiKey: 'appl_IdXjoLTYMEwWUxxFnmQHIcCvKOO',
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
    isOfferingLoading,
    isCustomerInfoLoading,
  };
}
export default useRevenueCat;
