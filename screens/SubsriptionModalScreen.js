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
              <Text className='text-orange-400 underline'>
                Restore Purchases
              </Text>
            </Pressable>
          )}
        </View>

        <Text className='text-sm text-slate-400 p-3 fixed'>
          * By clicking 'Subscribe & Pay' you agree to the terms our of
          conditions and subscribe to a monthly/yearly subscription
        </Text>
      </View>
    </ScrollView>
  );
};

export default SubsriptionModalScreen;
