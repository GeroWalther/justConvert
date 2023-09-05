import { View } from 'react-native';
import { useState } from 'react';
import Logo from '../components/logo/Logo';
import ProMemberModal from '../components/ui/ProMemberModal.js';
import WeightConvert from '../components/WeightConvert';
import { useProSub } from '../components/context/ctx';
import { checkUserMembership } from '../services/lib/commonFunctions';
import Purchases from 'react-native-purchases';

const WeightConvertScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { setProMember } = useProSub();
  useEffect(() => {
    checkUserMembership();
    Purchases.addPurchaserInfoUpdateListener((info) => {
      checkUserMembership(setProMember);
    });
  }, []);

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
