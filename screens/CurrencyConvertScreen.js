import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import CurrConvert from '../components/CurrConvert';
import Logo from '../components/logo/Logo';
import ProMemberModal from '../components/ui/ProMemberModal.js';

import useRevenueCat from '../hooks/useRevenueCat';

const CurrencyConvertScreen = () => {
  const { isProMember } = useRevenueCat();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (!isProMember) {
      setIsModalVisible(true);
    } else {
      setIsModalVisible(false);
    }
  }, [isProMember]);
  function handleModalClose() {
    setIsModalVisible(false);
  }
  return (
    <View className='bg-slate-600 flex-1'>
      {!isProMember && (
        <ProMemberModal isVisible={isModalVisible} onClose={handleModalClose} />
      )}
      <Logo setModal={setIsModalVisible} />
      <CurrConvert />
    </View>
  );
};

export default CurrencyConvertScreen;
