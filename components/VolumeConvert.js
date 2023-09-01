import React, { useState, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Keyboard, Alert } from 'react-native';
import { volumes, volumesPro } from '../constants';
import ConvertLayout from './ui/ConvertLayout';
import HistoryLayout from './ui/HistoryLayout';
import { volumeReducer } from '../services/lib/commonReducers';
import { useProSub } from './context/ctx';

const pattern = /^[0-9]*$/;

const VolumeConvert = () => {
  const { proMember } = useProSub();
  const initialState = {
    converted: 0,
    array: proMember ? volumesPro : volumes,
  };
  const [{ converted }, dispatch] = useReducer(volumeReducer, initialState);
  const [fromVal, setFromVal] = useState('ml');
  const [toVal, setToVal] = useState('fl-oz');
  const [input, setInput] = useState('1');

  const [error, setError] = useState(null);

  const [items, setItems] = useState([]);
  console.log('proMember:', proMember);
  console.log('volumes:', volumes);
  console.log('volumesPro:', volumesPro);
  useEffect(() => {
    convertHandler();
  }, [converted, fromVal, toVal]);

  useEffect(() => {
    proMember
      ? dispatch({ type: 'arr', payload: volumesPro })
      : dispatch({ type: 'arr', payload: volumes });
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
    const inputValue = parseFloat(input);
    const actionType = `${fromVal}To${toVal}`;
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
        items1={proMember ? volumesPro : volumes}
        items2={proMember ? volumesPro : volumes}
        switchHandler={switchHandler}
        error2={error}
      />
      <HistoryLayout items={items} clearAll={handleClearAll} />
    </>
  );
};

export default VolumeConvert;
