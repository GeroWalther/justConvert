import { areas, lengths, volumes } from '../../constants';
import convert from 'convert-units';

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
    if (action.type === 'nmiTom') {
      newValue = action.payload.value * 1852;
    } else if (action.type === 'mTonmi') {
      newValue = action.payload.value / 1852;
    } else if (action.type === 'nmiTocm') {
      newValue = action.payload.value * 185200;
    } else if (action.type === 'cmTonmi') {
      newValue = action.payload.value / 185200;
    } else if (action.type === 'nmiTokm') {
      newValue = action.payload.value * 1.852;
    } else if (action.type === 'kmTonmi') {
      newValue = action.payload.value / 1.852;
    } else if (action.type === 'miTonmi') {
      newValue = action.payload.value / 1.15078;
    } else if (action.type === 'nmiTomi') {
      newValue = action.payload.value * 1.15078;
    } else if (action.type === 'nmiToyd') {
      newValue = action.payload.value * 2025.37;
    } else if (action.type === 'ydTonmi') {
      newValue = action.payload.value / 2025.37;
    } else if (action.type === 'nmiToft') {
      newValue = action.payload.value * 6076.12;
    } else if (action.type === 'ftTonmi') {
      newValue = action.payload.value / 6076.12;
    } else if (action.type === 'nmiToin') {
      newValue = action.payload.value * 72913.4;
    } else if (action.type === 'inTonmi') {
      newValue = action.payload.value / 72913.4;
    } else if (action.type === 'nmiTomm') {
      newValue = action.payload.value * 1852000;
    } else if (action.type === 'mmTonmi') {
      newValue = (action.payload.value / 1852000).toFixed(6);
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
    let newValue;

    if (action.type === 'tatamiTomm2') {
      newValue = action.payload.value * 1620; // Convert to Square Millimeter (mm²)
    } else if (action.type === 'mm2Totatami') {
      newValue = action.payload.value / 1620; // Convert from Square Millimeter (mm²) to Tatami Mat
    } else if (action.type === 'tatamiTocm2') {
      newValue = action.payload.value * 162; // Convert to Square Centimeter (cm²)
    } else if (action.type === 'cm2Totatami') {
      newValue = action.payload.value / 162; // Convert from Square Centimeter (cm²) to Tatami Mat
    } else if (action.type === 'tatamiTom2') {
      newValue = action.payload.value * 1.62; // Convert to Square Meter (m²)
    } else if (action.type === 'm2Totatami') {
      newValue = (action.payload.value / 1.62).toFixed(4); // Convert from Square Meter (m²) to Tatami Mat
    } else if (action.type === 'tatamiTokm2') {
      newValue = action.payload.value / (1.62 * 1000000); // Convert to Square Kilometer (km²)
    } else if (action.type === 'km2Totatami') {
      newValue = action.payload.value * (1.62 * 1000000); // Convert from Square Kilometer (km²) to Tatami Mat
    } else if (action.type === 'tatamiToin2') {
      newValue = action.payload.value * 2509.74; // Convert to Square Inch (in²)
    } else if (action.type === 'in2Totatami') {
      newValue = action.payload.value / 2509.74; // Convert from Square Inch (in²) to Tatami Mat
    } else if (action.type === 'tatamiToft2') {
      newValue = action.payload.value * 17.222; // Convert to Square Foot (ft²)
    } else if (action.type === 'ft2Totatami') {
      newValue = action.payload.value / 17.222; // Convert from Square Foot (ft²) to Tatami Mat
    } else if (action.type === 'tatamiToyd2') {
      newValue = action.payload.value * 1.913; // Convert to Square Yard (yd²)
    } else if (action.type === 'yd2Totatami') {
      newValue = action.payload.value / 1.913; // Convert from Square Yard (yd²) to Tatami Mat
    } else if (action.type === 'tatamiTomi2') {
      newValue = action.payload.value * 0.000618; // Convert to Square Mile (mi²)
    } else if (action.type === 'mi2Totatami') {
      newValue = action.payload.value / 0.000618; // Convert from Square Mile (mi²) to Tatami Mat
    } else if (action.type === 'tatamiToac') {
      newValue = action.payload.value * 0.000247; // Convert to Acre (ac)
    } else if (action.type === 'acTotatami') {
      newValue = action.payload.value / 0.000247; // Convert from Acre (ac) to Tatami Mat
    } else if (action.type === 'tatamiToha') {
      newValue = action.payload.value * 0.0000064; // Convert to Hectare (ha)
    } else if (action.type === 'haTotatami') {
      newValue = action.payload.value / 0.0000064; // Convert from Hectare (ha) to Tatami Mat
    } else
      newValue = convertUnit(
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
