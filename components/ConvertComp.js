import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Keyboard,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { currencies } from '../constants';
import { useCurrConvert } from '../hooks/useCurrConvert';

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
    <>
      <Text className='text-slate-50 font-semibold text-center text-lg p-4 mb-5'>
        {!error ? 'justConverter' : 'Error converting !!'}
      </Text>
      <View className='justify-center flex-row items-center gap-3'>
        <TextInput
          className='pt-3 pb-5 px-2 text-center text-slate-800 bg-[#f0f0f0] font-semibold text-lg rounded-lg w-[50%]'
          keyboardType='number-pad'
          value={text}
          onChangeText={(tx) => setText(tx)}
          editable={!isLoading}
        />
        <View className='items-center'>
          <View className='flex-row mx-2 my-2 gap-2 '>
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
          <Pressable
            className='bg-lime-600 rounded-[15px] w-[80%] py-2'
            onPress={convertHandler}>
            <Text className='text-slate-50 text-center font-semibold text-lg '>
              Convert
            </Text>
          </Pressable>
        </View>
      </View>
      <View className='flex items-center justify-center mt-8 bg-slate-900 py-4'>
        <Text className='text-slate-50 text-center font-bold text-xl'>
          {isLoading ? 'Converting...' : `${convertedCur} ${toCur}`}
        </Text>
      </View>
    </>
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
