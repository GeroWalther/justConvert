import React from 'react';
import { View, Text } from 'react-native';
import ConvertComp from '../components/ConvertComp';

const CurrencyScreen = () => {
  return (
    <View className='bg-slate-600 flex-1'>
      <Text className='text-slate-50 font-semibold text-center text-lg p-4 mb-5'>
        justConvert logo
      </Text>
      <ConvertComp />
    </View>
  );
};

export default CurrencyScreen;
