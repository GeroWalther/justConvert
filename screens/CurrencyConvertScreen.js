import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useProSub } from '../components/context/ctx';
import CurrConvert from '../components/CurrConvert';
import Logo from '../components/logo/Logo';
import ProMemberModal from '../components/ui/ProMemberModal.js';
import Purchases from 'react-native-purchases';
import { checkUserMembership } from '../services/lib/commonFunctions';

const CurrencyConvertScreen = () => {
  const { proMember, setProMember } = useProSub();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    checkUserMembership();
    Purchases.addPurchaserInfoUpdateListener((info) => {
      checkUserMembership(setProMember);
    });
  }, []);

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
      <CurrConvert />
    </View>
  );
};

export default CurrencyConvertScreen;
