<<<<<<< HEAD
export const pattern = /^[0-9]*$/;
=======
export const pattern = /^[0-9]*(\.[0-9]+)?$/;
>>>>>>> master
export const INIT_VALUE = 0;

export const currencies = [
  { label: 'USD', value: 'USD' },
  { label: 'EUR', value: 'EUR' },
];
const data = {
  AUD: 'Australian Dollar',
  BGN: 'Bulgarian Lev',
  BRL: 'Brazilian Real',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Renminbi Yuan',
  CZK: 'Czech Koruna',
  DKK: 'Danish Krone',
  EUR: 'Euro',
  GBP: 'British Pound',
  HKD: 'Hong Kong Dollar',
  HUF: 'Hungarian Forint',
  IDR: 'Indonesian Rupiah',
  ILS: 'Israeli New Sheqel',
  INR: 'Indian Rupee',
  ISK: 'Icelandic Króna',
  JPY: 'Japanese Yen',
  KRW: 'South Korean Won',
  MXN: 'Mexican Peso',
  MYR: 'Malaysian Ringgit',
  NOK: 'Norwegian Krone',
  NZD: 'New Zealand Dollar',
  PHP: 'Philippine Peso',
  PLN: 'Polish Złoty',
  RON: 'Romanian Leu',
  SEK: 'Swedish Krona',
  SGD: 'Singapore Dollar',
  THB: 'Thai Baht',
  TRY: 'Turkish Lira',
  USD: 'United States Dollar',
  ZAR: 'South African Rand',
};

export const currenciesPro = Object.keys(data).map((key) => ({
  label: key,
  value: key,
}));

export const weightsPro = [
  { label: 'Gram (g)', value: 'g' },
  { label: 'Kilogram (kg)', value: 'kg' },
  { label: 'Milligram (mg)', value: 'mg' },
  { label: 'Microgram (µg)', value: 'mcg' },
  { label: 'Metric Ton (ton)', value: 'ton' },
  { label: 'Pound (lb)', value: 'lb' },
  { label: 'Ounce (oz)', value: 'oz' },
  { label: 'Cup Flour (US)', value: 'cup-us-flour' },
  { label: 'Cup Sugar (US)', value: 'cup-us-sugar' },
  { label: 'Cup Rice (US)', value: 'cup-us-rice' },
  { label: 'Cup Oats (US)', value: 'cup-us-oats' },
];
export const weights = [
  { label: 'Gram (g)', value: 'g' },
  { label: 'Kilogram (kg)', value: 'kg' },
  { label: 'Pound (lb)', value: 'lb' },
  { label: 'Cup Sugar (US)', value: 'cup-us-sugar' },
];

export const volumesPro = [
  { label: 'Milliliter (ml)', value: 'ml' },
  { label: 'Centiliter (cl)', value: 'cl' },
  { label: 'Deciliter (dl)', value: 'dl' },
  { label: 'Liter (l)', value: 'l' },
  { label: 'Cubic Centimeter (cm³)', value: 'cm3' },
  { label: 'Cubic Meter (m³)', value: 'm3' },
  { label: 'Fluid Ounce (fl-oz)', value: 'fl-oz' },
  { label: 'Gallon (US)', value: 'gal' },
  { label: 'Pint (US)', value: 'pt' },
  { label: 'Cup (US)', value: 'cup' },
];
export const volumes = [
  { label: 'Milliliter (ml)', value: 'ml' },
  { label: 'Liter (l)', value: 'l' },
  { label: 'Fluid Ounce (fl-oz)', value: 'fl-oz' },
  { label: 'Cup (US)', value: 'cup' },
];

export const lengthsPro = [
  { label: 'Millimeter (mm)', value: 'mm' },
  { label: 'Centimeter (cm)', value: 'cm' },
  { label: 'Meter (m)', value: 'm' },
  { label: 'Kilometer (km)', value: 'km' },
  { label: 'Inch (in)', value: 'in' },
  { label: 'Foot (ft)', value: 'ft' },
  { label: 'Yard (yd)', value: 'yd' },
  { label: 'Mile (mi)', value: 'mi' },
  { label: 'Sea Mile (nmi)', value: 'nmi' },
];
export const lengths = [
  { label: 'Centimeter (cm)', value: 'cm' },
  { label: 'Meter (m)', value: 'm' },
  { label: 'Inch (in)', value: 'in' },
  { label: 'Mile (mi)', value: 'mi' },
];

export const areasPro = [
  { label: 'Square Millimeter (mm²)', value: 'mm2' },
  { label: 'Square Centimeter (cm²)', value: 'cm2' },
  { label: 'Square Meter (m²)', value: 'm2' },
  { label: 'Square Kilometer (km²)', value: 'km2' },
  { label: 'Square Inch (in²)', value: 'in2' },
  { label: 'Square Foot (ft²)', value: 'ft2' },
  { label: 'Square Yard (yd²)', value: 'yd2' },
  { label: 'Square Mile (mi²)', value: 'mi2' },
  { label: 'Acre (ac)', value: 'ac' },
  { label: 'Hectare (ha)', value: 'ha' },
  { label: 'Tatami Mat', value: 'tatami' },
];
export const areas = [
  { label: 'Square Meter (m²)', value: 'm2' },
  { label: 'Square Foot (ft²)', value: 'ft2' },
  { label: 'Acre (ac)', value: 'ac' },
  { label: 'Hectare (ha)', value: 'ha' },
];
