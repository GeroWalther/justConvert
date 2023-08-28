import { areas, lengths, volumes } from '../../constants';
import convert from 'convert-units';

// Check if 'nmi' (Nautical Miles) is supported
const isNauticalMilesSupported = convert().possibilities('nmi').length > 0;

// Check if 'tatami' is supported
const isTatamiSupported = convert().possibilities('tatami').length > 0;

console.log('Is Nautical Miles (nmi) supported?', isNauticalMilesSupported);
console.log('Is Tatami supported?', isTatamiSupported);

// Generic conversion function
function convertUnit(value, fromUnit, toUnit) {
  const result = convert(value).from(fromUnit).to(toUnit);
  return parseFloat(result.toFixed(5));
}

// Generic function to generate conversion cases
function generateConversionCases(units) {
  const conversionCases = {};
  units.forEach((fromUnitItem) => {
    units.forEach((toUnitItem) => {
      if (fromUnitItem.value !== toUnitItem.value) {
        const caseName = `${fromUnitItem.value}To${toUnitItem.value}`;

        conversionCases[caseName] = (state, action) => {
          return {
            ...state,
            converted: convertUnit(action.payload.value, {
              from: fromUnitItem.value,
              to: toUnitItem.value,
            }),
          };
        };
      }
    });
  });
  return conversionCases;
}

const lengthConversionCases = generateConversionCases(lengths);

export function lengthReducer(state, action) {
  const conversionCases = lengthConversionCases;
  if (action.type in conversionCases) {
    let newValue;

    if (action.payload.fromUnit === 'nmi' || action.payload.toUnit === 'nmi') {
      const conversionRate = 1.15078;
      const valueInMiles =
        action.payload.fromUnit === 'nmi'
          ? action.payload.value * conversionRate
          : action.payload.value / conversionRate;
      newValue = convertUnit(
        valueInMiles,
        'mi', // Convert to Miles (mi)
        action.payload.toUnit
      );
    } else {
      newValue = convertUnit(
        action.payload.value,
        action.payload.fromUnit,
        action.payload.toUnit
      );
    }
    return {
      ...state,
      converted: newValue,
    };
  }
  return state;
}

const areaConversionCases = generateConversionCases(areas);
export function areaReducer(state, action) {
  const conversionCases = areaConversionCases;
  if (action.type in conversionCases) {
    const newValue = convertUnit(
      action.payload.value,
      action.payload.fromUnit,
      action.payload.toUnit
    );
    return {
      ...state,
      converted: newValue,
    };
  }
  return state;
}

const volumeConversionCases = generateConversionCases(volumes);
export function volumeReducer(state, action) {
  const conversionCases = volumeConversionCases;
  if (action.type in conversionCases) {
    const newValue = convertUnit(
      action.payload.value,
      action.payload.fromUnit,
      action.payload.toUnit
    );
    return {
      ...state,
      converted: newValue,
    };
  }
  return state;
}
