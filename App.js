import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './nav/TabNavigator';
import { ProProvider } from './components/context/ctx';
//import Purchases from 'react-native-purchases';

const queryClient = new QueryClient({
  defaultOptions: {
    query: {
      staleTime: 60 * 1000,
    },
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView className='bg-slate-600 flex-1'>
          <ProProvider>
            <TabNavigator />
          </ProProvider>
          <StatusBar style='light' />
        </SafeAreaView>
      </QueryClientProvider>
    </NavigationContainer>
  );
}
