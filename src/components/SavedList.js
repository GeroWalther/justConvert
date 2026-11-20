import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useTheme } from '../theme';

// rows: [{ id, text, date }]
export default function SavedList({ rows, onUse, onRemove, onClear }) {
  const t = useTheme();
  if (!rows.length) return null;
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: t.muted }]}>Saved</Text>
        <Pressable onPress={onClear} hitSlop={10} accessibilityRole="button" accessibilityLabel="Clear all saved conversions">
          <Text style={[styles.clear, { color: t.danger }]}>Clear all</Text>
        </Pressable>
      </View>
      <View style={[styles.list, { backgroundColor: t.card, borderColor: t.border }]}>
        {rows.map((row, i) => (
          <View key={row.id} style={[styles.row, i > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: t.border }]}>
            <Pressable style={({ pressed }) => [styles.body, pressed && { opacity: 0.6 }]} onPress={() => onUse(row.id)} accessibilityRole="button" accessibilityLabel={`${row.text}. Tap to use again.`}>
              <Text style={[styles.text, { color: t.text }]} numberOfLines={2}>
                {row.text}
              </Text>
              <Text style={[styles.date, { color: t.faint }]}>{row.date}</Text>
            </Pressable>
            <Pressable onPress={() => onRemove(row.id)} hitSlop={10} accessibilityRole="button" accessibilityLabel="Remove" style={({ pressed }) => [styles.remove, pressed && { opacity: 0.5 }]}>
              <MaterialCommunityIcons name="close" size={18} color={t.faint} />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 22, marginHorizontal: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, marginHorizontal: 6 },
  title: { fontSize: 12, fontWeight: '700', letterSpacing: 0.8, textTransform: 'uppercase' },
  clear: { fontSize: 13, fontWeight: '600' },
  list: { borderRadius: 18, borderWidth: 1, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center' },
  body: { flex: 1, paddingLeft: 16, paddingVertical: 12 },
  text: { fontSize: 15, fontWeight: '600' },
  date: { fontSize: 11, marginTop: 3 },
  remove: { paddingHorizontal: 14, paddingVertical: 14 },
});
