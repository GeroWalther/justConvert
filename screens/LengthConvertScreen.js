import { View } from 'react-native';
import LengthConvert from '../components/LengthConvert';
import Logo from '../components/logo/Logo';

const LengthConvertScreen = () => {
  return (
    <View className='bg-slate-600 flex-1'>
      <Logo />
      <LengthConvert />
    </View>
  );
};

export default LengthConvertScreen;
