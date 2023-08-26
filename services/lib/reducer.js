import convert from 'convert-units';

function convertUnit(value, fromUnit, toUnit, decimalPlaces) {
  const result = convert(value).from(fromUnit).to(toUnit);
  return parseFloat(result.toFixed(decimalPlaces));
}

export function reducer(state, action) {
  switch (action.type) {
    case 'kgToLb':
      return {
        ...state,
        converted: convertUnit(action.payload, 'kg', 'lb', 2),
      };
    case 'lbToKg':
      return {
        ...state,
        converted: convertUnit(action.payload, 'lb', 'kg', 6),
      };
    case 'kgToOz':
      return {
        ...state,
        converted: convertUnit(action.payload, 'kg', 'oz', 3),
      };
    case 'ozToKg':
      return {
        ...state,
        converted: convertUnit(action.payload, 'oz', 'kg', 2),
      };
    case 'grToKg':
      return {
        ...state,
        converted: convertUnit(action.payload, 'gr', 'kg', 6),
      };
    case 'kgToGr':
      return {
        ...state,
        converted: convertUnit(action.payload, 'kg', 'gr', 0),
      };
    case 'mgToKg':
      return {
        ...state,
        converted: convertUnit(action.payload, 'mg', 'kg', 6),
      };
    case 'kgToMg':
      return {
        ...state,
        converted: convertUnit(action.payload, 'kg', 'mg', 6),
      };
    case 'mgToLb':
      return {
        ...state,
        converted: convertUnit(action.payload, 'mg', 'lb', 8),
      };
    case 'lbToOz':
      return {
        ...state,
        converted: convertUnit(action.payload, 'lb', 'oz', 4),
      };
    case 'ozToGr':
      return {
        ...state,
        converted: convertUnit(action.payload, 'oz', 'gr', 2),
      };
    case 'grToOz':
      return {
        ...state,
        converted: convertUnit(action.payload, 'gr', 'oz', 2),
      };
    case 'µgToMg':
      return {
        ...state,
        converted: convertUnit(action.payload, 'µg', 'mg', 2),
      };
    case 'mgToµg':
      return {
        ...state,
        converted: convertUnit(action.payload, 'mg', 'µg', 2),
      };
    case 'grToMg':
      return {
        ...state,
        converted: convertUnit(action.payload, 'gr', 'mg', 2),
      };
    case 'mgToGr':
      return {
        ...state,
        converted: convertUnit(action.payload, 'mg', 'gr', 2),
      };
    case 'lbToTon':
      return {
        ...state,
        converted: convertUnit(action.payload, 'lb', 'ton', 2),
      };
    case 'tonToLb':
      return {
        ...state,
        converted: convertUnit(action.payload, 'ton', 'lb', 2),
      };
    case 'tonToKg':
      return {
        ...state,
        converted: convertUnit(action.payload, 'ton', 'kg', 2),
      };
    case 'kgToTon':
      return {
        ...state,
        converted: convertUnit(action.payload, 'kg', 'ton', 4),
      };
    case 'ozToGr':
      return {
        ...state,
        converted: convertUnit(action.payload, 'oz', 'gr', 2),
      };
    case 'grToOz':
      return {
        ...state,
        converted: convertUnit(action.payload, 'gr', 'oz', 2),
      };
    case 'kgToµg':
      return {
        ...state,
        converted: convertUnit(action.payload, 'kg', 'µg', 10),
      };
    case 'µgToKg':
      return {
        ...state,
        converted: convertUnit(action.payload, 'µg', 'kg', 10),
      };
    case 'cupflToGr':
      return {
        ...state,
        converted: convertUnit(action.payload, 'cupfl', 'gr', 2),
      };
    case 'cupSugarToGr':
      return {
        ...state,
        converted: convertUnit(action.payload, 'cupSugar', 'gr', 2),
      };
    case 'cupRiceToGr':
      return {
        ...state,
        converted: convertUnit(action.payload, 'cupRice', 'gr', 2),
      };
    case 'cupOatsToGr':
      return {
        ...state,
        converted: convertUnit(action.payload, 'cupOats', 'gr', 2),
      };
    case 'cupFlourToKg':
      return {
        ...state,
        converted: convertUnit(action.payload, 'cupFlour', 'kg', 2),
      };
    case 'cupFlourToMg':
      return {
        ...state,
        converted: convertUnit(action.payload, 'cupFlour', 'mg', 2),
      };
    case 'cupFlourToµg':
      return {
        ...state,
        converted: convertUnit(action.payload, 'cupFlour', 'µg', 2),
      };
    case 'cupFlourToTon':
      return {
        ...state,
        converted: convertUnit(action.payload, 'cupFlour', 'ton', 2),
      };
    case 'cupFlourToLb':
      return {
        ...state,
        converted: convertUnit(action.payload, 'cupFlour', 'lb', 2),
      };
    case 'cupFlourToOz':
      return {
        ...state,
        converted: convertUnit(action.payload, 'cupFlour', 'oz', 2),
      };
    case 'cupSugarToKg':
      return {
        ...state,
        converted: convertUnit(action.payload, 'cupSugar', 'kg', 2),
      };
    case 'cupSugarToMg':
      return {
        ...state,
        converted: convertUnit(action.payload, 'cupSugar', 'mg', 2),
      };
    case 'cupSugarToµg':
      return {
        ...state,
        converted: convertUnit(action.payload, 'cupSugar', 'µg', 2),
      };
    case 'cupSugarToTon':
      return {
        ...state,
        converted: convertUnit(action.payload, 'cupSugar', 'ton', 2),
      };
    case 'cupSugarToLb':
      return {
        ...state,
        converted: convertUnit(action.payload, 'cupSugar', 'lb', 2),
      };
    case 'cupSugarToOz':
      return {
        ...state,
        converted: convert(action.payload).from('cup').to('fl-oz').toFixed(2),
      };
    case 'mgToCupRice':
      return {
        ...state,
        converted: convert(action.payload).from('mg').to('cup').toFixed(2),
      };
    case 'µgToCupRice':
      return {
        ...state,
        converted: convert(action.payload).from('µg').to('cup').toFixed(2),
      };

    case 'tonToCupRice':
      return {
        ...state,
        converted: convert(action.payload).from('ton').to('cup').toFixed(2),
      };

    case 'lbToCupRice':
      return {
        ...state,
        converted: convert(action.payload).from('lb').to('cup').toFixed(2),
      };

    case 'ozToCupRice':
      return {
        ...state,
        converted: convert(action.payload).from('fl-oz').to('cup').toFixed(2),
      };

    case 'mgToCupFlour':
      return {
        ...state,
        converted: convert(action.payload).from('mg').to('cup').toFixed(2),
      };

    case 'µgToCupFlour':
      return {
        ...state,
        converted: convert(action.payload).from('µg').to('cup').toFixed(2),
      };

    case 'tonToCupFlour':
      return {
        ...state,
        converted: convert(action.payload).from('ton').to('cup').toFixed(2),
      };

    case 'lbToCupFlour':
      return {
        ...state,
        converted: convert(action.payload).from('lb').to('cup').toFixed(2),
      };

    case 'ozToCupFlour':
      return {
        ...state,
        converted: convert(action.payload).from('fl-oz').to('cup').toFixed(2),
      };

    case 'mgToCupOats':
      return {
        ...state,
        converted: convert(action.payload).from('mg').to('cup').toFixed(2),
      };

    case 'µgToCupOats':
      return {
        ...state,
        converted: convert(action.payload).from('µg').to('cup').toFixed(2),
      };

    case 'tonToCupOats':
      return {
        ...state,
        converted: convert(action.payload).from('ton').to('cup').toFixed(2),
      };

    case 'lbToCupOats':
      return {
        ...state,
        converted: convert(action.payload).from('lb').to('cup').toFixed(2),
      };

    case 'ozToCupOats':
      return {
        ...state,
        converted: convert(action.payload).from('fl-oz').to('cup').toFixed(2),
      };

    default:
      return state;
  }
}
