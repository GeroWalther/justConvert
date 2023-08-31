import { areas, lengths, volumes, weights } from '../../constants';
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

export function areaReducer(state, action) {
  const conversionCases = generateConversionCases(areas);
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

export function volumeReducer(state, action) {
  const conversionCases = generateConversionCases(volumes);
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

export function weightReducer(state, action) {
  const conversionCases = generateConversionCases(weights);
  if (action.type in conversionCases) {
    let newValue;
    if (action.type === 'cup-us-sugarTog') {
      newValue = action.payload.value * 200;
    } else if (action.type === 'cup-us-sugarTolb') {
      newValue = action.payload.value / 0.45359237;
    } else if (action.type === 'cup-us-riceTog') {
      newValue = action.payload.value * 185;
    } else if (action.type === 'cup-us-oatsTog') {
      newValue = action.payload.value * 90;
    } else if (action.type === 'cup-us-flourTomg') {
      newValue = action.payload.value * 1000;
    } else if (action.type === 'cup-us-flourTomcg') {
      newValue = action.payload.value * 1000000;
    } else if (action.type === 'cup-us-flourToton') {
      newValue = action.payload.value / 907.18474;
    } else if (action.type === 'cup-us-sugarTolb') {
      newValue = action.payload.value / 16;
    } else if (action.type === 'cup-us-sugarToz') {
      newValue = action.payload.value / 16;
    } else if (action.type === 'kgTocup-us-flour') {
      newValue = action.payload.value * 8.81849;
    } else if (action.type === 'lbTocup-us-sugar') {
      newValue = action.payload.value * 2.25;
    } else if (action.type === 'ozTocup-us-rice') {
      newValue = action.payload.value / 7.3;
    } else if (action.type === 'mgTocup-us-sugar') {
      newValue = action.payload.value * 0.002;
    } else if (action.type === 'mcgTocup-us-sugar') {
      newValue = action.payload.value * 0.000002;
    } else if (action.type === 'tonTocup-us-sugar') {
      newValue = action.payload.value * 10000;
    } else if (action.type === 'lbTocup-us-sugar') {
      newValue = action.payload.value * 2.25;
    } else if (action.type === 'ozTocup-us-sugar') {
      newValue = action.payload.value * 0.0397;
    } else if (action.type === 'mgTocup-us-rice') {
      newValue = action.payload.value * 0.2141;
    } else if (action.type === 'mcgTocup-us-rice') {
      newValue = action.payload.value * 0.0002141;
    } else if (action.type === 'tonTocup-us-rice') {
      newValue = action.payload.value * 1850;
    } else if (action.type === 'lbTocup-us-rice') {
      newValue = action.payload.value * 185;
    } else if (action.type === 'cup-us-riceTolb') {
      newValue = action.payload.value / 185;
    } else if (action.type === 'ozTocup-us-rice') {
      newValue = action.payload.value * 11.1;
    } else if (action.type === 'cup-us-riceTooz') {
      newValue = action.payload.value / 11.1;
    } else if (action.type === 'cup-us-riceTokg') {
      newValue = action.payload.value / 11.1;
    } else if (action.type === 'cup-us-riceTokg') {
      newValue = action.payload.value / 1000;
    } else if (action.type === 'cup-us-riceTomg') {
      newValue = action.payload.value * 90909.09;
    } else if (action.type === 'cup-us-riceTomcg') {
      newValue = action.payload.value * 90909090.9;
    } else if (action.type === 'cup-us-riceToton') {
      newValue = action.payload.value / 909090.909;
    } else if (action.type === 'ozToCup-us-rice') {
      newValue = action.payload.value * 11.1;
    } else if (action.type === 'kgToCup-us-rice') {
      newValue = action.payload.value * 1000;
    } else if (action.type === 'mgToCup-us-rice') {
      newValue = action.payload.value / 90909.09;
    } else if (action.type === 'mcgToCup-us-rice') {
      newValue = action.payload.value / 90909090.9;
    } else if (action.type === 'tonToCup-us-rice') {
      newValue = action.payload.value * 909090.909;
    } else if (action.type === 'tonTocup-us-flour') {
      newValue = action.payload.value * 2204.62;
    } else if (action.type === 'cup-us-flourTokg') {
      newValue = action.payload.value / 35.27396;
    } else if (action.type === 'kgTocup-us-flour') {
      newValue = action.payload.value * 35.27396;
    } else if (action.type === 'cup-us-flourTog') {
      newValue = action.payload.value * 120;
    } else if (action.type === 'gTocup-us-flour') {
      newValue = action.payload.value / 120;
    } else if (action.type === 'mgTocup-us-flour') {
      newValue = action.payload.value / 284495;
    } else if (action.type === 'mcgTocup-us-flour') {
      newValue = action.payload.value / 284495000; // Convert to Cups of Flour
    } else if (action.type === 'lbTocup-us-flour') {
      newValue = action.payload.value * 2.25; // Convert to Cups of Flour
    } else if (action.type === 'cup-us-flourTolb') {
      newValue = action.payload.value / 2.25; // Convert to Pounds (lb)
    } else if (action.type === 'cup-us-flourTooz') {
      newValue = action.payload.value / 16; // Convert to Ounces (oz)
    } else if (action.type === 'ozTocup-us-flour') {
      newValue = action.payload.value * 16; // Convert to Ounces (oz)
    } else if (action.type === 'ozTocup-us-oats') {
      newValue = action.payload.value / 4; // Convert to Cups of Oats
    } else if (action.type === 'cup-us-oatsTooz') {
      newValue = action.payload.value * 4;
    } else if (action.type === 'cup-us-oatsTolb') {
      newValue = action.payload.value / 4;
    } else if (action.type === 'lbTocup-us-oats') {
      newValue = action.payload.value * 4; // Convert to Cups of Oats
    } else if (action.type === 'tonTocup-us-oats') {
      newValue = action.payload.value * 320; // Convert to Cups of Oats
    } else if (action.type === 'cup-us-oatsToton') {
      newValue = action.payload.value / 320; // Convert to Tons
    } else if (action.type === 'cup-us-oatsTomcg') {
      newValue = action.payload.value * 284495000; // Convert to Micrograms (mcg)
    } else if (action.type === 'mcgTocup-us-oats') {
      newValue = action.payload.value / 284495000; // Convert to Cups of Oats
    } else if (action.type === 'mgTocup-us-oats') {
      newValue = action.payload.value / 1000; // Convert to Cups of Oats
    } else if (action.type === 'cup-us-oatsTomg') {
      newValue = action.payload.value * 1000; // Convert to Milligrams (mg)
    } else if (action.type === 'cup-us-oatsTokg') {
      newValue = action.payload.value / 35.274; // Convert to Kilograms (kg)
    } else if (action.type === 'kgTocup-us-oats') {
      newValue = action.payload.value * 35.274; // Convert to Cups of Oats (cup-us-oats)
    } else if (action.type === 'gTocup-us-oats') {
      newValue = action.payload.value / 28.35; // Convert to Cups of Oats (cup-us-oats)
    } else if (action.type === 'gTocup-us-rice') {
      newValue = action.payload.value / 185; // Convert to Cups of Rice (cup-us-rice)
    } else if (action.type === 'gTocup-us-sugar') {
      newValue = action.payload.value / 200; // Convert to Cups of Sugar (cup-us-sugar)
    } else if (action.type === 'mgTocup-us-sugar') {
      newValue = action.payload.value * 0.002; // Adjust this conversion factor if necessary
    } else if (action.type === 'mcgTocup-us-sugar') {
      newValue = action.payload.value * 0.000002; // Adjust this conversion factor if necessary
    } else if (action.type === 'tonTocup-us-sugar') {
      newValue = action.payload.value * 10000; // Adjust this conversion factor if necessary
    } else if (action.type === 'cup-us-sugarTomg') {
      newValue = action.payload.value * 500000; // Adjust this conversion factor if necessary
    } else if (action.type === 'cup-us-sugarTomcg') {
      newValue = action.payload.value * 500000000; // Adjust this conversion factor if necessary
    } else if (action.type === 'cup-us-sugarToton') {
      newValue = action.payload.value * 0.0001;
    } else if (action.type === 'cup-us-sugarTokg') {
      newValue = action.payload.value * 0.226796; // Convert to Kilograms (kg)
    } else if (action.type === 'kgTocup-us-sugar') {
      newValue = action.payload.value / 0.226796; // Convert to Kilograms (kg)
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
