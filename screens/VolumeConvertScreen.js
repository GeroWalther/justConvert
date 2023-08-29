import { View } from 'react-native';
import Logo from '../components/logo/Logo';
import VolumeConvert from '../components/VolumeConvert';

const VolumeConvertScreen = () => {
  return (
    <View className='bg-slate-600 flex-1'>
      <Logo />
      <VolumeConvert />
    </View>
  );
};

export default VolumeConvertScreen;
