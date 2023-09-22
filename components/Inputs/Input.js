import { TextInput, Platform } from 'react-native';
import React from 'react';

const Input = ({
  text,
  setText,
  editable = true,
  keyboard = 'decimal-pad',
}) => {
  return (
    <TextInput
      className={`pt-3 pb-5 px-2 text-center text-slate-800 bg-[#f0f0f0] font-semibold text-lg rounded-lg w-[50%] ${
        Platform.OS === 'android' && 'pb-3 w-[40%] rounded-none'
      }`}
      keyboardType={keyboard}
      value={text}
      onChangeText={setText}
      editable={editable}
      maxLength={14}
    />
  );
};

export default Input;
