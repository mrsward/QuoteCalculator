export interface UserSettings {
  hourlyRate: number;
  materialsMarkup: number;
}

export const DEFAULT_SETTINGS: UserSettings = {
  hourlyRate: 0,
  materialsMarkup: 0,
};
