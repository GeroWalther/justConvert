import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { weights } from '../constants';
import GreenBtn from './Btn/GreenBtn';
import Input from './Inputs/Input';

const UnitConvert = () => {
  // const [gr, setGr] = useState('0');
  // const convertedGrToLbs = (gr * 0.00220462).toFixed(2);
  // const convertedKgToLbs = (kg * 2.20462).toFixed(2);

  const [fromVal, setFromVal] = useState('gr');
  const [toVal, setToVal] = useState('lb');
  const [input, setInput] = useState('0');

  function convertHandler() {
    Keyboard.dismiss();
  }

  return (
    <ScrollView className='flex-1 gap-10'>
      <View className='flex-row justify-around items-center px-4'>
        <Input text={input} setText={(tx) => setInput(tx)} />
        <View className='gap-3 w-[45%]'>
          <View>
            <RNPickerSelect
              value={fromVal}
              onValueChange={(value) => {
                if (value !== '' && value !== toVal) {
                  setFromVal(value);
                } else {
                  return;
                }
              }}
              style={pickerSelectStyles}
              placeholder={{
                label: 'select',
                value: '',
                color: '#9EA0A4',
                disabled: true,
              }}
              items={weights}
            />
          </View>
          <View>
            <RNPickerSelect
              value={toVal}
              onValueChange={(value) => {
                if (value !== '' && value !== fromVal) {
                  setToVal(value);
                } else {
                  return;
                }
              }}
              style={pickerSelectStyles}
              placeholder={{
                label: 'select',
                value: '',
                color: '#9EA0A4',
                disabled: true,
              }}
              items={weights}
            />
          </View>
        </View>
      </View>
      <View className='items-center mt-8'>
        <GreenBtn onPress={convertHandler} />
      </View>
      <View className='flex items-center justify-center bg-slate-900 py-4'>
        <Text className='text-slate-50 text-center font-bold text-xl'>
          {/* {converted}  */}
          lbs
        </Text>
      </View>
    </ScrollView>
  );
};

export default UnitConvert;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: '#2c2c2c',
    backgroundColor: '#f0f0f0',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 15,
    height: 44,
    width: '100%',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputAndroid: {
    color: '#2c2c2c',
    backgroundColor: '#e2e2e2',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    height: 34,
    width: '30%',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
