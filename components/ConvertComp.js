import { useState } from 'react';
import { View, Text, StyleSheet, Keyboard, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { currencies } from '../constants';
import { useCurrConvert } from '../hooks/useCurrConvert';
import GreenBtn from './Btn/GreenBtn';
import Input from './Inputs/Input';

const ConvertComp = () => {
  const [text, setText] = useState('1');
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState('EUR');
  const [toCur, setToCur] = useState('USD');

  const { isLoading, error, convertedCur } = useCurrConvert(
    amount,
    fromCur,
    toCur
  );

  function convertHandler() {
    setAmount(Number(text));
    Keyboard.dismiss();
  }

  return (
    <ScrollView className='flex-1 gap-10'>
      <View className='flex-row justify-around items-center px-4'>
        <Input
          text={text}
          setText={(tx) => setText(tx)}
          editable={!isLoading}
        />
        <View className='gap-3 w-[35%]'>
          <View>
            <RNPickerSelect
              value={fromCur}
              onValueChange={(value) => {
                if (value !== '' && value !== toCur) {
                  setFromCur(value);
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
              items={currencies}
            />
          </View>
          <View>
            <RNPickerSelect
              value={toCur}
              onValueChange={(value) => {
                if (value !== '' && value !== fromCur) {
                  setToCur(value);
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
              items={currencies}
            />
          </View>
        </View>
      </View>
      <View className='items-center mt-8'>
        <GreenBtn onPress={convertHandler} />
      </View>
      <View className='flex items-center justify-center mt-8 bg-slate-900 py-4'>
        <Text className='text-slate-50 text-center font-bold text-xl'>
          {isLoading ? 'Converting...' : `${convertedCur} ${toCur}`}
          {error && 'Error converting !!'}
        </Text>
      </View>
    </ScrollView>
  );
};

export default ConvertComp;

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
