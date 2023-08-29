import { View } from 'react-native';
import AreaConvert from '../components/AreaConvert';
import Logo from '../components/logo/Logo';

const AreaConvertScreen = () => {
  return (
    <View className='bg-slate-600 flex-1'>
      <Logo />
      <AreaConvert />
    </View>
  );
};

export default AreaConvertScreen;
