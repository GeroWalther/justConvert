const test = require('node:test');
const assert = require('node:assert/strict');

const { CATEGORIES, getCategory, findUnit, convert, currencyUnits, FREE_CURRENCIES } = require('../src/units');
const { parseInput, formatNumber } = require('../src/format');

const conv = (categoryId, value, fromId, toId) => {
  const units = getCategory(categoryId).units;
  return convert(value, findUnit(units, fromId), findUnit(units, toId));
};
const close = (actual, expected, tolerance = 1e-9) =>
  assert.ok(Math.abs(actual - expected) <= tolerance * Math.max(1, Math.abs(expected)), `${actual} is not ${expected}`);

test('temperature', () => {
  close(conv('temperature', 100, 'C', 'F'), 212);
  close(conv('temperature', 32, 'F', 'C'), 0);
  close(conv('temperature', -40, 'C', 'F'), -40);
  close(conv('temperature', 0, 'K', 'C'), -273.15);
  close(conv('temperature', 98.6, 'F', 'C'), 37);
  close(conv('temperature', 0, 'C', 'K'), 273.15);
  close(conv('temperature', 451, 'F', 'K'), 505.927777777, 1e-8);
});

test('speed, including running pace', () => {
  close(conv('speed', 100, 'kmh', 'mph'), 62.13711922, 1e-8);
  close(conv('speed', 60, 'mph', 'kmh'), 96.56064);
  close(conv('speed', 10, 'ms', 'kmh'), 36);
  close(conv('speed', 1, 'kn', 'kmh'), 1.852);
  close(conv('speed', 5, 'minkm', 'kmh'), 12);
  close(conv('speed', 12, 'kmh', 'minkm'), 5);
  close(conv('speed', 5, 'minkm', 'minmi'), 8.04672);
  assert.ok(Number.isNaN(conv('speed', 0, 'minkm', 'kmh')), 'a pace of zero has no speed');
});

test('length', () => {
  close(conv('length', 1, 'in', 'cm'), 2.54);
  close(conv('length', 1, 'mi', 'km'), 1.609344);
  close(conv('length', 1, 'nmi', 'm'), 1852);
  close(conv('length', 6, 'ft', 'm'), 1.8288);
  close(conv('length', 1, 'mm', 'km'), 1e-6); // version 1 rounded this to 0
  close(conv('length', 100, 'yd', 'm'), 91.44);
});

test('weight, including kitchen cups', () => {
  close(conv('weight', 1, 'lb', 'kg'), 0.45359237);
  close(conv('weight', 1, 'kg', 'lb'), 2.2046226218, 1e-9);
  close(conv('weight', 16, 'oz', 'lb'), 1);
  close(conv('weight', 1, 'st', 'lb'), 14);
  close(conv('weight', 2, 'cup-us-sugar', 'g'), 400);
  close(conv('weight', 1, 'cup-us-flour', 'g'), 120);
  close(conv('weight', 1, 'ton', 'kg'), 1000);
});

test('volume', () => {
  close(conv('volume', 1, 'gal', 'l'), 3.785411784);
  close(conv('volume', 1, 'cup', 'ml'), 236.5882365);
  close(conv('volume', 2, 'pnt', 'cup'), 4);
  close(conv('volume', 3, 'tsp', 'tbsp'), 1);
  close(conv('volume', 1, 'pnt-uk', 'ml'), 568.26125);
  close(conv('volume', 1, 'm3', 'l'), 1000);
});

test('area', () => {
  close(conv('area', 1, 'ha', 'm2'), 10000);
  close(conv('area', 1, 'ac', 'm2'), 4046.8564224);
  close(conv('area', 1, 'mi2', 'ac'), 640);
  close(conv('area', 6, 'tatami', 'm2'), 9.72);
  close(conv('area', 1, 'tatami', 'ha'), 0.000162); // version 1 had this off by 25x
});

test('time, data, fuel, pressure, energy', () => {
  close(conv('time', 1, 'd', 'h'), 24);
  close(conv('time', 90, 'min', 'h'), 1.5);
  close(conv('data', 1, 'GB', 'MB'), 1000);
  close(conv('data', 1, 'GiB', 'MiB'), 1024);
  close(conv('data', 8, 'bit', 'B'), 1);
  close(conv('fuel', 30, 'mpg', 'l100'), 7.84048610, 1e-8);
  close(conv('fuel', 5, 'l100', 'kml'), 20);
  close(conv('fuel', 7.84048610, 'l100', 'mpg'), 30, 1e-8);
  close(conv('pressure', 1, 'bar', 'psi'), 14.503773773, 1e-9);
  close(conv('pressure', 1, 'atm', 'mmhg'), 760, 1e-6);
  close(conv('energy', 1, 'kcal', 'kj'), 4.184);
  close(conv('energy', 1, 'kwh', 'kj'), 3600);
});

test('every unit survives a round trip through every other unit', () => {
  for (const category of CATEGORIES) {
    for (const from of category.units) {
      for (const to of category.units) {
        const there = convert(7.25, from, to);
        const back = convert(there, to, from);
        close(back, 7.25, 1e-9);
      }
    }
  }
});

test('every category is usable without Pro and has sensible defaults', () => {
  for (const category of CATEGORIES) {
    if (category.dynamic) continue;
    const free = category.units.filter((u) => u.free);
    assert.ok(free.length >= 2, `${category.id} needs at least two free units`);
    for (const id of category.defaults) {
      const unit = findUnit(category.units, id);
      assert.ok(unit, `${category.id} default ${id} exists`);
      assert.ok(unit.free, `${category.id} default ${id} is free`);
    }
    const ids = category.units.map((u) => u.id);
    assert.equal(new Set(ids).size, ids.length, `${category.id} has duplicate unit ids`);
  }
});

test('currency units come from the rate table', () => {
  const units = currencyUnits({ USD: 1.25, JPY: 200, PLN: 4, BAD: 0 });
  const get = (id) => units.find((u) => u.id === id);
  close(convert(100, get('EUR'), get('USD')), 125);
  close(convert(125, get('USD'), get('EUR')), 100);
  close(convert(1, get('USD'), get('JPY')), 160);
  assert.equal(get('BAD'), undefined, 'a zero rate is dropped rather than dividing by zero');
  assert.equal(get('PLN').free, false);
  assert.deepEqual(units.slice(0, 3).map((u) => u.id), ['USD', 'EUR', 'JPY'], 'common currencies come first');
  assert.ok(FREE_CURRENCIES.includes('EUR'));
  assert.deepEqual(currencyUnits(null).map((u) => u.id), ['EUR'], 'with no rates there is still the euro');
});

test('parseInput reads both decimal styles', () => {
  assert.equal(parseInput('1.5'), 1.5);
  assert.equal(parseInput('1,5'), 1.5); // version 1 rejected this as "not a number"
  assert.equal(parseInput('1.234,56'), 1234.56);
  assert.equal(parseInput('1,234.56'), 1234.56);
  assert.equal(parseInput('1,234,567'), 1234567);
  assert.equal(parseInput("1'000"), 1000);
  assert.equal(parseInput('-40'), -40);
  assert.equal(parseInput('.5'), 0.5);
  assert.equal(parseInput('5.'), 5);
  assert.ok(Number.isNaN(parseInput('')));
  assert.ok(Number.isNaN(parseInput('-')));
  assert.ok(Number.isNaN(parseInput('abc')));
  assert.ok(Number.isNaN(parseInput('1.2.3,4,5x')));
});

test('formatNumber stays readable', () => {
  const en = { locale: 'en-US' };
  assert.equal(formatNumber(2.54, en), '2.54');
  assert.equal(formatNumber(1234.5, en), '1,234.5');
  assert.equal(formatNumber(0.000001, en), '0.000001');
  assert.equal(formatNumber(62.13711922373339, en), '62.13712');
  assert.equal(formatNumber(1 / 3, en), '0.3333333');
  assert.equal(formatNumber(0, en), '0');
  assert.equal(formatNumber(NaN, en), '—');
  assert.equal(formatNumber(1234.5, { locale: 'de-DE' }), '1.234,5');
  assert.equal(formatNumber(1234.5, { locale: 'en-US', money: true }), '1,234.50');
  assert.equal(formatNumber(0.00571, { locale: 'en-US', money: true }), '0.00571');
  assert.match(formatNumber(1.5e20, en), /10\^20/);
  assert.equal(formatNumber(-17.2222222, { locale: 'en-US', maxDecimals: 2 }), '-17.22');
  assert.equal(formatNumber(255.927777, { locale: 'en-US', maxDecimals: 2 }), '255.93');
  assert.equal(formatNumber(0.000123, { locale: 'en-US', maxDecimals: 2 }), '0.000123');
});
