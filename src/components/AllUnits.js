import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useTheme } from '../theme';

// The amount converted into every unit of the category at once.
// rows: [{ unit, text, locked, selected }]
export default function AllUnits({ title, rows, onSelect, onLocked }) {
  const t = useTheme();
  if (!rows.length) return null;
  return (
    <View style={styles.section}>
      <Text style={[styles.title, { color: t.muted }]}>{title}</Text>
      <View style={[styles.list, { backgroundColor: t.card, borderColor: t.border }]}>
        {rows.map((row, i) => (
          <Pressable
            key={row.unit.id}
            onPress={() => (row.locked ? onLocked(row.unit) : onSelect(row.unit))}
            accessibilityRole="button"
            accessibilityLabel={row.locked ? `${row.unit.name}, part of Pro` : `${row.text} ${row.unit.name}`}
            style={({ pressed }) => [
              styles.row,
              i > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: t.border },
              row.selected && { backgroundColor: t.raised },
              pressed && { opacity: 0.7 },
            ]}>
            <View style={styles.names}>
              <Text style={[styles.name, { color: row.locked ? t.faint : t.text }]} numberOfLines={1}>
                {row.unit.name}
              </Text>
            </View>
            {row.locked ? (
              <View style={[styles.pro, { borderColor: t.gold }]}>
                <MaterialCommunityIcons name="lock" size={11} color={t.gold} />
                <Text style={[styles.proText, { color: t.gold }]}>PRO</Text>
              </View>
            ) : (
              <Text style={[styles.value, { color: row.selected ? t.accent : t.text }]} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.6}>
                {row.text}
                <Text style={[styles.symbol, { color: t.muted }]}> {row.unit.symbol}</Text>
              </Text>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 22, marginHorizontal: 16 },
  title: { fontSize: 12, fontWeight: '700', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8, marginLeft: 6 },
  list: { borderRadius: 18, borderWidth: 1, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingHorizontal: 16, paddingVertical: 13 },
  names: { flexShrink: 1, minWidth: 90 },
  name: { fontSize: 15, fontWeight: '500' },
  value: { flex: 1, textAlign: 'right', fontSize: 16, fontWeight: '700' },
  symbol: { fontSize: 13, fontWeight: '500' },
  pro: { flexDirection: 'row', alignItems: 'center', gap: 3, borderWidth: 1, borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3 },
  proText: { fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
});
