import { View, Text, Pressable, ScrollView } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

function CloseBtn({ onClose, children }) {
  return (
    <Pressable onPress={onClose} className='bg-red-900 rounded-xl py-2 px-2'>
      <Text className='text-slate-50 text-center font-semibold text-lg '>
        {children}
      </Text>
    </Pressable>
  );
}
export const ActionBtn = ({ children, onPress }) => {
  return (
    <Pressable className='bg-teal-500 rounded-xl px-5 py-2' onPress={onPress}>
      <Text className='text-slate-50 text-center font-semibold text-lg'>
        {children}
      </Text>
    </Pressable>
  );
};

const ProMemberModal = ({ onClose, isVisible }) => {
  const navigation = useNavigation();
  return (
    <Modal onBackdropPress={onClose} isVisible={isVisible}>
      <View className='bg-slate-300 rounded-lg flex-row justify-center items-center'>
        <ScrollView>
          <View className='p-3'>
            <Text className='font-bold text-slate-800 text-lg mb-4'>
              Subscribe and upgrade to have access to all available units and
              currency pairs!
            </Text>
            <Text className='font-semibold text-slate-800 mb-2 text-base'>
              All included units:
            </Text>
            <Text className='font-semibold text-slate-800 '>Currencies:</Text>
            <Text>
              AUD, BGN, BRL, CAD, CHF, CNY, CZK, DKK, EUR, GBP, HKD, HUF, IDR,
              ILS, INR, ISK, JPY, KRW, MXN, MYR, NOK, NZD, PHP, PLN, RON, SEK,
              SGD, THB, TRY, USD, ZAR
            </Text>
            <Text className='font-semibold text-slate-800 mt-3'>Weights:</Text>
            <Text>
              Gram (g), Kilogram (kg), Milligram (mg), Microgram (µg), Metric
              Ton (ton), Pound (lb), Ounce (oz), Cup Flour (US), Cup Sugar (US),
              Cup Rice (US), Cup Oats (US)
            </Text>
            <Text className='font-semibold text-slate-800 mt-3'>Lengths:</Text>
            <Text>
              Millimeter (mm), Centimeter (cm), Meter (m), Kilometer (km), Inch
              (in), Foot (ft), Yard (yd), Mile (mi), Sea Mile (nmi)
            </Text>
            <Text className='font-semibold text-slate-800 mt-3'>Volumes:</Text>
            <Text>
              Milliliter (ml), Centiliter (cl), Deciliter (dl), Liter (l), Cubic
              Centimeter (cm³), Cubic Meter (m³), Fluid Ounce (fl-oz), Gallon
              (US), Pint (US), Cup (US)
            </Text>
            <Text className='font-semibold text-slate-800 mt-3'>Areas:</Text>
            <Text>
              Square Millimeter (mm²), Square Centimeter (cm²), Square Meter
              (m²), Square Kilometer (km²), Square Inch (in²), Square Foot
              (ft²), Square Yard (yd²), Square Mile (mi²), Acre (ac), Hectare
              (ha), Tatami Mat
            </Text>

            <View className='flex-row justify-around mt-6'>
              <ActionBtn
                onPress={() => {
                  onClose();
                  navigation.navigate('SubModal');
                }}>
                Upgrade Now
              </ActionBtn>
              <CloseBtn onClose={onClose}>Not for now</CloseBtn>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};
export default ProMemberModal;
