import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import SubBtn from '../Btn/SubBtn';
import { useProSub } from '../context/ctx';

const Logo = ({ setModal }) => {
  const { proMember } = useProSub();
  const [fontsLoaded] = useFonts({
    Monoton: require('../../assets/fonts/Monoton-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.con} className='flex-row justify-around'>
      <Text style={styles.LogoTxt}>justConvert</Text>
      {!proMember && <SubBtn onPress={() => setModal(true)} />}
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  LogoTxt: {
    fontFamily: 'Monoton',
    fontSize: 30,
    color: '#e2e8f0',
    textAlign: 'center',
  },
  con: {
    marginVertical: 20,
  },
});
