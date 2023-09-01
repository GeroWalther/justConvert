import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNav from './TabNavigator';
import SubsriptionModalScreen from '../screens/SubsriptionModalScreen';

const RootStack = createNativeStackNavigator();

const RootNav = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen name='Main' component={TabNav} />
      </RootStack.Group>
      <RootStack.Group
        screenOptions={{
          presentation: 'modal',
        }}>
        <RootStack.Screen
          options={{ headerShown: false }}
          name='SubModal'
          component={SubsriptionModalScreen}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNav;
