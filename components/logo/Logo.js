import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';

const Logo = () => {
  const [fontsLoaded] = useFonts({
    Monoton: require('../../assets/fonts/Monoton-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.con}>
      <Text style={styles.LogoTxt}>justConvert</Text>
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
