import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorage = (key, initialValue = []) => {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    async function loadStoredValue() {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          setStoredValue(JSON.parse(value));
        }
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error);
      }
    }

    loadStoredValue();
  }, [key, storedValue]);

  const saveValue = async (value) => {
    try {
      const valueToStore = JSON.stringify(value);
      await AsyncStorage.setItem(key, valueToStore);
      setStoredValue(value);
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  return [storedValue, saveValue];
};

export default useAsyncStorage;
