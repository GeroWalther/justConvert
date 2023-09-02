import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
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

export default function App() {
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
