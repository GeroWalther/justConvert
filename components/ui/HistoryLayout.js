import { FlatList, Text, View, Dimensions } from 'react-native';
import React from 'react';
import ClearBtn from '../Btn/ClearBtn';
import Item from '../Flat/Item';

export default function HistoryLayout({ items, clearAll }) {
  if (items.length === 0) return null;
  const screenHeight = Dimensions.get('window').height;
  const marginTop = screenHeight <= 667 ? '35%' : '20%';
  return (
    <View style={{ flex: 1, marginTop: marginTop }}>
      <View className='flex-row justify-between items-center p-4'>
        <Text className='text-slate-50 font-semibold text-lg'>
          Recent Convert History
        </Text>
        <ClearBtn onPress={clearAll} />
      </View>
      <FlatList
        data={items}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
