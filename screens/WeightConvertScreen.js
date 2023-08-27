import { Text, View } from 'react-native';
import WeightConvert from '../components/WeightConvert';

const WeightConvertScreen = () => {
  return (
    <View className='bg-slate-600 flex-1'>
      <Text className='text-slate-50 font-semibold text-center text-lg p-4 mb-5'>
        justConvert logo
      </Text>
      <WeightConvert />
    </View>
  );
};

export default WeightConvertScreen;
