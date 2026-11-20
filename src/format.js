// Reading numbers people type and writing numbers people can read.
// CommonJS on purpose: shared by the app and by `npm test`.

// Accepts both decimal styles: "1,5" and "1.5" are one and a half, and
// "1.234,56" / "1,234.56" are both read as 1234.56. Returns NaN for anything
// that is not a number, and for empty input.
function parseInput(text) {
  if (text == null) return NaN;
  let s = String(text).trim().replace(/[\s'’_]/g, '').replace(/−/g, '-');
  if (s === '' || s === '-' || s === '+') return NaN;
  const commas = (s.match(/,/g) || []).length;
  const dots = (s.match(/\./g) || []).length;
  if (commas > 0 && dots > 0) {
    // Whichever comes last is the decimal mark, the other groups thousands.
    if (s.lastIndexOf(',') > s.lastIndexOf('.')) s = s.replace(/\./g, '').replace(',', '.');
    else s = s.replace(/,/g, '');
  } else if (commas === 1) {
    s = s.replace(',', '.');
  } else if (commas > 1) {
    s = s.replace(/,/g, '');
  } else if (dots > 1) {
    s = s.replace(/\./g, '');
  }
  if (!/^[+-]?(\d+\.?\d*|\.\d+)$/.test(s)) return NaN;
  return Number(s);
}

// How many decimals to show so the number carries about `sig` meaningful digits.
function decimalsFor(abs, sig) {
  if (abs === 0) return 0;
  const magnitude = Math.floor(Math.log10(abs));
  return Math.max(0, Math.min(12, sig - 1 - magnitude));
}

let cachedLocale;
function deviceLocale() {
  if (cachedLocale === undefined) {
    try {
      cachedLocale = new Intl.NumberFormat().resolvedOptions().locale;
    } catch (e) {
      cachedLocale = 'en-US';
    }
  }
  return cachedLocale;
}

// Formats a result for display. Money gets two decimals; everything else gets
// about seven meaningful digits with trailing zeros dropped. Very large and
// very small values switch to scientific notation instead of a wall of zeros.
function formatNumber(value, options) {
  const opts = options || {};
  if (typeof value !== 'number' || !Number.isFinite(value)) return '—';
  if (value === 0) return '0';
  const abs = Math.abs(value);
  const locale = opts.locale || deviceLocale();
  if (abs >= 1e15 || abs < 1e-9) {
    const [mantissa, exponent] = value.toExponential(4).split('e');
    const m = Number(mantissa).toLocaleString(locale, { maximumFractionDigits: 4 });
    return `${m} × 10^${Number(exponent)}`;
  }
  let maxDecimals;
  let minDecimals = 0;
  if (opts.money) {
    maxDecimals = abs >= 1 ? 2 : decimalsFor(abs, 3);
    minDecimals = abs >= 1 ? 2 : 0;
  } else {
    maxDecimals = decimalsFor(abs, opts.sig || 7);
    // Some quantities (temperature) read better with a fixed, short tail.
    if (typeof opts.maxDecimals === 'number' && abs >= 0.01) maxDecimals = Math.min(maxDecimals, opts.maxDecimals);
  }
  try {
    return new Intl.NumberFormat(locale, { minimumFractionDigits: minDecimals, maximumFractionDigits: maxDecimals }).format(value);
  } catch (e) {
    return String(Number(value.toFixed(maxDecimals)));
  }
}

module.exports = { parseInput, formatNumber };
