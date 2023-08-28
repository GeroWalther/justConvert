import { Text, View } from 'react-native';
import AreaConvert from '../components/AreaConvert';

const AreaConvertScreen = () => {
  return (
    <View className='bg-slate-600 flex-1'>
      <Text className='text-slate-50 font-semibold text-center text-lg p-4 mb-5'>
        justConvert logo
      </Text>
      <AreaConvert />
    </View>
  );
};

export default AreaConvertScreen;
