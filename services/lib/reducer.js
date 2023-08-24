export function reducer(state, action) {
  switch (action.type) {
    case 'kgToLb':
      return { ...state, converted: (action.payload * 2.20462).toFixed(2) };
    case 'grToLb':
      return { ...state, converted: (action.payload / 453.59237).toFixed(4) };
    case 'lbToKg':
      return { ...state, converted: (action.payload * 0.453592).toFixed(6) };
    case 'grToKg':
      return { ...state, converted: action.payload * 0.001 };
    case 'kgToGr':
      return { ...state, converted: action.payload * 1000 };
    case 'mgToKg':
      return { ...state, converted: (action.payload * 0.000001).toFixed(6) };
    case 'kgToMg':
      return { ...state, converted: action.payload * 1000000 };
    case 'µgToKg':
      return {
        ...state,
        converted: (action.payload * 0.000000001).toFixed(10),
      };
    case 'kgToµg':
      return { ...state, converted: action.payload * 1000000000 };
    case 'tonToKg':
      return { ...state, converted: action.payload * 1000 };
    case 'kgToTon':
      return { ...state, converted: (action.payload * 0.001).toFixed(4) };
    case 'ozToLb':
      return { ...state, converted: (action.payload * 0.0625).toFixed(4) };
    case 'lbToOz':
      return { ...state, converted: action.payload * 16 };
    case 'grToMg':
      return { ...state, converted: (action.payload * 1000).toFixed(2) };
    case 'mgToGr':
      return { ...state, converted: (action.payload * 0.001).toFixed(2) };
    case 'µgToGr':
      return { ...state, converted: (action.payload * 0.000001).toFixed(2) };
    case 'grToµg':
      return { ...state, converted: (action.payload * 1000000).toFixed(2) };
    case 'tonToLb':
      return { ...state, converted: (action.payload * 2204.62).toFixed(2) };
    case 'lbToTon':
      return { ...state, converted: (action.payload * 0.000453592).toFixed(2) };
    case 'ozToGr':
      return { ...state, converted: (action.payload * 28.3495).toFixed(2) };
    case 'grToOz':
      return { ...state, converted: (action.payload * 0.03527396).toFixed(2) };
    case 'µgToMg':
      return { ...state, converted: (action.payload * 0.001).toFixed(2) };
    case 'mgToµg':
      return { ...state, converted: (action.payload * 1000).toFixed(2) };
    case 'grToOz':
      return { ...state, converted: (action.payload * 0.03527396).toFixed(2) };
    case 'ozToGr':
      return { ...state, converted: (action.payload * 28.3495).toFixed(2) };
    case 'mgToµg':
      return { ...state, converted: (action.payload * 1000).toFixed(2) };
    case 'µgToMg':
      return { ...state, converted: (action.payload * 0.001).toFixed(2) };
    case 'grToMg':
      return { ...state, converted: (action.payload * 1000).toFixed(2) };
    case 'mgToGr':
      return { ...state, converted: (action.payload * 0.001).toFixed(2) };
    case 'lbToµg':
      return { ...state, converted: action.payload * 453592370 };
    case 'µgToLb':
      return { ...state, converted: (action.payload / 453592370).toFixed(10) };
    case 'cupflToGr':
      return {
        ...state,
        converted: action.payload * 240,
      };
    case 'cupSugarToGr':
      return {
        ...state,
        converted: action.payload * 200,
      };
    case 'cupRiceToGr':
      return {
        ...state,
        converted: action.payload * 195,
      };
    case 'cupOatsToGr':
      return {
        ...state,
        converted: action.payload * 90,
      };
    case 'cupFlourToKg':
      return {
        ...state,
        converted: action.payload * 0.12,
      };
    case 'cupFlourToMg':
      return {
        ...state,
        converted: action.payload * 120000,
      };
    case 'cupFlourToµg':
      return {
        ...state,
        converted: action.payload * 120000000,
      };
    case 'cupFlourToTon':
      return {
        ...state,
        converted: action.payload * 0.00012,
      };
    case 'cupFlourToLb':
      return {
        ...state,
        converted: action.payload * 0.2646,
      };
    case 'cupFlourToOz':
      return {
        ...state,
        converted: action.payload * 4,
      };

    case 'cupSugarToKg':
      return {
        ...state,
        converted: action.payload * 0.2,
      };
    case 'cupSugarToMg':
      return {
        ...state,
        converted: action.payload * 200000,
      };
    case 'cupSugarToµg':
      return {
        ...state,
        converted: action.payload * 200000000,
      };
    case 'cupSugarToTon':
      return {
        ...state,
        converted: action.payload * 0.0002,
      };
    case 'cupSugarToLb':
      return {
        ...state,
        converted: action.payload * 0.4409,
      };
    case 'cupSugarToOz':
      return {
        ...state,
        converted: action.payload * 7.055,
      };
    case 'cupRiceToKg':
      return {
        ...state,
        converted: action.payload * 0.18,
      };
    case 'cupRiceToMg':
      return {
        ...state,
        converted: action.payload * 180000,
      };
    case 'cupRiceToµg':
      return {
        ...state,
        converted: action.payload * 180000000,
      };
    case 'cupRiceToTon':
      return {
        ...state,
        converted: action.payload * 0.00018,
      };
    case 'cupRiceToLb':
      return {
        ...state,
        converted: action.payload * 0.3968,
      };
    case 'cupRiceToOz':
      return {
        ...state,
        converted: action.payload * 6.349,
      };

    case 'cupOatsToKg':
      return {
        ...state,
        converted: action.payload * 0.11,
      };
    case 'cupOatsToMg':
      return {
        ...state,
        converted: action.payload * 110000,
      };
    case 'cupOatsToµg':
      return {
        ...state,
        converted: action.payload * 110000000,
      };
    case 'cupOatsToTon':
      return {
        ...state,
        converted: action.payload * 0.00011,
      };
    case 'cupOatsToLb':
      return {
        ...state,
        converted: action.payload * 0.2425,
      };
    case 'cupOatsToOz':
      return {
        ...state,
        converted: action.payload * 3.88,
      };
    case 'cupFlourToMg':
      return {
        ...state,
        converted: (action.payload * 240000).toFixed(2),
      };

    case 'cupFlourToµg':
      return {
        ...state,
        converted: (action.payload * 240000000).toFixed(2),
      };

    case 'cupFlourToTon':
      return {
        ...state,
        converted: (action.payload * 0.00024).toFixed(2),
      };

    case 'cupFlourToLb':
      return {
        ...state,
        converted: (action.payload * 0.5283).toFixed(2),
      };

    case 'cupFlourToOz':
      return {
        ...state,
        converted: (action.payload * 8.4375).toFixed(2),
      };
    case 'kgToCupFlour':
      return {
        ...state,
        converted: (action.payload * 8.33333).toFixed(2),
      };

    case 'lbToCupSugar':
      return {
        ...state,
        converted: (action.payload * 2.26458).toFixed(2),
      };

    case 'ozToCupRice':
      return {
        ...state,
        converted: (action.payload * 0.39525).toFixed(2),
      };
    case 'cupFlourToKg':
      return {
        ...state,
        converted: (action.payload * 0.12).toFixed(2),
      };

    case 'cupSugarToLb':
      return {
        ...state,
        converted: (action.payload * 0.4409).toFixed(2),
      };

    case 'cupRiceToGr':
      return {
        ...state,
        converted: (action.payload * 195).toFixed(2),
      };
    case 'grToCupSugar':
      return {
        ...state,
        converted: (action.payload / 200).toFixed(2),
      };
    case 'kgToCupSugar':
      return {
        ...state,
        converted: (action.payload * 500).toFixed(2),
      };
    case 'grToCupRice':
      return {
        ...state,
        converted: (action.payload / 195).toFixed(2),
      };
    case 'kgToCupRice':
      return {
        ...state,
        converted: (action.payload * 5.1282).toFixed(2),
      };
    case 'grToCupFlour':
      return {
        ...state,
        converted: (action.payload / 90).toFixed(2),
      };
    case 'kgToCupFlour':
      return {
        ...state,
        converted: (action.payload * 11.1111).toFixed(2),
      };
    case 'grToCupOats':
      return {
        ...state,
        converted: (action.payload / 90).toFixed(2),
      };
    case 'kgToCupOats':
      return {
        ...state,
        converted: (action.payload * 11.1111).toFixed(2),
      };
    case 'mgToCupSugar':
      return {
        ...state,
        converted: (action.payload / 200000).toFixed(2),
      };
    case 'µgToCupSugar':
      return {
        ...state,
        converted: (action.payload / 200000000).toFixed(2),
      };
    case 'tonToCupSugar':
      return {
        ...state,
        converted: (action.payload * 500000).toFixed(2),
      };
    case 'lbToCupSugar':
      return {
        ...state,
        converted: (action.payload * 1133.98).toFixed(2),
      };
    case 'ozToCupSugar':
      return {
        ...state,
        converted: (action.payload * 14.3).toFixed(2),
      };

    case 'mgToCupRice':
      return {
        ...state,
        converted: (action.payload / 180000).toFixed(2),
      };
    case 'µgToCupRice':
      return {
        ...state,
        converted: (action.payload / 180000000).toFixed(2),
      };
    case 'tonToCupRice':
      return {
        ...state,
        converted: (action.payload * 5555.56).toFixed(2),
      };
    case 'lbToCupRice':
      return {
        ...state,
        converted: (action.payload * 12658.39).toFixed(2),
      };
    case 'ozToCupRice':
      return {
        ...state,
        converted: (action.payload * 160.77).toFixed(2),
      };

    case 'mgToCupFlour':
      return {
        ...state,
        converted: (action.payload / 120000).toFixed(2),
      };
    case 'µgToCupFlour':
      return {
        ...state,
        converted: (action.payload / 120000000).toFixed(2),
      };
    case 'tonToCupFlour':
      return {
        ...state,
        converted: (action.payload * 4166.67).toFixed(2),
      };
    case 'lbToCupFlour':
      return {
        ...state,
        converted: (action.payload * 9488.32).toFixed(2),
      };
    case 'ozToCupFlour':
      return {
        ...state,
        converted: (action.payload * 120.1).toFixed(2),
      };

    case 'mgToCupOats':
      return {
        ...state,
        converted: (action.payload / 110000).toFixed(2),
      };
    case 'µgToCupOats':
      return {
        ...state,
        converted: (action.payload / 110000000).toFixed(2),
      };
    case 'tonToCupOats':
      return {
        ...state,
        converted: (action.payload * 4545.45).toFixed(2),
      };
    case 'lbToCupOats':
      return {
        ...state,
        converted: (action.payload * 10363.64).toFixed(2),
      };
    case 'ozToCupOats':
      return {
        ...state,
        converted: (action.payload * 131.82).toFixed(2),
      };

    default:
      return state;
  }
}
