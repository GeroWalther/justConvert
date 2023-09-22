import { useQuery } from '@tanstack/react-query';
import { getConvertedCur } from '../services/apiCurrency';

export function useCurrConvert(amount, fromCur, toCur) {
  const {
    data: convertedCur,
    isLoading,
    error,
  } = useQuery(['conversion', amount, fromCur, toCur], () =>
    getConvertedCur(amount, fromCur, toCur)
  );
  return { isLoading, error, convertedCur };
}
