import { Text, Pressable } from 'react-native';
import React from 'react';

const Btn = ({ children = 'Convert', onPress }) => {
  return (
    <Pressable
      className='bg-lime-600 rounded-[15px] w-[80%] py-2'
      onPress={onPress}>
      <Text className='text-slate-50 text-center font-semibold text-lg '>
        {children}
      </Text>
    </Pressable>
  );
};

export default Btn;
