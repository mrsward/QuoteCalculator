import AsyncStorage from "@react-native-async-storage/async-storage";
import { DEFAULT_SETTINGS, UserSettings } from "../types/settings";

const SETTINGS_KEY = "settings";

export async function loadSettings(): Promise<UserSettings> {
  const stored = await AsyncStorage.getItem(SETTINGS_KEY);

  if (!stored) {
    return DEFAULT_SETTINGS;
  }

  try {
    const parsed = JSON.parse(stored) as Partial<UserSettings> & { profitMargin?: number };
    const hourlyRate = Number(parsed.hourlyRate ?? DEFAULT_SETTINGS.hourlyRate);
    const materialsMarkup = Number(
      parsed.materialsMarkup ?? parsed.profitMargin ?? DEFAULT_SETTINGS.materialsMarkup,
    );

    return {
      hourlyRate: Number.isFinite(hourlyRate) ? hourlyRate : DEFAULT_SETTINGS.hourlyRate,
      materialsMarkup: Number.isFinite(materialsMarkup)
        ? materialsMarkup
        : DEFAULT_SETTINGS.materialsMarkup,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(settings: UserSettings): Promise<void> {
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
