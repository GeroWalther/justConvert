import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

import Input from '../Inputs/Input';

export default function Units() {
  const [gr, setGr] = useState('0');
  const convertedGrToLbs = (gr * 0.00220462).toFixed(2);
  const [kg, setKg] = useState('0');
  const convertedKgToLbs = (kg * 2.20462).toFixed(2);

  return (
    <ScrollView>
      <View className='flex-row p-4 justify-between items-center'>
        <Input text={gr} setText={(tx) => setGr(tx)} />
        <Text className='text-slate-50 font-bold text-xl'>gramms to lbs</Text>
      </View>
      <View className='flex items-center justify-center bg-slate-900 py-4'>
        <Text className='text-slate-50 text-center font-bold text-xl'>
          {convertedGrToLbs} lbs
        </Text>
      </View>
      <View className='flex-row p-4 justify-between items-center mt-10'>
        <Input text={kg} setText={(tx) => setKg(tx)} />
        <Text className='text-slate-50 font-bold text-xl'>
          kilogramm to lbs
        </Text>
      </View>
      <View className='flex items-center justify-center bg-slate-900 py-4'>
        <Text className='text-slate-50 text-center font-bold text-xl'>
          {convertedKgToLbs} lbs
        </Text>
      </View>
    </ScrollView>
  );
}

// import React, { useState, useReducer, useEffect } from 'react';
// import { View, Text, ScrollView, StyleSheet, Keyboard } from 'react-native';
// import RNPickerSelect from 'react-native-picker-select';
// import { weights } from '../constants';
// import { reducer } from '../services/lib/reducer';
// import GreenBtn from './Btn/GreenBtn';
// import Input from './Inputs/Input';

// const initialState = {
//   converted: 0,
// };

// const UnitConvert = () => {
//   const [{ converted }, dispatch] = useReducer(reducer, initialState);
//   const [fromVal, setFromVal] = useState('kg');
//   const [toVal, setToVal] = useState('lb');
//   const [input, setInput] = useState('1');

//   useEffect(() => {
//     convertHandler();
//   }, [toVal, fromVal]);

//   function convertHandler() {
//     if (fromVal === 'kg' && toVal === 'lb') {
//       dispatch({ type: 'kgToLb', payload: Number(input) });
//     } else if (fromVal === 'lb' && toVal === 'kg') {
//       dispatch({ type: 'lbToKg', payload: Number(input) });
//     } else if (fromVal === 'gr' && toVal === 'lb') {
//       dispatch({ type: 'grToLb', payload: Number(input) });
//     } else if (fromVal === 'lb' && toVal === 'µg') {
//       dispatch({ type: 'lbToµg', payload: Number(input) });
//     } else if (fromVal === 'µg' && toVal === 'lb') {
//       dispatch({ type: 'µgToLb', payload: Number(input) });
//     } else if (fromVal === 'gr' && toVal === 'kg') {
//       dispatch({ type: 'grToKg', payload: Number(input) });
//     } else if (fromVal === 'kg' && toVal === 'gr') {
//       dispatch({ type: 'kgToGr', payload: Number(input) });
//     } else if (fromVal === 'mg' && toVal === 'kg') {
//       dispatch({ type: 'mgToKg', payload: Number(input) });
//     } else if (fromVal === 'kg' && toVal === 'mg') {
//       dispatch({ type: 'kgToMg', payload: Number(input) });
//     } else if (fromVal === 'µg' && toVal === 'kg') {
//       dispatch({ type: 'µgToKg', payload: Number(input) });
//     } else if (fromVal === 'kg' && toVal === 'µg') {
//       dispatch({ type: 'kgToµg', payload: Number(input) });
//     } else if (fromVal === 'ton' && toVal === 'kg') {
//       dispatch({ type: 'tonToKg', payload: Number(input) });
//     } else if (fromVal === 'kg' && toVal === 'ton') {
//       dispatch({ type: 'kgToTon', payload: Number(input) });
//     } else if (fromVal === 'oz' && toVal === 'lb') {
//       dispatch({ type: 'ozToLb', payload: Number(input) });
//     } else if (fromVal === 'lb' && toVal === 'oz') {
//       dispatch({ type: 'lbToOz', payload: Number(input) });
//     } else if (fromVal === 'gr' && toVal === 'mg') {
//       dispatch({ type: 'grToMg', payload: Number(input) });
//     } else if (fromVal === 'mg' && toVal === 'gr') {
//       dispatch({ type: 'mgToGr', payload: Number(input) });
//     } else if (fromVal === 'µg' && toVal === 'mg') {
//       dispatch({ type: 'µgToMg', payload: Number(input) });
//     } else if (fromVal === 'mg' && toVal === 'µg') {
//       dispatch({ type: 'mgToµg', payload: Number(input) });
//     } else if (fromVal === 'ton' && toVal === 'lb') {
//       dispatch({ type: 'tonToLb', payload: Number(input) });
//     } else if (fromVal === 'lb' && toVal === 'ton') {
//       dispatch({ type: 'lbToTon', payload: Number(input) });
//     } else if (fromVal === 'ton' && toVal === 'kg') {
//       dispatch({ type: 'tonToKg', payload: Number(input) });
//     } else if (fromVal === 'kg' && toVal === 'ton') {
//       dispatch({ type: 'kgToTon', payload: Number(input) });
//     }
//     if (fromVal === 'gr' && toVal === 'oz') {
//       dispatch({ type: 'grToOz', payload: Number(input) });
//     } else if (fromVal === 'oz' && toVal === 'gr') {
//       dispatch({ type: 'ozToGr', payload: Number(input) });
//     } else if (fromVal === 'mg' && toVal === 'µg') {
//       dispatch({ type: 'mgToµg', payload: Number(input) });
//     } else if (fromVal === 'µg' && toVal === 'mg') {
//       dispatch({ type: 'µgToMg', payload: Number(input) });
//     } else if (fromVal === 'gr' && toVal === 'mg') {
//       dispatch({ type: 'grToMg', payload: Number(input) });
//     } else if (fromVal === 'mg' && toVal === 'gr') {
//       dispatch({ type: 'mgToGr', payload: Number(input) });
//     } else if (fromVal === 'cup-us-flour' && toVal === 'gr') {
//       dispatch({ type: 'cupflToGr', payload: Number(input) });
//     } else if (fromVal === 'cup-us-sugar' && toVal === 'gr') {
//       dispatch({ type: 'cupSugarToGr', payload: Number(input) });
//     } else if (fromVal === 'cup-us-rice' && toVal === 'gr') {
//       dispatch({ type: 'cupRiceToGr', payload: Number(input) });
//     } else if (fromVal === 'cup-us-oats' && toVal === 'gr') {
//       dispatch({ type: 'cupOatsToGr', payload: Number(input) });
//     } else if (fromVal === 'cup-us-flour' && toVal === 'kg') {
//       dispatch({ type: 'cupFlourToKg', payload: Number(input) });
//     } else if (fromVal === 'cup-us-flour' && toVal === 'mg') {
//       dispatch({ type: 'cupFlourToMg', payload: Number(input) });
//     } else if (fromVal === 'cup-us-flour' && toVal === 'µg') {
//       dispatch({ type: 'cupFlourToµg', payload: Number(input) });
//     } else if (fromVal === 'cup-us-flour' && toVal === 'ton') {
//       dispatch({ type: 'cupFlourToTon', payload: Number(input) });
//     } else if (fromVal === 'cup-us-flour' && toVal === 'lb') {
//       dispatch({ type: 'cupFlourToLb', payload: Number(input) });
//     } else if (fromVal === 'cup-us-flour' && toVal === 'oz') {
//       dispatch({ type: 'cupFlourToOz', payload: Number(input) });
//     } else if (fromVal === 'kg' && toVal === 'cup-us-flour') {
//       dispatch({ type: 'kgToCupFlour', payload: Number(input) });
//     } else if (fromVal === 'lb' && toVal === 'cup-us-sugar') {
//       dispatch({ type: 'lbToCupSugar', payload: Number(input) });
//     } else if (fromVal === 'oz' && toVal === 'cup-us-rice') {
//       dispatch({ type: 'ozToCupRice', payload: Number(input) });
//     }

//     // Check if converting from milligrams (mg) to cups of sugar
//     if (fromVal === 'mg' && toVal === 'cupSugar') {
//       dispatch({ type: 'mgToCupSugar', payload: Number(input) });
//     }
//     // Check if converting from micrograms (µg) to cups of sugar
//     else if (fromVal === 'µg' && toVal === 'cupSugar') {
//       dispatch({ type: 'µgToCupSugar', payload: Number(input) });
//     }
//     // Check if converting from metric tons (ton) to cups of sugar
//     else if (fromVal === 'ton' && toVal === 'cupSugar') {
//       dispatch({ type: 'tonToCupSugar', payload: Number(input) });
//     }
//     // Check if converting from pounds (lb) to cups of sugar
//     else if (fromVal === 'lb' && toVal === 'cupSugar') {
//       dispatch({ type: 'lbToCupSugar', payload: Number(input) });
//     }
//     // Check if converting from ounces (oz) to cups of sugar
//     else if (fromVal === 'oz' && toVal === 'cupSugar') {
//       dispatch({ type: 'ozToCupSugar', payload: Number(input) });
//     }

//     // Check if converting from milligrams (mg) to cups of rice
//     else if (fromVal === 'mg' && toVal === 'cupRice') {
//       dispatch({ type: 'mgToCupRice', payload: Number(input) });
//     }
//     // Check if converting from micrograms (µg) to cups of rice
//     else if (fromVal === 'µg' && toVal === 'cupRice') {
//       dispatch({ type: 'µgToCupRice', payload: Number(input) });
//     }
//     // Check if converting from metric tons (ton) to cups of rice
//     else if (fromVal === 'ton' && toVal === 'cupRice') {
//       dispatch({ type: 'tonToCupRice', payload: Number(input) });
//     }
//     // Check if converting from pounds (lb) to cups of rice
//     else if (fromVal === 'lb' && toVal === 'cupRice') {
//       dispatch({ type: 'lbToCupRice', payload: Number(input) });
//     }
//     // Check if converting from ounces (oz) to cups of rice
//     else if (fromVal === 'oz' && toVal === 'cupRice') {
//       dispatch({ type: 'ozToCupRice', payload: Number(input) });
//     }
//     Keyboard.dismiss();
//   }

//   const filteredAvailable = weights.filter((option) => {
//     if (fromVal.includes('cup')) {
//       return !option.value.includes('cup');
//     }
//     // If fromVal doesn't contain "cup," enable all options
//     return true;
//   });

//   return (
//     <ScrollView className='flex-1 gap-10'>
//       <View className='flex-row justify-around items-center px-4'>
//         <Input text={input} setText={(tx) => setInput(tx)} />
//         <View className='gap-3 w-[45%]'>
//           <View>
//             <RNPickerSelect
//               value={fromVal}
//               onValueChange={(value) => {
//                 if (value !== '' && value !== toVal) {
//                   setFromVal(value);
//                 } else {
//                   return;
//                 }
//               }}
//               style={pickerSelectStyles}
//               placeholder={{
//                 label: 'select',
//                 value: '',
//                 color: '#9EA0A4',
//                 disabled: true,
//               }}
//               items={weights}
//             />
//           </View>
//           <View>
//             <RNPickerSelect
//               value={toVal}
//               onValueChange={(value) => {
//                 if (value !== '' && value !== fromVal) {
//                   setToVal(value);
//                 } else {
//                   return;
//                 }
//               }}
//               style={pickerSelectStyles}
//               placeholder={{
//                 label: 'select',
//                 value: '',
//                 color: '#9EA0A4',
//                 disabled: true,
//               }}
//               items={filteredAvailable}
//             />
//           </View>
//         </View>
//       </View>
//       <View className='items-center mt-8'>
//         <GreenBtn onPress={convertHandler} />
//       </View>
//       <View className='flex items-center justify-center bg-slate-900 py-4'>
//         <Text className='text-slate-50 text-center font-bold text-xl'>
//           {converted} {toVal}
//         </Text>
//       </View>
//     </ScrollView>
//   );
// };

// export default UnitConvert;

// const pickerSelectStyles = StyleSheet.create({
//   inputIOS: {
//     color: '#2c2c2c',
//     backgroundColor: '#f0f0f0',
//     paddingVertical: 5,
//     paddingHorizontal: 20,
//     borderRadius: 15,
//     height: 44,
//     width: '100%',
//     fontWeight: 'bold',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   inputAndroid: {
//     color: '#2c2c2c',
//     backgroundColor: '#e2e2e2',
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderRadius: 15,
//     height: 34,
//     width: '30%',
//     fontWeight: 'bold',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// <ScrollView className='flex-1 gap-10'>
// <View className='flex-row justify-around items-center px-4'>
//   <Input
//     text={text}
//     setText={(tx) => setText(tx)}
//     editable={!isLoading}
//   />
//   <View className='gap-3 w-[35%]'>
//     <View>
//       <RNPickerSelect
//         value={fromCur}
//         onValueChange={(value) => {
//           if (value !== '' && value !== toCur) {
//             setFromCur(value);
//           } else {
//             return;
//           }
//         }}
//         style={pickerSelectStyles}
//         placeholder={{
//           label: 'select',
//           value: '',
//           color: '#9EA0A4',
//           disabled: true,
//         }}
//         items={currencies}
//       />
//     </View>
//     <View>
//       <RNPickerSelect
//         value={toCur}
//         onValueChange={(value) => {
//           if (value !== '' && value !== fromCur) {
//             setToCur(value);
//           } else {
//             return;
//           }
//         }}
//         style={pickerSelectStyles}
//         placeholder={{
//           label: 'select',
//           value: '',
//           color: '#9EA0A4',
//           disabled: true,
//         }}
//         items={currencies}
//       />
//     </View>
//   </View>
// </View>
// <View className='items-center mt-8'>
//   <GreenBtn onPress={convertHandler} />
// </View>
// <View className='flex items-center justify-center mt-8 bg-slate-900 py-4'>
//   <Text className='text-slate-50 text-center font-bold text-xl'>
//     {isLoading ? 'Converting...' : `${convertedCur} ${toCur}`}
//     {error && 'Error converting !!'}
//   </Text>
// </View>
// </ScrollView>
