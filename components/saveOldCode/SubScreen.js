import {
  ScrollView,
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { ActionBtn } from '../components/ui/ProMemberModal.js';
import Purchases from 'react-native-purchases';
import useRevenueCat from '../hooks/useRevenueCat';
import { openBrowserAsync } from 'expo-web-browser';

function CloseBtn({ onClose }) {
  return (
    <Pressable
      onPress={onClose}
      className='rounded-xl py-2 px-2 w-10 fixed top-4 left-4 mb-8'>
      <AntDesign name='closecircle' size={24} color='#ef4444' />
    </Pressable>
  );
}
function Card({ title, price = '$2.99', period = 'monthly', trial, onPress }) {
  return (
    <View className='bg-slate-500 px-7 py-5 mb-8 rounded-lg items-center'>
      <Text className='uppercase text-slate-200 text-lg'>{title}</Text>
      <Text className='text-base text-slate-200 p-3 text-center'>
        <Text className='font-bold'>{price}</Text> / {period} {trial}
      </Text>
      <ActionBtn onPress={onPress}>Subscribe & Pay</ActionBtn>
    </View>
  );
}

const SubsriptionModalScreen = ({ navigation }) => {
  const { currentOffering, isOfferingLoading, changeSubStatus } =
    useRevenueCat();
  const [isLoading, setIsLoading] = useState(false);

  async function payNsubcribe(pk) {
    try {
      setIsLoading(true);
      const purchaserInfo = await Purchases.purchasePackage(pk);

      if (purchaserInfo.customerInfo.entitlements.active.pro) {
        navigation.goBack();
      }
    } catch (e) {
      if (!e.userCancelled) {
        console.log(e);
      }
    } finally {
      setIsLoading(false);
      changeSubStatus();
    }
  }

  async function restorePurchases() {
    setIsLoading(true);
    const purchaserInfo = await Purchases.restorePurchases();

    if (purchaserInfo.activeSubscriptions.length > 0) {
      Alert.alert('Success 🎉', 'Your purchase has been restored!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } else {
      Alert.alert('Error ❌', 'No purchases to restore.');
    }

    setIsLoading(false);
  }

  const getPkTypeString = (type) => {
    if (type === 'MONTHLY') return 'monthly';
    else if (type === 'ANNUAL') return 'yearly';
  };
  // console.log(currentOffering?.availablePackages);
  return (
    <ScrollView className='bg-slate-700'>
      <CloseBtn onClose={() => navigation.goBack()} />

      <View className='items-center'>
        <View className='items-center justify-between px-3 py-4'>
          <Text className='text-4xl text-center text-slate-200 mb-10'>
            Subscribe and get full access to all features
          </Text>
          {isOfferingLoading || isLoading ? (
            <ActivityIndicator />
          ) : (
            currentOffering.availablePackages.map((pk) => (
              <Card
                key={pk.identifier}
                title={pk.product.title}
                price={pk.product.priceString}
                period={getPkTypeString(pk.packageType)}
                trial={
                  pk.product.introPrice &&
                  `after ${
                    pk.product.introPrice.periodNumberOfUnits
                  } ${pk.product.introPrice.periodUnit.toLowerCase()} free trial ends`
                }
                onPress={() => payNsubcribe(pk)}
              />
            ))
          )}
          {isOfferingLoading || isLoading ? null : (
            <Pressable onPress={restorePurchases}>
              <Text className='text-orange-400 underline mb-5'>
                Restore Purchases
              </Text>
            </Pressable>
          )}
        </View>

        <Text className='text-xs text-slate-400 p-3 fixed text-center'>
          *By clicking 'Subscribe & Pay' you agree to the terms of use, privacy
          policy and subscribe to a monthly/yearly subscription. Price of
          subscription will be charged to your credit card through your Apple
          account at confirmation of purchase. subscription automatically renews
          unless auto-renew is turned off at least 24 hours before the current
          period. account will be charged for renewal within 24-hours prior to
          the end of the current period and identify the cost of the renewal.
          You can cancel anytime with your iTunes account settings. Any unused
          portion of a free trial will be forfeited if you purchase a
          subscription. Manage your subscription in account Settings after
          purchase.
        </Text>
        <View className='flex-row gap-5'>
          <Pressable
            onPress={() =>
              openBrowserAsync(
                'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/'
              )
            }>
            <Text className='text-slate-400 underline text-xs pb-5'>
              Terms of Use
            </Text>
          </Pressable>
          <Pressable
            onPress={() =>
              openBrowserAsync(
                'https://www.privacypolicies.com/live/bc37d64b-1024-4aec-9ede-2e5039536fcc'
              )
            }>
            <Text className='text-slate-400 underline text-xs pb-5'>
              Privacy Policy
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default SubsriptionModalScreen;
