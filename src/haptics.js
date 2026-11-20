import * as Haptics from 'expo-haptics';

export function tick() {
  Haptics.selectionAsync().catch(() => {});
}

export function success() {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
}
