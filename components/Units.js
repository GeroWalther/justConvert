import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

import Input from './Inputs/Input';

export default function Units() {
  const [gr, setGr] = useState('0');
  const convertedGrToLbs = (gr * 0.00220462).toFixed(2);
  const [kg, setKg] = useState('0');
  const convertedKgToLbs = (kg * 2.20462).toFixed(2);

  return (
    <ScrollView>
      <View className='flex-row p-4 justify-between items-center'>
        <Input text={gr} setText={(tx) => setGr(tx)} />
        <Text className='text-slate-50 font-bold text-xl'>gramms to lbs</Text>
      </View>
      <View className='flex items-center justify-center bg-slate-900 py-4'>
        <Text className='text-slate-50 text-center font-bold text-xl'>
          {convertedGrToLbs} lbs
        </Text>
      </View>
      <View className='flex-row p-4 justify-between items-center mt-10'>
        <Input text={kg} setText={(tx) => setKg(tx)} />
        <Text className='text-slate-50 font-bold text-xl'>
          kilogramm to lbs
        </Text>
      </View>
      <View className='flex items-center justify-center bg-slate-900 py-4'>
        <Text className='text-slate-50 text-center font-bold text-xl'>
          {convertedKgToLbs} lbs
        </Text>
      </View>
    </ScrollView>
  );
}
