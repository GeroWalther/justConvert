import React, { useState, useReducer, useEffect } from 'react';
import { Keyboard, Text } from 'react-native';
import { weights } from '../constants';
import { reducer } from '../services/lib/reducer';
import ConvertLayout from './ui/ConvertLayout';

const initialState = {
  converted: 0,
};

const UnitConvert = () => {
  const [{ converted }, dispatch] = useReducer(reducer, initialState);
  const [fromVal, setFromVal] = useState('kg');
  const [toVal, setToVal] = useState('lb');
  const [input, setInput] = useState('1');

  useEffect(() => {
    convertHandler();
  }, [toVal, fromVal, input]);

  function convertHandler() {
    if (fromVal === 'kg' && toVal === 'lb') {
      dispatch({ type: 'kgToLb', payload: Number(input) });
    } else if (fromVal === 'lb' && toVal === 'kg') {
      dispatch({ type: 'lbToKg', payload: Number(input) });
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
      />
      <Text className='text-orange-400 mb-11'>Henlo!!!!!!</Text>
    </>
  );
};

export default UnitConvert;
