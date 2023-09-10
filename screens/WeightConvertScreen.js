import { View } from 'react-native';
import { useState } from 'react';
import Logo from '../components/logo/Logo';
import ProMemberModal from '../components/ui/ProMemberModal.js';
import WeightConvert from '../components/WeightConvert';

const WeightConvertScreen = () => {
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
      <WeightConvert />
    </View>
  );
};

export default WeightConvertScreen;
