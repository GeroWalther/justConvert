import { useState, useEffect } from 'react';
import { Keyboard, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { currencies, currenciesPro } from '../constants';
import { useCurrConvert } from '../hooks/useCurrConvert';
import ConvertLayout from './ui/ConvertLayout';
import HistoryLayout from './ui/HistoryLayout';
import useRevenueCat from '../hooks/useRevenueCat';

const ConvertComp = () => {
  const { isProMember } = useRevenueCat();

  const [text, setText] = useState('1');
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState('EUR');
  const [toCur, setToCur] = useState('USD');

  const [items, setItems] = useState([]);

  useEffect(() => {
    loadState();
  }, []);

  useEffect(() => {
    if (items !== []) saveState();
  }, [items]);

  const loadState = async () => {
    try {
      const savedState = await AsyncStorage.getItem('appStateCurr');
      if (savedState !== null) {
        const { items: savedItems } = JSON.parse(savedState);
        setItems(savedItems);
      }
    } catch (error) {
      console.log('Error loading state from local storage:', error);
    }
  };
  const saveState = async () => {
    try {
      const appState = JSON.stringify({ items });
      await AsyncStorage.setItem('appStateCurr', appState);
    } catch (error) {
      console.log('Error saving state to local storage:', error);
    }
  };

  const { isLoading, error, convertedCur } = useCurrConvert(
    amount,
    fromCur,
    toCur
  );
  useEffect(() => {
    if (!isLoading) {
      const itemExists = items.some(
        (item) =>
          item.fromVal === fromCur &&
          item.toVal === toCur &&
          item.converted === convertedCur
      );
      if (!itemExists) {
        setItems((prev) => [
          ...prev,
          {
            input: text,
            fromVal: fromCur,
            toVal: toCur,
            converted: convertedCur,
            id: Date.now(),
          },
        ]);
      }
    }
  }, [convertedCur, isLoading]);

  function convertHandler() {
    setAmount(Number(text));
    Keyboard.dismiss();
  }
  function switchHandler() {
    const temp = fromCur;
    setFromCur(toCur);
    setToCur(temp);
  }
  function handleClearAll() {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to clear all?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => setItems([]),
        },
      ],
      { cancelable: true }
    );
  }

  return (
    <>
      <ConvertLayout
        converted={convertedCur}
        input={text}
        convertHandler={convertHandler}
        switchHandler={switchHandler}
        fromVal={fromCur}
        toVal={toCur}
        setToVal={setToCur}
        setFromVal={setFromCur}
        setInput={setText}
        items1={isProMember ? currenciesPro : currencies}
        items2={isProMember ? currenciesPro : currencies}
        isLoading={isLoading}
        error={error}
      />
      <HistoryLayout items={items} clearAll={handleClearAll} />
    </>
  );
};

export default ConvertComp;
