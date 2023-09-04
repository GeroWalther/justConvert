import {
  ScrollView,
  View,
  Text,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { ActionBtn } from '../components/ui/ProMemberModal.js';
import { useProSub } from '../components/context/ctx.js';
//import Purchases from 'react-native-purchases';

function CloseBtn({ onClose }) {
  return (
    <Pressable
      onPress={onClose}
      className='rounded-xl py-2 px-2 w-10 fixed top-4 left-4 mb-8'>
      <AntDesign name='closecircle' size={24} color='#ef4444' />
    </Pressable>
  );
}
function Card({ price = '$2.99', period = 'monthly', trial, onPress }) {
  return (
    <View className='bg-slate-500 px-7 py-5 mb-8 rounded-lg items-center'>
      <Text className='text-base text-slate-200 p-3 uppercase'>
        {period} {price} {trial}
      </Text>
      <ActionBtn onPress={onPress}>Subscribe & Pay</ActionBtn>
    </View>
  );
}

const SubsriptionModalScreen = ({ navigation }) => {
  const { setProMenber } = useProSub();
  const [offer, setOffer] = useState(null);
  const fetchOfferings = async () => {
    try {
      const offerings = await Purchases.getOfferings();
      if (offerings.current !== null) {
        setOffer(offerings.current);
      }
      console.log(offerings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOfferings();
  }, []);

  async function payNsubcribe(pk) {
    try {
      const purchaseMade = await Purchases.purchasePackage(pk);
      if (
        typeof purchaseMade.purchaserInfo.entitlements.active.pro !==
        'undefined'
      ) {
        setProMenber(true);
        navigation.goBack();
      }
    } catch (e) {
      if (!e.userCancelled) {
        console.log(e);
      }
    }
  }

  const getPkTypeString = (type) => {
    if (type === 'MONTHLY') return 'monthly';
    else if (type === 'ANNUAL') return 'yearly';
  };
  return (
    <ScrollView className='bg-slate-700'>
      <CloseBtn onClose={() => navigation.goBack()} />
      <View className='items-center'>
        <View className='items-center justify-between px-3 py-4'>
          <Text className='text-4xl text-center text-slate-200 mb-10'>
            Subscribe and get full access to all features
          </Text>
          {!offer ? (
            <ActivityIndicator />
          ) : (
            offer.availablePackages.map((pk) => (
              <Card
                key={pk.identifier}
                price={pk.product.price_string}
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
        </View>
        <Text className='text-sm text-slate-400 p-3 fixed'>
          * By clicking 'Subscribe & Pay' you agree to the terms our of
          conditions and subscribe to a monthly/yearly subcription
        </Text>
      </View>
    </ScrollView>
  );
};

export default SubsriptionModalScreen;
