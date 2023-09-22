export async function getConvertedCur(amount, fromCur, toCur) {
  const res = await fetch(
    `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
  );
  const data = await res.json();
  return data.rates[toCur];
}
