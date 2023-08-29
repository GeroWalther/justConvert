import React from 'react';
import { View } from 'react-native';
import CurrConvert from '../components/CurrConvert';
import Logo from '../components/logo/Logo';

const CurrencyConvertScreen = () => {
  return (
    <View className='bg-slate-600 flex-1'>
      <Logo />
      <CurrConvert />
    </View>
  );
};

export default CurrencyConvertScreen;
