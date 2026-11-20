import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useTheme } from '../theme';

export default function Header({ isPro, fontReady, onUpgrade }) {
  const t = useTheme();
  return (
    <View style={styles.row}>
      <Text style={[styles.logo, { color: t.text }, fontReady && styles.logoFont]} accessibilityRole="header">
        justConvert
      </Text>
      {isPro ? (
        <View style={[styles.badge, { borderColor: t.gold }]}>
          <MaterialCommunityIcons name="crown" size={14} color={t.gold} />
          <Text style={[styles.badgeText, { color: t.gold }]}>PRO</Text>
        </View>
      ) : (
        <Pressable
          onPress={onUpgrade}
          accessibilityRole="button"
          accessibilityLabel="Upgrade to Pro"
          hitSlop={8}
          style={({ pressed }) => [styles.upgrade, { backgroundColor: t.accent, opacity: pressed ? 0.8 : 1 }]}>
          <MaterialCommunityIcons name="crown" size={15} color={t.onAccent} />
          <Text style={[styles.upgradeText, { color: t.onAccent }]}>Go Pro</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 8, paddingBottom: 12 },
  logo: { fontSize: 26, fontWeight: '800', letterSpacing: 0.5 },
  logoFont: { fontFamily: 'Monoton', fontWeight: '400', fontSize: 28, letterSpacing: 0 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 4, borderWidth: 1, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  badgeText: { fontSize: 12, fontWeight: '800', letterSpacing: 1 },
  upgrade: { flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: 999, paddingHorizontal: 13, paddingVertical: 7 },
  upgradeText: { fontSize: 14, fontWeight: '700' },
});
