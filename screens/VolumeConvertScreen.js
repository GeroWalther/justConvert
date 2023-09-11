import { ActivityIndicator, View } from 'react-native';
import { useState } from 'react';

import Logo from '../components/logo/Logo';
import ProMemberModal from '../components/ui/ProMemberModal.js';
import VolumeConvert from '../components/VolumeConvert';
import useRevenueCat from '../hooks/useRevenueCat';

const VolumeConvertScreen = () => {
  const { isCustomerInfoLoading } = useRevenueCat();
  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleModalClose() {
    setIsModalVisible(false);
  }
  return (
    <View className='bg-slate-600 flex-1'>
      {isCustomerInfoLoading ? (
        <ActivityIndicator size='large' />
      ) : (
        <>
          {isModalVisible && (
            <ProMemberModal
              isVisible={isModalVisible}
              onClose={handleModalClose}
            />
          )}
          <Logo setModal={setIsModalVisible} />
          <VolumeConvert />
        </>
      )}
    </View>
  );
};

export default VolumeConvertScreen;
