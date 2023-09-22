import { Pressable, Text } from 'react-native';
import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
export default SubBtn = ({ onPress }) => {
  return (
    <Pressable
      className='bg-slate-900 rounded-xl py-1 px-2 flex-row items-center'
      onPress={onPress}>
      <FontAwesome5 name='product-hunt' size={24} color='#cbd5e1' />
      <Text className='text-slate-300 ml-1'>Upgrade</Text>
    </Pressable>
  );
};
