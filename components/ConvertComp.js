import { useState } from 'react';
import { Keyboard } from 'react-native';

import { currencies } from '../constants';
import { useCurrConvert } from '../hooks/useCurrConvert';
import ConvertLayout from './ui/ConvertLayout';

const ConvertComp = () => {
  const [text, setText] = useState('1');
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState('EUR');
  const [toCur, setToCur] = useState('USD');

  const { isLoading, error, convertedCur } = useCurrConvert(
    amount,
    fromCur,
    toCur
  );

  function convertHandler() {
    setAmount(Number(text));
    Keyboard.dismiss();
  }
  function switchHandler() {
    const temp = fromCur;
    setFromCur(toCur);
    setToCur(temp);
  }

  return (
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
      items1={currencies}
      items2={currencies}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default ConvertComp;
