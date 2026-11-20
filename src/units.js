// Every category and unit the app knows, plus the conversion maths.
//
// A unit converts to its category's base unit with `factor` (and `offset` for
// temperature): base = value * factor + offset. Units that are not a straight
// line (fuel economy, running pace) carry their own toBase / fromBase.
//
// Unit ids for currency, length, weight, volume and area are unchanged from
// version 1, so conversions people saved back then still read correctly.
//
// CommonJS on purpose: the same file is used by the app and by `npm test`.

const inverse = (k) => ({ toBase: (v) => k / v, fromBase: (b) => k / b });

const CATEGORIES = [
  {
    id: 'currency',
    name: 'Currency',
    icon: 'cash-multiple',
    storageKey: 'appStateCurr',
    defaults: ['EUR', 'USD'],
    dynamic: true, // units come from the live rate table, see rates.js
    units: [],
  },
  {
    id: 'length',
    name: 'Length',
    icon: 'ruler',
    storageKey: 'appStateLength',
    defaults: ['in', 'cm'],
    units: [
      { id: 'mm', name: 'Millimeter', symbol: 'mm', factor: 0.001 },
      { id: 'cm', name: 'Centimeter', symbol: 'cm', factor: 0.01, free: true },
      { id: 'm', name: 'Meter', symbol: 'm', factor: 1, free: true },
      { id: 'km', name: 'Kilometer', symbol: 'km', factor: 1000, free: true },
      { id: 'in', name: 'Inch', symbol: 'in', factor: 0.0254, free: true },
      { id: 'ft', name: 'Foot', symbol: 'ft', factor: 0.3048, free: true },
      { id: 'yd', name: 'Yard', symbol: 'yd', factor: 0.9144 },
      { id: 'mi', name: 'Mile', symbol: 'mi', factor: 1609.344, free: true },
      { id: 'nmi', name: 'Nautical mile', symbol: 'nmi', factor: 1852 },
    ],
  },
  {
    id: 'weight',
    name: 'Weight',
    icon: 'weight-kilogram',
    storageKey: 'appStateUnit',
    defaults: ['lb', 'kg'],
    units: [
      { id: 'mcg', name: 'Microgram', symbol: 'µg', factor: 1e-6 },
      { id: 'mg', name: 'Milligram', symbol: 'mg', factor: 0.001 },
      { id: 'g', name: 'Gram', symbol: 'g', factor: 1, free: true },
      { id: 'kg', name: 'Kilogram', symbol: 'kg', factor: 1000, free: true },
      { id: 'ton', name: 'Metric ton', symbol: 't', factor: 1e6 },
      { id: 'oz', name: 'Ounce', symbol: 'oz', factor: 28.349523125, free: true },
      { id: 'lb', name: 'Pound', symbol: 'lb', factor: 453.59237, free: true },
      { id: 'st', name: 'Stone', symbol: 'st', factor: 6350.29318 },
      // Kitchen cups are weight-by-volume for one ingredient, so they are approximate.
      { id: 'cup-us-flour', name: 'Cup of flour (US)', symbol: 'cup flour', factor: 120 },
      { id: 'cup-us-sugar', name: 'Cup of sugar (US)', symbol: 'cup sugar', factor: 200, free: true },
      { id: 'cup-us-rice', name: 'Cup of rice (US)', symbol: 'cup rice', factor: 185 },
      { id: 'cup-us-oats', name: 'Cup of oats (US)', symbol: 'cup oats', factor: 90 },
    ],
  },
  {
    id: 'volume',
    name: 'Volume',
    icon: 'cup-water',
    storageKey: 'appStateVolumes',
    defaults: ['cup', 'ml'],
    units: [
      { id: 'ml', name: 'Milliliter', symbol: 'ml', factor: 1, free: true },
      { id: 'cl', name: 'Centiliter', symbol: 'cl', factor: 10 },
      { id: 'dl', name: 'Deciliter', symbol: 'dl', factor: 100 },
      { id: 'l', name: 'Liter', symbol: 'l', factor: 1000, free: true },
      { id: 'cm3', name: 'Cubic centimeter', symbol: 'cm³', factor: 1 },
      { id: 'm3', name: 'Cubic meter', symbol: 'm³', factor: 1e6 },
      { id: 'tsp', name: 'Teaspoon (US)', symbol: 'tsp', factor: 4.92892159375 },
      { id: 'tbsp', name: 'Tablespoon (US)', symbol: 'tbsp', factor: 14.78676478125 },
      { id: 'fl-oz', name: 'Fluid ounce (US)', symbol: 'fl oz', factor: 29.5735295625, free: true },
      { id: 'cup', name: 'Cup (US)', symbol: 'cup', factor: 236.5882365, free: true },
      { id: 'pnt', name: 'Pint (US)', symbol: 'pt', factor: 473.176473 },
      { id: 'qt', name: 'Quart (US)', symbol: 'qt', factor: 946.352946 },
      { id: 'gal', name: 'Gallon (US)', symbol: 'gal', factor: 3785.411784 },
      { id: 'pnt-uk', name: 'Pint (UK)', symbol: 'pt UK', factor: 568.26125 },
      { id: 'gal-uk', name: 'Gallon (UK)', symbol: 'gal UK', factor: 4546.09 },
    ],
  },
  {
    id: 'area',
    name: 'Area',
    icon: 'vector-square',
    storageKey: 'appStateArea',
    defaults: ['ft2', 'm2'],
    units: [
      { id: 'mm2', name: 'Square millimeter', symbol: 'mm²', factor: 1e-6 },
      { id: 'cm2', name: 'Square centimeter', symbol: 'cm²', factor: 1e-4 },
      { id: 'm2', name: 'Square meter', symbol: 'm²', factor: 1, free: true },
      { id: 'km2', name: 'Square kilometer', symbol: 'km²', factor: 1e6 },
      { id: 'in2', name: 'Square inch', symbol: 'in²', factor: 0.00064516 },
      { id: 'ft2', name: 'Square foot', symbol: 'ft²', factor: 0.09290304, free: true },
      { id: 'yd2', name: 'Square yard', symbol: 'yd²', factor: 0.83612736 },
      { id: 'mi2', name: 'Square mile', symbol: 'mi²', factor: 2589988.110336 },
      { id: 'ac', name: 'Acre', symbol: 'ac', factor: 4046.8564224, free: true },
      { id: 'ha', name: 'Hectare', symbol: 'ha', factor: 10000, free: true },
      { id: 'tatami', name: 'Tatami mat', symbol: 'tatami', factor: 1.62 },
    ],
  },
  {
    id: 'temperature',
    name: 'Temperature',
    icon: 'thermometer',
    storageKey: 'appStateTemperature',
    defaults: ['F', 'C'],
    signed: true, // temperatures go below zero
    maxDecimals: 2,
    units: [
      { id: 'C', name: 'Celsius', symbol: '°C', factor: 1, offset: 0, free: true },
      { id: 'F', name: 'Fahrenheit', symbol: '°F', factor: 5 / 9, offset: (-32 * 5) / 9, free: true },
      { id: 'K', name: 'Kelvin', symbol: 'K', factor: 1, offset: -273.15, free: true },
    ],
  },
  {
    id: 'speed',
    name: 'Speed',
    icon: 'speedometer',
    storageKey: 'appStateSpeed',
    defaults: ['mph', 'kmh'],
    units: [
      { id: 'kmh', name: 'Kilometers per hour', symbol: 'km/h', factor: 1 / 3.6, free: true },
      { id: 'mph', name: 'Miles per hour', symbol: 'mph', factor: 0.44704, free: true },
      { id: 'ms', name: 'Meters per second', symbol: 'm/s', factor: 1, free: true },
      { id: 'kn', name: 'Knots', symbol: 'kn', factor: 1852 / 3600 },
      { id: 'fts', name: 'Feet per second', symbol: 'ft/s', factor: 0.3048 },
      // Running pace: a bigger number is slower, so these are inverse.
      { id: 'minkm', name: 'Pace, minutes per km', symbol: 'min/km', ...inverse(1000 / 60) },
      { id: 'minmi', name: 'Pace, minutes per mile', symbol: 'min/mi', ...inverse(1609.344 / 60) },
    ],
  },
  {
    id: 'time',
    name: 'Time',
    icon: 'clock-outline',
    storageKey: 'appStateTime',
    defaults: ['h', 'min'],
    units: [
      { id: 'ms', name: 'Millisecond', symbol: 'ms', factor: 0.001 },
      { id: 's', name: 'Second', symbol: 's', factor: 1, free: true },
      { id: 'min', name: 'Minute', symbol: 'min', factor: 60, free: true },
      { id: 'h', name: 'Hour', symbol: 'h', factor: 3600, free: true },
      { id: 'd', name: 'Day', symbol: 'd', factor: 86400, free: true },
      { id: 'wk', name: 'Week', symbol: 'wk', factor: 604800 },
      { id: 'mo', name: 'Month (average)', symbol: 'mo', factor: 2629746 },
      { id: 'yr', name: 'Year (average)', symbol: 'yr', factor: 31556952 },
    ],
  },
  {
    id: 'data',
    name: 'Data',
    icon: 'database-outline',
    storageKey: 'appStateData',
    defaults: ['GB', 'MB'],
    units: [
      { id: 'bit', name: 'Bit', symbol: 'bit', factor: 0.125 },
      { id: 'B', name: 'Byte', symbol: 'B', factor: 1 },
      { id: 'kB', name: 'Kilobyte', symbol: 'kB', factor: 1e3, free: true },
      { id: 'MB', name: 'Megabyte', symbol: 'MB', factor: 1e6, free: true },
      { id: 'GB', name: 'Gigabyte', symbol: 'GB', factor: 1e9, free: true },
      { id: 'TB', name: 'Terabyte', symbol: 'TB', factor: 1e12 },
      { id: 'KiB', name: 'Kibibyte', symbol: 'KiB', factor: 1024 },
      { id: 'MiB', name: 'Mebibyte', symbol: 'MiB', factor: 1048576 },
      { id: 'GiB', name: 'Gibibyte', symbol: 'GiB', factor: 1073741824 },
      { id: 'TiB', name: 'Tebibyte', symbol: 'TiB', factor: 1099511627776 },
    ],
  },
  {
    id: 'fuel',
    name: 'Fuel',
    icon: 'gas-station',
    storageKey: 'appStateFuel',
    defaults: ['mpg', 'l100'],
    units: [
      { id: 'l100', name: 'Liters per 100 km', symbol: 'L/100 km', factor: 1, free: true },
      { id: 'mpg', name: 'Miles per gallon (US)', symbol: 'mpg', ...inverse(235.214583), free: true },
      { id: 'mpg-uk', name: 'Miles per gallon (UK)', symbol: 'mpg UK', ...inverse(282.480936) },
      { id: 'kml', name: 'Kilometers per liter', symbol: 'km/L', ...inverse(100) },
    ],
  },
  {
    id: 'pressure',
    name: 'Pressure',
    icon: 'gauge',
    storageKey: 'appStatePressure',
    defaults: ['psi', 'bar'],
    units: [
      { id: 'pa', name: 'Pascal', symbol: 'Pa', factor: 1 },
      { id: 'kpa', name: 'Kilopascal', symbol: 'kPa', factor: 1000 },
      { id: 'bar', name: 'Bar', symbol: 'bar', factor: 1e5, free: true },
      { id: 'psi', name: 'Pounds per square inch', symbol: 'psi', factor: 6894.757293168, free: true },
      { id: 'atm', name: 'Atmosphere', symbol: 'atm', factor: 101325 },
      { id: 'mmhg', name: 'Millimeters of mercury', symbol: 'mmHg', factor: 133.322387415 },
    ],
  },
  {
    id: 'energy',
    name: 'Energy',
    icon: 'lightning-bolt',
    storageKey: 'appStateEnergy',
    defaults: ['kcal', 'kj'],
    units: [
      { id: 'j', name: 'Joule', symbol: 'J', factor: 1 },
      { id: 'kj', name: 'Kilojoule', symbol: 'kJ', factor: 1000, free: true },
      { id: 'cal', name: 'Calorie', symbol: 'cal', factor: 4.184 },
      { id: 'kcal', name: 'Kilocalorie', symbol: 'kcal', factor: 4184, free: true },
      { id: 'wh', name: 'Watt-hour', symbol: 'Wh', factor: 3600 },
      { id: 'kwh', name: 'Kilowatt-hour', symbol: 'kWh', factor: 3.6e6 },
      { id: 'btu', name: 'British thermal unit', symbol: 'BTU', factor: 1055.05585262 },
    ],
  },
];

// Currencies anyone can use; the rest are part of Pro.
const FREE_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CHF'];

const CURRENCY_NAMES = {
  AUD: 'Australian Dollar',
  BGN: 'Bulgarian Lev',
  BRL: 'Brazilian Real',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  CZK: 'Czech Koruna',
  DKK: 'Danish Krone',
  EUR: 'Euro',
  GBP: 'British Pound',
  HKD: 'Hong Kong Dollar',
  HUF: 'Hungarian Forint',
  IDR: 'Indonesian Rupiah',
  ILS: 'Israeli New Shekel',
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

// Builds the currency unit list from a rate table quoted against the euro
// ({ USD: 1.08, ... } meaning 1 EUR = 1.08 USD).
function currencyUnits(rates) {
  const table = { EUR: 1, ...(rates || {}) };
  return Object.keys(table)
    .filter((code) => table[code] > 0)
    .sort((a, b) => {
      const fa = FREE_CURRENCIES.indexOf(a), fb = FREE_CURRENCIES.indexOf(b);
      if (fa !== -1 || fb !== -1) return (fa === -1 ? 99 : fa) - (fb === -1 ? 99 : fb);
      return a.localeCompare(b);
    })
    .map((code) => ({
      id: code,
      name: CURRENCY_NAMES[code] || code,
      symbol: code,
      factor: 1 / table[code],
      free: FREE_CURRENCIES.includes(code),
    }));
}

function getCategory(id) {
  return CATEGORIES.find((c) => c.id === id) || CATEGORIES[0];
}

function findUnit(units, id) {
  return units.find((u) => u.id === id) || null;
}

function toBase(unit, value) {
  if (unit.toBase) return unit.toBase(value);
  return value * unit.factor + (unit.offset || 0);
}

function fromBase(unit, base) {
  if (unit.fromBase) return unit.fromBase(base);
  return (base - (unit.offset || 0)) / unit.factor;
}

// Returns NaN when the conversion has no meaning (for example a pace of zero).
function convert(value, from, to) {
  if (!from || !to || typeof value !== 'number' || !Number.isFinite(value)) return NaN;
  if (from.id === to.id) return value;
  const result = fromBase(to, toBase(from, value));
  return Number.isFinite(result) ? result : NaN;
}

module.exports = {
  CATEGORIES,
  FREE_CURRENCIES,
  CURRENCY_NAMES,
  currencyUnits,
  getCategory,
  findUnit,
  convert,
};
