import { ActivityIndicator, View } from 'react-native';
import { useState } from 'react';
import Logo from '../components/logo/Logo';
import ProMemberModal from '../components/ui/ProMemberModal.js';
import WeightConvert from '../components/WeightConvert';
import useRevenueCat from '../hooks/useRevenueCat';

const WeightConvertScreen = () => {
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
          <WeightConvert />
        </>
      )}
    </View>
  );
};

export default WeightConvertScreen;
