import { View } from 'react-native';
import { useState } from 'react';
import AreaConvert from '../components/AreaConvert';
import Logo from '../components/logo/Logo';
import ProMemberModal from '../components/ui/ProMemberModal.js';

const AreaConvertScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  function handleModalClose() {
    setIsModalVisible(false);
  }
  return (
    <View className='bg-slate-600 flex-1'>
      {isModalVisible && (
        <ProMemberModal isVisible={isModalVisible} onClose={handleModalClose} />
      )}
      <Logo setModal={setIsModalVisible} />
      <AreaConvert />
    </View>
  );
};

export default AreaConvertScreen;
