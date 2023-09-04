import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Purchases from 'react-native-purchases';
import { useProSub } from '../components/context/ctx';
import CurrConvert from '../components/CurrConvert';
import Logo from '../components/logo/Logo';
//import ProMemberModal from '../components/ui/ProMemberModal.js';

const CurrencyConvertScreen = () => {
  const { proMember, setProMenber } = useProSub();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    ckeckUserMembership();
    Purchases.addPurchaserInfoUpdateListener((info) => {
      checkUserMembership();
    });
  }, []);

  checkUserMembership = async () => {
    try {
      const purchaserInfo = await Purchases.getPurchaserInfo();
      if (typeof purchaserInfo.entitlements.active.pro !== 'undefined') {
        setProMenber(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

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
