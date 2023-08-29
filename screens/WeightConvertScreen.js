import { View } from 'react-native';
import Logo from '../components/logo/Logo';
import WeightConvert from '../components/WeightConvert';

const WeightConvertScreen = () => {
  return (
    <View className='bg-slate-600 flex-1'>
      <Logo />
      <WeightConvert />
    </View>
  );
};

export default WeightConvertScreen;
