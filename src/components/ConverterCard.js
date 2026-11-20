import { InputAccessoryView, Keyboard, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useTheme } from '../theme';

const ACCESSORY_ID = 'jc-done';

function UnitButton({ unit, onPress, label }) {
  const t = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${label} unit: ${unit ? unit.name : 'choose'}`}
      style={({ pressed }) => [styles.unit, { backgroundColor: t.raised, borderColor: t.border, opacity: pressed ? 0.8 : 1 }]}>
      <View style={styles.unitText}>
        <Text style={[styles.unitSymbol, { color: t.text }]} numberOfLines={1}>
          {unit ? unit.symbol : '—'}
        </Text>
        <Text style={[styles.unitName, { color: t.muted }]} numberOfLines={1}>
          {unit ? unit.name : 'Choose'}
        </Text>
      </View>
      <MaterialCommunityIcons name="chevron-down" size={20} color={t.muted} />
    </Pressable>
  );
}

export default function ConverterCard({
  input,
  onChangeInput,
  signed,
  onToggleSign,
  fromUnit,
  toUnit,
  resultText,
  hint,
  note,
  noteIsWarning,
  canAct,
  saved,
  onPickFrom,
  onPickTo,
  onSwap,
  onCopy,
  onSave,
}) {
  const t = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border }]}>
      <View style={styles.row}>
        <View style={styles.valueCol}>
          <Text style={[styles.caption, { color: t.muted }]}>From</Text>
          <View style={styles.inputRow}>
            <TextInput
              value={input}
              onChangeText={onChangeInput}
              keyboardType="decimal-pad"
              inputAccessoryViewID={Platform.OS === 'ios' ? ACCESSORY_ID : undefined}
              placeholder="0"
              placeholderTextColor={t.faint}
              selectionColor={t.accent}
              maxLength={18}
              selectTextOnFocus
              accessibilityLabel="Amount to convert"
              style={[styles.input, { color: t.text }]}
            />
            {signed ? (
              <Pressable
                onPress={onToggleSign}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel="Switch between plus and minus"
                style={({ pressed }) => [styles.sign, { backgroundColor: t.raised, borderColor: t.border, opacity: pressed ? 0.7 : 1 }]}>
                <MaterialCommunityIcons name="plus-minus-variant" size={20} color={t.text} />
              </Pressable>
            ) : null}
          </View>
        </View>
        <UnitButton unit={fromUnit} onPress={onPickFrom} label="From" />
      </View>

      <View style={styles.divider}>
        <View style={[styles.line, { backgroundColor: t.border }]} />
        <Pressable
          onPress={onSwap}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="Swap units"
          style={({ pressed }) => [styles.swap, { backgroundColor: t.accent, transform: [{ scale: pressed ? 0.92 : 1 }] }]}>
          <MaterialCommunityIcons name="swap-vertical" size={24} color={t.onAccent} />
        </Pressable>
        <View style={[styles.line, { backgroundColor: t.border }]} />
      </View>

      <View style={styles.row}>
        <Pressable style={styles.valueCol} onPress={canAct ? onCopy : undefined} accessibilityRole="button" accessibilityLabel={`Result ${resultText}. Tap to copy.`}>
          <Text style={[styles.caption, { color: t.muted }]}>To</Text>
          <Text style={[styles.result, { color: canAct ? t.accent : t.faint }]} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.45}>
            {resultText}
          </Text>
        </Pressable>
        <UnitButton unit={toUnit} onPress={onPickTo} label="To" />
      </View>

      <View style={[styles.footer, { borderTopColor: t.border }]}>
        <View style={styles.footerText}>
          {hint ? (
            <Text style={[styles.hint, { color: t.muted }]} numberOfLines={1}>
              {hint}
            </Text>
          ) : null}
          {note ? (
            <Text style={[styles.note, { color: noteIsWarning ? t.gold : t.faint }]} numberOfLines={2}>
              {note}
            </Text>
          ) : null}
        </View>
        <Pressable
          onPress={onCopy}
          disabled={!canAct}
          hitSlop={6}
          accessibilityRole="button"
          accessibilityLabel="Copy result"
          style={({ pressed }) => [styles.action, { backgroundColor: t.raised, borderColor: t.border, opacity: !canAct ? 0.4 : pressed ? 0.7 : 1 }]}>
          <MaterialCommunityIcons name="content-copy" size={18} color={t.text} />
        </Pressable>
        <Pressable
          onPress={onSave}
          disabled={!canAct}
          hitSlop={6}
          accessibilityRole="button"
          accessibilityLabel={saved ? 'Saved' : 'Save this conversion'}
          style={({ pressed }) => [styles.action, { backgroundColor: t.raised, borderColor: t.border, opacity: !canAct ? 0.4 : pressed ? 0.7 : 1 }]}>
          <MaterialCommunityIcons name={saved ? 'bookmark' : 'bookmark-outline'} size={19} color={saved ? t.accent : t.text} />
        </Pressable>
      </View>

      {Platform.OS === 'ios' ? (
        <InputAccessoryView nativeID={ACCESSORY_ID}>
          <View style={[styles.accessory, { backgroundColor: t.card, borderTopColor: t.border }]}>
            <Pressable onPress={Keyboard.dismiss} hitSlop={10} accessibilityRole="button" accessibilityLabel="Done">
              <Text style={[styles.done, { color: t.accent }]}>Done</Text>
            </Pressable>
          </View>
        </InputAccessoryView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginHorizontal: 16, borderRadius: 22, borderWidth: 1, paddingHorizontal: 16, paddingTop: 14 },
  row: { flexDirection: 'row', alignItems: 'flex-end', gap: 12 },
  valueCol: { flex: 1, minWidth: 0 },
  caption: { fontSize: 12, fontWeight: '700', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 2 },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  input: { flex: 1, fontSize: 36, fontWeight: '700', paddingVertical: 4, minHeight: 52 },
  sign: { width: 38, height: 38, borderRadius: 19, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  result: { fontSize: 36, fontWeight: '700', paddingVertical: 4, minHeight: 52 },
  unit: { flexDirection: 'row', alignItems: 'center', gap: 4, borderWidth: 1, borderRadius: 14, paddingLeft: 12, paddingRight: 8, paddingVertical: 8, width: 132, marginBottom: 6 },
  unitText: { flex: 1, minWidth: 0 },
  unitSymbol: { fontSize: 18, fontWeight: '800' },
  unitName: { fontSize: 11, marginTop: 1 },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 8 },
  line: { flex: 1, height: StyleSheet.hairlineWidth },
  swap: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  footer: { flexDirection: 'row', alignItems: 'center', gap: 8, borderTopWidth: StyleSheet.hairlineWidth, marginTop: 10, paddingVertical: 10, minHeight: 56 },
  footerText: { flex: 1, minWidth: 0 },
  hint: { fontSize: 13, fontWeight: '600' },
  note: { fontSize: 11, marginTop: 2 },
  action: { width: 38, height: 38, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  accessory: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 18, paddingVertical: 10, borderTopWidth: StyleSheet.hairlineWidth },
  done: { fontSize: 17, fontWeight: '700' },
});
