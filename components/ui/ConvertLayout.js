import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import GreenBtn from '../Btn/GreenBtn';
import Input from '../Inputs/Input';
import SwapBtn from '../Btn/SwapBtn';

const ConvertLayout = ({
  converted,
  input,
  convertHandler,
  switchHandler,
  fromVal,
  toVal,
  setToVal,
  setFromVal,
  setInput,
  items1,
  items2,
  isLoading = null,
  error = null,
}) => {
  return (
    <ScrollView className='flex-1 gap-10'>
      <View className='flex-row justify-around items-center px-4'>
        <Input text={input} setText={(tx) => setInput(tx)} />
        <View className='gap-3 items-center'>
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
              items={items1}
            />
          </View>
          <Entypo name='arrow-bold-down' size={24} color='yellow' />
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
              items={items2}
            />
          </View>
        </View>
      </View>
      <View className='mt-8 flex-row justify-evenly'>
        <GreenBtn onPress={convertHandler} />
        <SwapBtn onPress={switchHandler} />
      </View>

      <View className='flex items-center justify-center bg-slate-900 py-4'>
        <Text className='text-slate-50 text-center font-bold text-xl'>
          {isLoading ? 'Converting...' : `${converted} ${toVal}`}
          {error && 'Error converting !!'}
        </Text>
      </View>
    </ScrollView>
  );
};

export default ConvertLayout;

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
