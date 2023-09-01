import { View } from 'react-native';
import { useState, useEffect } from 'react';
import { useProSub } from '../components/context/ctx';
import Logo from '../components/logo/Logo';
import ProMemberModal from '../components/ui/ProMemberModal.js';
import VolumeConvert from '../components/VolumeConvert';

const VolumeConvertScreen = () => {
  const { proMember } = useProSub();
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    if (!proMember) {
      setIsModalVisible(true);
    } else {
      setIsModalVisible(false);
    }
  }, [proMember]);
  function handleModalClose() {
    setIsModalVisible(false);
  }
  return (
    <View className='bg-slate-600 flex-1'>
      {!proMember && (
        <ProMemberModal isVisible={isModalVisible} onClose={handleModalClose} />
      )}
      <Logo setModal={setIsModalVisible} />
      <VolumeConvert />
    </View>
  );
};

export default VolumeConvertScreen;
