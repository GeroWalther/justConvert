import { View } from 'react-native';
import { useState, useEffect } from 'react';
import { useProSub } from '../components/context/ctx';
import LengthConvert from '../components/LengthConvert';
import Logo from '../components/logo/Logo';
import ProMemberModal from '../components/ui/ProMemberModal.js';

const LengthConvertScreen = () => {
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
      <LengthConvert />
    </View>
  );
};

export default LengthConvertScreen;
