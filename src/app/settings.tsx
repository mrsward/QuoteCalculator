import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { loadSettings, saveSettings } from "../services/settingsStorage";

export default function SettingsScreen() {
  const [hourlyRate, setHourlyRate] = useState("");
  const [materialsMarkup, setMaterialsMarkup] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    async function initialize() {
      const settings = await loadSettings();

      setHourlyRate(String(settings.hourlyRate ?? 0));
      setMaterialsMarkup(String(settings.materialsMarkup ?? 0));
      setHasLoaded(true);
    }

    initialize();
  }, []);

  useEffect(() => {
    if (!hasLoaded) {
      return;
    }

    const rate = Number(hourlyRate);
    const markup = Number(materialsMarkup);

    if (hourlyRate.trim() === "" || materialsMarkup.trim() === "") {
      return;
    }

    if (Number.isNaN(rate) || Number.isNaN(markup)) {
      setError("Values must be numbers");
      return;
    }

    if (rate < 0) {
      setError("Hourly rate cannot be negative");
      return;
    }

    if (markup < 0) {
      setError("Materials markup cannot be negative");
      return;
    }

    setError(null);
    void saveSettings({
      hourlyRate: rate,
      materialsMarkup: markup,
    });
  }, [hasLoaded, hourlyRate, materialsMarkup]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pricing Settings</Text>

      <Text>Hourly Rate</Text>

      <TextInput
        value={hourlyRate}
        onChangeText={setHourlyRate}
        keyboardType="decimal-pad"
        placeholder="75.00"
        style={styles.input}
      />

      <Text>Materials Markup (%)</Text>

      <TextInput
        value={materialsMarkup}
        onChangeText={setMaterialsMarkup}
        keyboardType="decimal-pad"
        placeholder="25"
        style={styles.input}
      />

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  heading: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 24,
  },

  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginVertical: 12,
  },

  error: {
    marginTop: 10,
  },
});
