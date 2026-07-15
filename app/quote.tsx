import React, { useEffect, useState } from "react";
import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { loadSettings } from "../services/settingsStorage";

export default function Quote() {
  const [materialsCost, setMaterialsCost] = useState("");
  const [estimatedHours, setEstimatedHours] = useState("");
  const [hourlyRate, setHourlyRate] = useState(0);
  const [materialsMarkup, setMaterialsMarkup] = useState(0);
  const [quote, setQuote] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initialize() {
      const settings = await loadSettings();
      setHourlyRate(Number(settings.hourlyRate) || 0);
      setMaterialsMarkup(Number(settings.materialsMarkup) || 0);
    }

    initialize();
  }, []);

  async function handleCalculate() {
    Keyboard.dismiss();

    const materials = Number(materialsCost);
    const hours = Number(estimatedHours);

    if (Number.isNaN(materials) || Number.isNaN(hours)) {
      setError("Please enter valid numbers for both fields.");
      setQuote(null);
      return;
    }

    if (hours < 0) {
      setError("Estimated hours cannot be negative.");
      setQuote(null);
      return;
    }

    const settings = await loadSettings();
    const currentHourlyRate = Number(settings.hourlyRate) || 0;
    const currentMaterialsMarkup = Number(settings.materialsMarkup) || 0;

    setHourlyRate(currentHourlyRate);
    setMaterialsMarkup(currentMaterialsMarkup);
    setError(null);

    const laborCost = hours * currentHourlyRate;
    const materialsWithMarkup = materials * (1 + currentMaterialsMarkup / 100);
    const jobPrice = laborCost + materialsWithMarkup;

    setQuote(jobPrice);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quote Calculator</Text>

      <Text style={styles.label}>Materials Cost</Text>
      <TextInput
        value={materialsCost}
        onChangeText={setMaterialsCost}
        keyboardType="decimal-pad"
        placeholder="0.00"
        style={styles.input}
      />

      <Text style={styles.label}>Estimated Hours</Text>
      <TextInput
        value={estimatedHours}
        onChangeText={setEstimatedHours}
        keyboardType="decimal-pad"
        placeholder="0"
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={handleCalculate}>
        <Text style={styles.buttonText}>Calculate Quote</Text>
      </Pressable>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {quote !== null && (
        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>Estimated Quote</Text>
          <Text style={styles.resultValue}>${quote.toFixed(2)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  resultBox: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f2f2f2",
  },
  resultLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 24,
    fontWeight: "700",
  },
  error: {
    color: "#b00020",
    marginTop: 4,
  },
});
