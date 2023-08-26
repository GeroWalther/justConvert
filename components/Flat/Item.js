import { View, Text } from 'react-native';
import React from 'react';
import { format } from 'date-fns';

export default function Item({
  item: { converted, fromVal, toVal, input, id: date },
}) {
  const formattedDate = format(date, 'y MMM do');
  return (
    <View className='bg-slate-700  my-[1px] p-3'>
      <Text className='text-slate-200 text-xs'>{formattedDate}</Text>
      <View className='flex-row py-1'>
        <Text className='text-slate-200 font-semibold'>
          {input}
          {fromVal} to {toVal} = {converted}
          {toVal}
        </Text>
      </View>
    </View>
  );
}
