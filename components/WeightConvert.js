import React, { useState, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Keyboard, Alert } from 'react-native';
import { INIT_VALUE, pattern, weights, weightsPro } from '../constants';
import { weightReducer } from '../services/lib/commonReducers';
import ConvertLayout from './ui/ConvertLayout';
import HistoryLayout from './ui/HistoryLayout';
import useRevenueCat from '../hooks/useRevenueCat';

const WeightConvert = () => {
  const { isProMember } = useRevenueCat();
  const initialState = {
    converted: INIT_VALUE,
    array: isProMember ? weightsPro : weights,
  };
  const [{ converted }, dispatch] = useReducer(weightReducer, initialState);
  const [fromVal, setFromVal] = useState('kg');
  const [toVal, setToVal] = useState('lb');
  const [input, setInput] = useState('1');

  const [error, setError] = useState(null);

  const [items, setItems] = useState([]);

  useEffect(() => {
    convertHandler();
  }, [converted, fromVal, toVal]);

  useEffect(() => {
    isProMember
      ? dispatch({ type: 'arr', payload: weightsPro })
      : dispatch({ type: 'arr', payload: weights });
  }, [isProMember]);

  useEffect(() => {
<<<<<<< HEAD
=======
    if (converted === 0) {
      return;
    }
>>>>>>> master
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
      const savedState = await AsyncStorage.getItem('appStateUnit');
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
      await AsyncStorage.setItem('appStateUnit', appState);
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
  const filteredAvailable = weights.filter((option) => {
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
        items1={isProMember ? weightsPro : weights}
        items2={filteredAvailable}
        switchHandler={switchHandler}
        error2={error}
      />
      <HistoryLayout items={items} clearAll={handleClearAll} />
    </>
  );
};

export default WeightConvert;
