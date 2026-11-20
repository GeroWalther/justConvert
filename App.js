import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Animated, Keyboard, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as Clipboard from 'expo-clipboard';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import AllUnits from './src/components/AllUnits';
import CategoryBar from './src/components/CategoryBar';
import ConverterCard from './src/components/ConverterCard';
import Header from './src/components/Header';
import Paywall from './src/components/Paywall';
import SavedList from './src/components/SavedList';
import UnitPicker from './src/components/UnitPicker';
import { formatNumber, parseInput } from './src/format';
import { success, tick } from './src/haptics';
import { ProProvider, usePro } from './src/pro';
import { useRates } from './src/rates';
import { loadJSON, saveJSON } from './src/storage';
import { useTheme } from './src/theme';
import { CATEGORIES, convert, currencyUnits, findUnit, getCategory } from './src/units';

const STATE_KEY = 'jc.state.v2';
const MAX_SAVED = 100;

const TEMPERATURE_FORMULAS = {
  'C>F': '°F = °C × 9/5 + 32',
  'F>C': '°C = (°F − 32) × 5/9',
  'C>K': 'K = °C + 273.15',
  'K>C': '°C = K − 273.15',
  'F>K': 'K = (°F − 32) × 5/9 + 273.15',
  'K>F': '°F = (K − 273.15) × 9/5 + 32',
};

const STATIC_UNIT_COUNT = CATEGORIES.reduce((n, c) => n + c.units.length, 0);

function formatDate(value) {
  try {
    return new Date(value).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  } catch (e) {
    return '';
  }
}

function Main() {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const { isPro } = usePro();
  const [fontReady] = useFonts({ Monoton: require('./assets/fonts/Monoton-Regular.ttf') });
  const { rates, date: ratesDate, status: ratesStatus, refresh: refreshRates } = useRates();

  const [categoryId, setCategoryId] = useState('currency');
  const [perCategory, setPerCategory] = useState({});
  const [restored, setRestored] = useState(false);
  const [saved, setSaved] = useState([]);
  const [picker, setPicker] = useState(null); // 'from' | 'to' | null
  const [paywall, setPaywall] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [toast, setToast] = useState('');
  const toastOpacity = useRef(new Animated.Value(0)).current;
  const toastTimer = useRef(null);

  // Pick up where the user left off.
  useEffect(() => {
    loadJSON(STATE_KEY, null).then((state) => {
      if (state && typeof state === 'object') {
        if (CATEGORIES.some((c) => c.id === state.categoryId)) setCategoryId(state.categoryId);
        if (state.perCategory && typeof state.perCategory === 'object') setPerCategory(state.perCategory);
      }
      setRestored(true);
    });
  }, []);

  useEffect(() => {
    if (!restored) return undefined;
    const handle = setTimeout(() => saveJSON(STATE_KEY, { categoryId, perCategory }), 400);
    return () => clearTimeout(handle);
  }, [categoryId, perCategory, restored]);

  const category = getCategory(categoryId);
  const units = useMemo(() => (category.dynamic ? currencyUnits(rates) : category.units), [category, rates]);
  const isAllowed = useCallback((unit) => isPro || !!unit.free, [isPro]);
  const waitingForRates = category.dynamic && !rates;

  // Resolve the selected units, falling back to defaults when something saved is
  // no longer available (a currency that left the feed, or a unit that needs Pro).
  const current = perCategory[categoryId] || {};
  const resolve = (id, fallbackId, avoidId) => {
    let unit = findUnit(units, id);
    if (!unit || !isAllowed(unit) || unit.id === avoidId) unit = findUnit(units, fallbackId);
    if (!unit || !isAllowed(unit) || unit.id === avoidId) unit = units.find((u) => isAllowed(u) && u.id !== avoidId) || units[0] || null;
    return unit;
  };
  const fromUnit = resolve(current.from, category.defaults[0]);
  const toUnit = resolve(current.to, category.defaults[1], fromUnit ? fromUnit.id : undefined);
  const input = typeof current.input === 'string' ? current.input : '1';

  const value = parseInput(input);
  const result = convert(value, fromUnit, toUnit);
  const money = category.id === 'currency';
  const format = useCallback((n) => formatNumber(n, { money, maxDecimals: category.maxDecimals }), [money, category.maxDecimals]);
  const canAct = Number.isFinite(result) && !waitingForRates;
  const resultText = waitingForRates ? (ratesStatus === 'loading' ? '…' : '—') : format(result);

  const update = useCallback(
    (patch) => {
      setPerCategory((prev) => ({
        ...prev,
        [categoryId]: { from: fromUnit ? fromUnit.id : undefined, to: toUnit ? toUnit.id : undefined, input, ...patch },
      }));
    },
    [categoryId, fromUnit, toUnit, input]
  );

  // Saved conversions live under the same storage keys version 1 used for its history.
  const categoryRef = useRef(categoryId);
  useEffect(() => {
    categoryRef.current = categoryId;
    setSaved([]);
    loadJSON(category.storageKey, null).then((stored) => {
      if (categoryRef.current !== categoryId) return;
      const items = stored && Array.isArray(stored.items) ? stored.items : [];
      setSaved(items.filter((it) => it && typeof it.converted === 'number' && Number.isFinite(it.converted) && it.fromVal && it.toVal));
    });
  }, [categoryId, category.storageKey]);

  const writeSaved = useCallback(
    (items) => {
      setSaved(items);
      saveJSON(category.storageKey, { items });
    },
    [category.storageKey]
  );

  const savedMatch = saved.find((it) => fromUnit && toUnit && it.fromVal === fromUnit.id && it.toVal === toUnit.id && parseInput(it.input) === value);

  function showToast(message) {
    setToast(message);
    clearTimeout(toastTimer.current);
    Animated.timing(toastOpacity, { toValue: 1, duration: 140, useNativeDriver: true }).start();
    toastTimer.current = setTimeout(() => {
      Animated.timing(toastOpacity, { toValue: 0, duration: 260, useNativeDriver: true }).start();
    }, 1500);
  }
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  function selectCategory(id) {
    if (id === categoryId) return;
    Keyboard.dismiss();
    tick();
    setCategoryId(id);
  }

  function swap() {
    if (!fromUnit || !toUnit) return;
    tick();
    update({ from: toUnit.id, to: fromUnit.id });
  }

  function toggleSign() {
    tick();
    update({ input: input.trim().startsWith('-') ? input.trim().slice(1) : `-${input.trim()}` });
  }

  function pickUnit(unit) {
    const side = picker;
    setPicker(null);
    if (!side || !fromUnit || !toUnit) return;
    tick();
    const other = side === 'from' ? toUnit : fromUnit;
    if (unit.id === other.id) update({ from: toUnit.id, to: fromUnit.id }); // choosing the other side's unit swaps them
    else update({ [side]: unit.id });
  }

  function openPaywall() {
    // iOS cannot present a second sheet while the first is still closing.
    const wasPicking = picker !== null;
    setPicker(null);
    Keyboard.dismiss();
    setTimeout(() => setPaywall(true), wasPicking ? 450 : 0);
  }

  async function copyResult() {
    if (!canAct || !toUnit) return;
    await Clipboard.setStringAsync(resultText);
    success();
    showToast(`Copied ${resultText} ${toUnit.symbol}`);
  }

  function toggleSaved() {
    if (!canAct || !fromUnit || !toUnit) return;
    if (savedMatch) {
      writeSaved(saved.filter((it) => it.id !== savedMatch.id));
      tick();
      return;
    }
    const item = { input: input.trim(), fromVal: fromUnit.id, toVal: toUnit.id, converted: result, id: Date.now() };
    writeSaved([...saved, item].slice(-MAX_SAVED));
    success();
    showToast('Saved');
  }

  function applySaved(id) {
    const item = saved.find((it) => it.id === id);
    if (!item) return;
    tick();
    update({ from: item.fromVal, to: item.toVal, input: String(item.input) });
  }

  function clearSaved() {
    Alert.alert('Clear saved conversions?', `This removes everything saved under ${category.name}.`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear all', style: 'destructive', onPress: () => writeSaved([]) },
    ]);
  }

  async function pullToRefresh() {
    setRefreshing(true);
    await refreshRates(true);
    setRefreshing(false);
  }

  // The small lines under the result.
  let hint = '';
  if (fromUnit && toUnit && !waitingForRates) {
    if (category.id === 'temperature') hint = TEMPERATURE_FORMULAS[`${fromUnit.id}>${toUnit.id}`] || '';
    else if (!fromUnit.toBase && !toUnit.toBase) hint = `1 ${fromUnit.symbol} = ${formatNumber(convert(1, fromUnit, toUnit), { sig: 6 })} ${toUnit.symbol}`;
  }
  let note = '';
  let noteIsWarning = false;
  if (money) {
    if (ratesStatus === 'unavailable') {
      note = 'Exchange rates could not be loaded. Check your connection and pull down to try again.';
      noteIsWarning = true;
    } else if (ratesStatus === 'loading') {
      note = 'Loading exchange rates…';
    } else if (ratesStatus === 'cached') {
      note = `Offline. Using rates from ${formatDate(ratesDate)}.`;
      noteIsWarning = true;
    } else if (ratesDate) {
      note = `European Central Bank rates · ${formatDate(ratesDate)}`;
    }
  } else if (fromUnit && toUnit && (fromUnit.id.startsWith('cup-us') || toUnit.id.startsWith('cup-us'))) {
    note = 'Cup weights are typical values and vary with how the cup is filled.';
  } else if (input.trim() !== '' && !Number.isFinite(value)) {
    note = 'That is not a number.';
    noteIsWarning = true;
  } else if (Number.isFinite(value) && !Number.isFinite(result)) {
    note = 'This value cannot be converted.';
    noteIsWarning = true;
  }

  const rows = useMemo(() => {
    if (!fromUnit || waitingForRates) return [];
    return units
      .filter((u) => u.id !== fromUnit.id)
      .map((unit) => ({
        unit,
        locked: !isAllowed(unit),
        selected: !!toUnit && unit.id === toUnit.id,
        text: format(convert(value, fromUnit, unit)),
      }));
  }, [units, fromUnit, toUnit, value, isAllowed, format, waitingForRates]);

  const savedRows = useMemo(() => {
    const label = (id) => {
      const unit = findUnit(units, id);
      return unit ? unit.symbol : id;
    };
    return [...saved].reverse().map((it) => ({
      id: it.id,
      text: `${format(parseInput(it.input))} ${label(it.fromVal)} = ${format(it.converted)} ${label(it.toVal)}`,
      date: formatDate(it.id),
    }));
  }, [saved, units, format]);

  const others = money ? 'other currencies' : 'other units';
  const amountLabel = Number.isFinite(value) && fromUnit ? `${format(value)} ${fromUnit.symbol} in ${others}` : others;
  const currencyCount = rates ? Object.keys(rates).length + 1 : 0;

  return (
    <View style={[styles.screen, { backgroundColor: t.bg, paddingTop: insets.top }]}>
      <StatusBar style={t.dark ? 'light' : 'dark'} />
      <View style={styles.column}>
        <Header isPro={isPro} fontReady={fontReady} onUpgrade={openPaywall} />
        <CategoryBar categories={CATEGORIES} selectedId={categoryId} onSelect={selectCategory} />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          automaticallyAdjustKeyboardInsets
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
          refreshControl={money ? <RefreshControl refreshing={refreshing} onRefresh={pullToRefresh} tintColor={t.muted} /> : undefined}>
          <ConverterCard
            input={input}
            onChangeInput={(text) => update({ input: text })}
            signed={!!category.signed}
            onToggleSign={toggleSign}
            fromUnit={fromUnit}
            toUnit={toUnit}
            resultText={resultText}
            hint={hint}
            note={note}
            noteIsWarning={noteIsWarning}
            canAct={canAct}
            saved={!!savedMatch}
            onPickFrom={() => setPicker('from')}
            onPickTo={() => setPicker('to')}
            onSwap={swap}
            onCopy={copyResult}
            onSave={toggleSaved}
          />
          <AllUnits title={amountLabel} rows={rows} onSelect={(unit) => { tick(); update({ to: unit.id }); }} onLocked={openPaywall} />
          <SavedList rows={savedRows} onUse={applySaved} onRemove={(id) => writeSaved(saved.filter((it) => it.id !== id))} onClear={clearSaved} />
        </ScrollView>
      </View>

      <Animated.View pointerEvents="none" style={[styles.toast, { bottom: insets.bottom + 24, opacity: toastOpacity, backgroundColor: t.text }]}>
        <Text style={[styles.toastText, { color: t.bg }]} numberOfLines={1}>
          {toast}
        </Text>
      </Animated.View>

      <UnitPicker
        visible={picker !== null}
        title={picker === 'from' ? `Convert from` : `Convert to`}
        units={units}
        selectedId={picker === 'from' ? (fromUnit ? fromUnit.id : null) : toUnit ? toUnit.id : null}
        isAllowed={isAllowed}
        onSelect={pickUnit}
        onLocked={openPaywall}
        onClose={() => setPicker(null)}
      />
      <Paywall
        visible={paywall}
        onClose={() => setPaywall(false)}
        unitCount={STATIC_UNIT_COUNT}
        currencyCount={currencyCount}
        categoryCount={CATEGORIES.length}
      />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ProProvider>
        <Main />
      </ProProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  column: { flex: 1, width: '100%', maxWidth: 720, alignSelf: 'center' },
  toast: { position: 'absolute', alignSelf: 'center', borderRadius: 999, paddingHorizontal: 18, paddingVertical: 10, maxWidth: '86%' },
  toastText: { fontSize: 14, fontWeight: '700' },
});
