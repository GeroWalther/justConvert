import React, { useState, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Keyboard, Alert, Text } from 'react-native';
import { areas } from '../constants';
import { reducer } from '../services/lib/reducer';
import ConvertLayout from './ui/ConvertLayout';
import HistoryLayout from './ui/HistoryLayout';
import { areaReducer } from '../services/lib/commonReducers';

const pattern = /^[0-9]*$/;

const initialState = {
  converted: 0,
};

const AreaConvert = () => {
  const [{ converted }, dispatch] = useReducer(areaReducer, initialState);
  const [fromVal, setFromVal] = useState('m2');
  const [toVal, setToVal] = useState('ft2');
  const [input, setInput] = useState('1');

  const [error, setError] = useState(null);

  const [items, setItems] = useState([]);
  useEffect(() => {
    convertHandler();
  }, [converted, fromVal, toVal]);

  useEffect(() => {
    const itemExists = items.some(
      (item) =>
        item.fromVal === fromVal &&
        item.toVal === toVal &&
        item.converted === converted
    );
    if (!itemExists) {
      setItems(() => [
        ...items,
        {
          input,
          fromVal,
          toVal,
          converted,
          id: Date.now(),
        },
      ]);
    }
  }, [converted]);

  useEffect(() => {
    loadState();
  }, []);

  useEffect(() => {
    if (items !== []) saveState();
  }, [items]);

  const loadState = async () => {
    try {
      // Load the saved state from local storage
      const savedState = await AsyncStorage.getItem('appStateArea');
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
      await AsyncStorage.setItem('appStateArea', appState);
    } catch (error) {
      console.log('Error saving state to local storage:', error);
    }
  };

  function convertHandler() {
    if (!pattern.test(input)) {
      setError(true);
      return;
    } else {
      setError(false);
    }
    const actionType = `${fromVal}To${toVal}`;
    const inputValue = parseFloat(input);
    dispatch({
      type: actionType,
      payload: {
        value: inputValue,
        fromUnit: fromVal,
        toUnit: toVal,
      },
    });
    Keyboard.dismiss();
  }
  function switchHandler() {
    const temp = fromVal;
    setFromVal(toVal);
    setToVal(temp);
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
        converted={converted}
        input={input}
        convertHandler={convertHandler}
        fromVal={fromVal}
        toVal={toVal}
        setToVal={setToVal}
        setFromVal={setFromVal}
        setInput={setInput}
        items1={areas}
        items2={areas}
        switchHandler={switchHandler}
        error2={error}
      />
      <Text className='text-orange-500 text-2xl'>Area!!!!</Text>
      <HistoryLayout items={items} clearAll={handleClearAll} />
    </>
  );
};

export default AreaConvert;
