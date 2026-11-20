import { useEffect, useMemo, useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useTheme } from '../theme';

export default function UnitPicker({ visible, title, units, selectedId, isAllowed, onSelect, onLocked, onClose }) {
  const t = useTheme();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (visible) setQuery('');
  }, [visible]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return units;
    return units.filter((u) => u.name.toLowerCase().includes(q) || u.symbol.toLowerCase().includes(q) || u.id.toLowerCase().includes(q));
  }, [units, query]);

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={[styles.sheet, { backgroundColor: t.bg }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: t.text }]}>{title}</Text>
          <Pressable onPress={onClose} hitSlop={12} accessibilityRole="button" accessibilityLabel="Close" style={[styles.close, { backgroundColor: t.card }]}>
            <MaterialCommunityIcons name="close" size={20} color={t.text} />
          </Pressable>
        </View>
        {units.length > 9 ? (
          <View style={[styles.search, { backgroundColor: t.card, borderColor: t.border }]}>
            <MaterialCommunityIcons name="magnify" size={20} color={t.muted} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search"
              placeholderTextColor={t.faint}
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="while-editing"
              style={[styles.searchInput, { color: t.text }]}
            />
          </View>
        ) : null}
        <FlatList
          data={filtered}
          keyExtractor={(u) => u.id}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<Text style={[styles.empty, { color: t.muted }]}>Nothing matches “{query}”.</Text>}
          renderItem={({ item }) => {
            const locked = !isAllowed(item);
            const selected = item.id === selectedId;
            return (
              <Pressable
                onPress={() => (locked ? onLocked(item) : onSelect(item))}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                accessibilityLabel={locked ? `${item.name}, part of Pro` : item.name}
                style={({ pressed }) => [styles.row, { backgroundColor: selected ? t.card : 'transparent', opacity: pressed ? 0.6 : 1 }]}>
                <View style={[styles.symbolBox, { backgroundColor: t.card, borderColor: selected ? t.accent : t.border }]}>
                  <Text style={[styles.symbol, { color: locked ? t.faint : t.text }]} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.5}>
                    {item.symbol}
                  </Text>
                </View>
                <Text style={[styles.name, { color: locked ? t.faint : t.text }]} numberOfLines={1}>
                  {item.name}
                </Text>
                {locked ? (
                  <View style={[styles.pro, { borderColor: t.gold }]}>
                    <MaterialCommunityIcons name="lock" size={11} color={t.gold} />
                    <Text style={[styles.proText, { color: t.gold }]}>PRO</Text>
                  </View>
                ) : selected ? (
                  <MaterialCommunityIcons name="check-circle" size={22} color={t.accent} />
                ) : null}
              </Pressable>
            );
          }}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  sheet: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 12 },
  title: { fontSize: 22, fontWeight: '800' },
  close: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  search: { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 16, marginBottom: 8, borderRadius: 14, borderWidth: 1, paddingHorizontal: 12 },
  searchInput: { flex: 1, fontSize: 16, paddingVertical: 11 },
  listContent: { paddingHorizontal: 10, paddingBottom: 40 },
  empty: { textAlign: 'center', marginTop: 40, fontSize: 15 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 10, paddingVertical: 9, borderRadius: 14 },
  symbolBox: { width: 76, height: 40, borderRadius: 11, borderWidth: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6 },
  symbol: { fontSize: 15, fontWeight: '800' },
  name: { flex: 1, fontSize: 16, fontWeight: '500' },
  pro: { flexDirection: 'row', alignItems: 'center', gap: 3, borderWidth: 1, borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3 },
  proText: { fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
});
