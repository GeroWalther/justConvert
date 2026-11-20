import { useColorScheme } from 'react-native';

const dark = {
  dark: true,
  bg: '#0f172a',
  card: '#1e293b',
  raised: '#273449',
  border: '#334155',
  text: '#f8fafc',
  muted: '#94a3b8',
  faint: '#64748b',
  accent: '#2dd4bf',
  onAccent: '#042f2e',
  gold: '#fbbf24',
  danger: '#f87171',
};

const light = {
  dark: false,
  bg: '#f1f5f9',
  card: '#ffffff',
  raised: '#f1f5f9',
  border: '#e2e8f0',
  text: '#0f172a',
  muted: '#64748b',
  faint: '#94a3b8',
  accent: '#0d9488',
  onAccent: '#ffffff',
  gold: '#b45309',
  danger: '#dc2626',
};

export function useTheme() {
  return useColorScheme() === 'light' ? light : dark;
}
