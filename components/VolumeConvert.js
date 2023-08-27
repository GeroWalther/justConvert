import React, { useState, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Keyboard, Alert, Text } from 'react-native';
import { volumes } from '../constants';
import { reducer } from '../services/lib/reducer';
import ConvertLayout from './ui/ConvertLayout';
import HistoryLayout from './ui/HistoryLayout';

const pattern = /^[0-9]*$/;

const initialState = {
  converted: 0,
};

const VolumeConvert = () => {
  const [{ converted }, dispatch] = useReducer(reducer, initialState);
  const [fromVal, setFromVal] = useState('ml');
  const [toVal, setToVal] = useState('fl-oz');
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
  //could be custom hook
  const loadState = async () => {
    try {
      // Load the saved state from local storage
      const savedState = await AsyncStorage.getItem('appStateVolumes');
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
      await AsyncStorage.setItem('appStateVolumes', appState);
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

    Keyboard.dismiss();
  }
  function switchHandler() {
    const temp = fromVal;
    setFromVal(toVal);
    setToVal(temp);
  }
  const filteredAvailable = volumes.filter((option) => {
    if (fromVal.includes('cup')) {
      return !option.value.includes('cup');
    }
    // If fromVal doesn't contain "cup," enable all options
    return true;
  });

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
        items1={volumes}
        items2={filteredAvailable}
        switchHandler={switchHandler}
        error2={error}
      />
      <Text className='text-orange-500 text-2xl'>Volume!!!!</Text>
      <HistoryLayout items={items} clearAll={handleClearAll} />
    </>
  );
};

export default VolumeConvert;
