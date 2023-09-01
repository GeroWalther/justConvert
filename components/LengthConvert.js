import React, { useState, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Keyboard, Alert } from 'react-native';
import { lengths, lengthsPro } from '../constants';
import ConvertLayout from './ui/ConvertLayout';
import HistoryLayout from './ui/HistoryLayout';
import { lengthReducer } from '../services/lib/commonReducers';
import { useProSub } from './context/ctx';
const pattern = /^[0-9]*$/;

const LengthConvert = () => {
  const initialState = {
    converted: 0,
    array: proMember ? lengthsPro : lengths,
  };
  const { proMember } = useProSub();
  const [{ converted }, dispatch] = useReducer(lengthReducer, initialState);
  const [fromVal, setFromVal] = useState('in');
  const [toVal, setToVal] = useState('cm');
  const [input, setInput] = useState('1');

  const [error, setError] = useState(null);

  const [items, setItems] = useState([]);

  useEffect(() => {
    convertHandler();
  }, [converted, fromVal, toVal]);

  useEffect(() => {
    proMember
      ? dispatch({ type: 'arr', payload: lengthsPro })
      : dispatch({ type: 'arr', payload: lengths });
  }, [proMember]);

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
      const savedState = await AsyncStorage.getItem('appStateLength');
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
      await AsyncStorage.setItem('appStateLength', appState);
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
        items1={proMember ? lengthsPro : lengths}
        items2={proMember ? lengthsPro : lengths}
        switchHandler={switchHandler}
        error2={error}
      />
      <HistoryLayout items={items} clearAll={handleClearAll} />
    </>
  );
};

export default LengthConvert;
