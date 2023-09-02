import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNav from './TabNavigator';
import SubsriptionModalScreen from '../screens/SubsriptionModalScreen';
import { NavigationContainer } from '@react-navigation/native';

const RootStack = createNativeStackNavigator();

const RootNav = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name='Main' component={TabNav} />
        <RootStack.Screen
          options={{
            headerShown: false,
            presentation: 'containedModal',
          }}
          name='SubModal'
          component={SubsriptionModalScreen}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNav;
