import { Pressable } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const SwapBtn = ({ onPress }) => {
  return (
    <Pressable className='bg-red-700  rounded-lg py-1 px-2' onPress={onPress}>
      <MaterialCommunityIcons
        name='delete-forever-outline'
        size={20}
        color='yellow'
      />
    </Pressable>
  );
};

export default SwapBtn;
