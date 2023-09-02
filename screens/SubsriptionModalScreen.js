import { ScrollView, View, Text, Pressable } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { ActionBtn } from '../components/ui/ProMemberModal.js';

function CloseBtn({ onClose }) {
  return (
    <Pressable
      onPress={onClose}
      className='rounded-xl py-2 px-2 w-10 fixed top-4 left-4 mb-8'>
      <AntDesign name='closecircle' size={24} color='#ef4444' />
    </Pressable>
  );
}

const SubsriptionModalScreen = ({ navigation }) => {
  return (
    <ScrollView className='bg-slate-700'>
      <CloseBtn onClose={() => navigation.goBack()} />
      <View className='items-center'>
        <View className='items-center justify-between px-3 py-4'>
          <Text className='text-4xl text-center text-slate-200 mb-10'>
            Subscribe and get full access to all features
          </Text>
          <View className='bg-slate-500 px-7 py-5 mb-8 rounded-lg items-center'>
            <Text className='text-base text-slate-200 p-3 uppercase'>
              monthly $2.99
            </Text>
            <ActionBtn onPress={() => {}}>Subscribe & Pay</ActionBtn>
          </View>
          <View className='bg-slate-500 px-7 py-5 mb-5 rounded-lg items-center'>
            <Text className='text-base text-slate-200 p-3 uppercase'>
              yearly $8.99
            </Text>
            <ActionBtn onPress={() => {}}>Subscribe & Pay</ActionBtn>
          </View>
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
