import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar, Platform } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { ProProvider } from './components/context/ctx';
import RootNav from './nav/RootNav';

//import Purchases from 'react-native-purchases';

const queryClient = new QueryClient({
  defaultOptions: {
    query: {
      staleTime: 60 * 1000,
    },
  },
});

// const IOS_REVCAT_KEY = 'appl_IdXjoLTYMEwWUxxFnmQHIcCvKOO';
// const ANDROID_REVCAT_KEY = '';

export default function App() {
  //   useEffect(() => {
  //     Purchases.setup();
  //     if (Platform.OS === 'ios') {
  //       Purchases.setup(IOS_REVCAT_KEY);
  //     } else if (Platform.OS === 'android') {
  //       Purchases.setup(ANDROID_REVCAT_KEY);
  //     }
  //   }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView className='bg-slate-600 flex-1'>
        <ProProvider>
          <RootNav />
        </ProProvider>
        <StatusBar style='light' />
      </SafeAreaView>
    </QueryClientProvider>
  );
}
