import { Text, View } from 'react-native';
import UnitConvert from '../components/UnitConvert';
import Units from '../components/Units';

const UnitConvertScreen = () => {
  return (
    <View className='bg-slate-600 flex-1'>
      <Text className='text-slate-50 font-semibold text-center text-lg p-4 mb-5'>
        justConvert logo
      </Text>
      {/* <Units /> */}
      <UnitConvert />
    </View>
  );
};

export default UnitConvertScreen;
