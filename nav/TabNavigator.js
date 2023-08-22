import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CurrencyScreen from '../screens/CurrencyScreen';
import UnitConvertScreen from '../screens/UnitConvertScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

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
              <MaterialIcons name='attach-money' size={35} color={color} />
            );
          } else if (route.name === 'Unit') {
            return <Entypo name='ruler' size={30} color={color} />;
          }
        },
      })}>
      <Tab.Screen name='Currency' component={CurrencyScreen} />
      <Tab.Screen name='Unit' component={UnitConvertScreen} />
    </Tab.Navigator>
  );
}
