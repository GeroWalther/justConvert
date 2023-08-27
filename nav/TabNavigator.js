import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CurrencyConvertScreen from '../screens/CurrencyConvertScreen';
import WeightConvertScreen from '../screens/WeightConvertScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import VolumeConvertScreen from '../screens/VolumeConvertScreen';
import LengthConvertScreen from '../screens/LengthConvertScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveBackgroundColor: '#1e293b',
        tabBarInactiveBackgroundColor: '#475569',
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0,
          height: 50,
        },
        tabBarActiveTintColor: '#16a34a',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Currency') {
            return (
              <MaterialIcons name='attach-money' size={32} color={color} />
            );
          } else if (route.name === 'Weight') {
            return (
              <MaterialCommunityIcons name='weight' size={28} color={color} />
            );
          } else if (route.name === 'Length') {
            return <Entypo name='ruler' size={28} color={color} />;
          } else if (route.name === 'Volume') {
            return (
              <MaterialCommunityIcons
                name='cup-water'
                size={28}
                color={color}
              />
            );
          }
        },
      })}>
      <Tab.Screen name='Currency' component={CurrencyConvertScreen} />
      <Tab.Screen name='Weight' component={WeightConvertScreen} />
      <Tab.Screen name='Length' component={LengthConvertScreen} />
      <Tab.Screen name='Volume' component={VolumeConvertScreen} />
    </Tab.Navigator>
  );
}
