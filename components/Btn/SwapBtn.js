import { Pressable } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
const SwapBtn = ({ onPress }) => {
  return (
    <Pressable className='bg-slate-900 rounded-xl py-2 px-4' onPress={onPress}>
      <Ionicons name='swap-vertical' size={30} color='yellow' />
    </Pressable>
  );
};

export default SwapBtn;
