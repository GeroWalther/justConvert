import React, { useState, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Keyboard, Alert } from 'react-native';
import { weights } from '../constants';
import { weightReducer } from '../services/lib/reducer';
import ConvertLayout from './ui/ConvertLayout';
import HistoryLayout from './ui/HistoryLayout';

const pattern = /^[0-9]*$/;

const initialState = {
  converted: 0,
};

const WeightConvert = () => {
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

    if (fromVal === 'kg' && toVal === 'lb') {
      dispatch({ type: 'kgToLb', payload: Number(input) });
    } else if (fromVal === 'lb' && toVal === 'kg') {
      dispatch({ type: 'lbToKg', payload: Number(input) });
    } else if (fromVal === 'oz' && toVal === 'kg') {
      dispatch({ type: 'ozToKg', payload: Number(input) });
    } else if (fromVal === 'kg' && toVal === 'oz') {
      dispatch({ type: 'kgToOz', payload: Number(input) });
    } else if (fromVal === 'gr' && toVal === 'lb') {
      dispatch({ type: 'grToLb', payload: Number(input) });
    } else if (fromVal === 'lb' && toVal === 'µg') {
      dispatch({ type: 'lbToµg', payload: Number(input) });
    } else if (fromVal === 'µg' && toVal === 'lb') {
      dispatch({ type: 'µgToLb', payload: Number(input) });
    } else if (fromVal === 'gr' && toVal === 'kg') {
      dispatch({ type: 'grToKg', payload: Number(input) });
    } else if (fromVal === 'kg' && toVal === 'gr') {
      dispatch({ type: 'kgToGr', payload: Number(input) });
    } else if (fromVal === 'mg' && toVal === 'kg') {
      dispatch({ type: 'mgToKg', payload: Number(input) });
    } else if (fromVal === 'kg' && toVal === 'mg') {
      dispatch({ type: 'kgToMg', payload: Number(input) });
    } else if (fromVal === 'µg' && toVal === 'kg') {
      dispatch({ type: 'µgToKg', payload: Number(input) });
    } else if (fromVal === 'kg' && toVal === 'µg') {
      dispatch({ type: 'kgToµg', payload: Number(input) });
    } else if (fromVal === 'ton' && toVal === 'kg') {
      dispatch({ type: 'tonToKg', payload: Number(input) });
    } else if (fromVal === 'kg' && toVal === 'ton') {
      dispatch({ type: 'kgToTon', payload: Number(input) });
    } else if (fromVal === 'oz' && toVal === 'lb') {
      dispatch({ type: 'ozToLb', payload: Number(input) });
    } else if (fromVal === 'lb' && toVal === 'oz') {
      dispatch({ type: 'lbToOz', payload: Number(input) });
    } else if (fromVal === 'gr' && toVal === 'mg') {
      dispatch({ type: 'grToMg', payload: Number(input) });
    } else if (fromVal === 'mg' && toVal === 'gr') {
      dispatch({ type: 'mgToGr', payload: Number(input) });
    } else if (fromVal === 'µg' && toVal === 'mg') {
      dispatch({ type: 'µgToMg', payload: Number(input) });
    } else if (fromVal === 'mg' && toVal === 'µg') {
      dispatch({ type: 'mgToµg', payload: Number(input) });
    } else if (fromVal === 'ton' && toVal === 'lb') {
      dispatch({ type: 'tonToLb', payload: Number(input) });
    } else if (fromVal === 'lb' && toVal === 'ton') {
      dispatch({ type: 'lbToTon', payload: Number(input) });
    } else if (fromVal === 'ton' && toVal === 'kg') {
      dispatch({ type: 'tonToKg', payload: Number(input) });
    } else if (fromVal === 'kg' && toVal === 'ton') {
      dispatch({ type: 'kgToTon', payload: Number(input) });
    }
    if (fromVal === 'gr' && toVal === 'oz') {
      dispatch({ type: 'grToOz', payload: Number(input) });
    } else if (fromVal === 'oz' && toVal === 'gr') {
      dispatch({ type: 'ozToGr', payload: Number(input) });
    } else if (fromVal === 'mg' && toVal === 'µg') {
      dispatch({ type: 'mgToµg', payload: Number(input) });
    } else if (fromVal === 'mg' && toVal === 'lb') {
      dispatch({ type: 'mgToLb', payload: Number(input) });
    } else if (fromVal === 'µg' && toVal === 'mg') {
      dispatch({ type: 'µgToMg', payload: Number(input) });
    } else if (fromVal === 'gr' && toVal === 'mg') {
      dispatch({ type: 'grToMg', payload: Number(input) });
    } else if (fromVal === 'mg' && toVal === 'gr') {
      dispatch({ type: 'mgToGr', payload: Number(input) });
    } else if (fromVal === 'cup-us-flour' && toVal === 'gr') {
      dispatch({ type: 'cupflToGr', payload: Number(input) });
    } else if (fromVal === 'cup-us-sugar' && toVal === 'gr') {
      dispatch({ type: 'cupSugarToGr', payload: Number(input) });
    } else if (fromVal === 'cup-us-sugar' && toVal === 'lb') {
      dispatch({ type: 'cupSugarToLb', payload: Number(input) });
    } else if (fromVal === 'cup-us-rice' && toVal === 'gr') {
      dispatch({ type: 'cupRiceToGr', payload: Number(input) });
    } else if (fromVal === 'cup-us-oats' && toVal === 'gr') {
      dispatch({ type: 'cupOatsToGr', payload: Number(input) });
    } else if (fromVal === 'cup-us-flour' && toVal === 'kg') {
      dispatch({ type: 'cupFlourToKg', payload: Number(input) });
    } else if (fromVal === 'cup-us-flour' && toVal === 'mg') {
      dispatch({ type: 'cupFlourToMg', payload: Number(input) });
    } else if (fromVal === 'cup-us-flour' && toVal === 'µg') {
      dispatch({ type: 'cupFlourToµg', payload: Number(input) });
    } else if (fromVal === 'cup-us-flour' && toVal === 'ton') {
      dispatch({ type: 'cupFlourToTon', payload: Number(input) });
    } else if (fromVal === 'cup-us-flour' && toVal === 'lb') {
      dispatch({ type: 'cupFlourToLb', payload: Number(input) });
    } else if (fromVal === 'cup-us-flour' && toVal === 'oz') {
      dispatch({ type: 'cupFlourToOz', payload: Number(input) });
    } else if (fromVal === 'kg' && toVal === 'cup-us-flour') {
      dispatch({ type: 'kgToCupFlour', payload: Number(input) });
    } else if (fromVal === 'lb' && toVal === 'cup-us-sugar') {
      dispatch({ type: 'lbToCupSugar', payload: Number(input) });
    } else if (fromVal === 'oz' && toVal === 'cup-us-rice') {
      dispatch({ type: 'ozToCupRice', payload: Number(input) });
    }
    // Check if converting from milligrams (mg) to cups of sugar
    if (fromVal === 'mg' && toVal === 'cupSugar') {
      dispatch({ type: 'mgToCupSugar', payload: Number(input) });
    }
    // Check if converting from micrograms (µg) to cups of sugar
    else if (fromVal === 'µg' && toVal === 'cupSugar') {
      dispatch({ type: 'µgToCupSugar', payload: Number(input) });
    }
    // Check if converting from metric tons (ton) to cups of sugar
    else if (fromVal === 'ton' && toVal === 'cupSugar') {
      dispatch({ type: 'tonToCupSugar', payload: Number(input) });
    }
    // Check if converting from pounds (lb) to cups of sugar
    else if (fromVal === 'lb' && toVal === 'cupSugar') {
      dispatch({ type: 'lbToCupSugar', payload: Number(input) });
    }
    // Check if converting from ounces (oz) to cups of sugar
    else if (fromVal === 'oz' && toVal === 'cupSugar') {
      dispatch({ type: 'ozToCupSugar', payload: Number(input) });
    }
    // Check if converting from milligrams (mg) to cups of rice
    else if (fromVal === 'mg' && toVal === 'cupRice') {
      dispatch({ type: 'mgToCupRice', payload: Number(input) });
    }
    // Check if converting from micrograms (µg) to cups of rice
    else if (fromVal === 'µg' && toVal === 'cupRice') {
      dispatch({ type: 'µgToCupRice', payload: Number(input) });
    }
    // Check if converting from metric tons (ton) to cups of rice
    else if (fromVal === 'ton' && toVal === 'cupRice') {
      dispatch({ type: 'tonToCupRice', payload: Number(input) });
    }
    // Check if converting from pounds (lb) to cups of rice
    else if (fromVal === 'lb' && toVal === 'cupRice') {
      dispatch({ type: 'lbToCupRice', payload: Number(input) });
    }
    // Check if converting from ounces (oz) to cups of rice
    else if (fromVal === 'oz' && toVal === 'cupRice') {
      dispatch({ type: 'ozToCupRice', payload: Number(input) });
    }
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
        items1={weights}
        items2={filteredAvailable}
        switchHandler={switchHandler}
        error2={error}
      />
      <HistoryLayout items={items} clearAll={handleClearAll} />
    </>
  );
};

export default WeightConvert;
