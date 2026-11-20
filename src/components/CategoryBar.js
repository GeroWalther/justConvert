import { useEffect, useRef } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useTheme } from '../theme';

const CHIP_WIDTH_GUESS = 118;

export default function CategoryBar({ categories, selectedId, onSelect }) {
  const t = useTheme();
  const scroller = useRef(null);
  const offsets = useRef({});

  // Keep the selected chip in view, including on launch when a later category is restored.
  useEffect(() => {
    const index = categories.findIndex((c) => c.id === selectedId);
    const x = offsets.current[selectedId] != null ? offsets.current[selectedId] : index * CHIP_WIDTH_GUESS;
    scroller.current && scroller.current.scrollTo({ x: Math.max(0, x - 60), animated: true });
  }, [selectedId, categories]);

  return (
    <ScrollView
      ref={scroller}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.content}
      style={styles.bar}>
      {categories.map((c) => {
        const active = c.id === selectedId;
        return (
          <Pressable
            key={c.id}
            onPress={() => onSelect(c.id)}
            onLayout={(e) => {
              offsets.current[c.id] = e.nativeEvent.layout.x;
            }}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={c.name}
            style={({ pressed }) => [
              styles.chip,
              { backgroundColor: active ? t.accent : t.card, borderColor: active ? t.accent : t.border, opacity: pressed ? 0.8 : 1 },
            ]}>
            <MaterialCommunityIcons name={c.icon} size={18} color={active ? t.onAccent : t.muted} />
            <Text style={[styles.label, { color: active ? t.onAccent : t.text }]}>{c.name}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bar: { flexGrow: 0, flexShrink: 0 },
  content: { paddingHorizontal: 16, gap: 8, paddingBottom: 14, alignItems: 'center' },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 9 },
  label: { fontSize: 15, fontWeight: '600' },
});
