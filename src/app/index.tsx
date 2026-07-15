import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Templates() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quote Templates</Text>
      <Text style={styles.subtitle}>Start a new quote from here.</Text>

      <Pressable
        style={styles.primaryButton}
        onPress={() => router.push("/new-quote")}
      >
        <Text style={styles.primaryButtonText}>Start a New Quote</Text>
      </Pressable>

      <Pressable
        style={styles.secondaryButton}
        onPress={() => router.push("/templates")}
      >
        <Text style={styles.secondaryButtonText}>Templates</Text>
      </Pressable>

      <Pressable
        style={styles.settingsLink}
        onPress={() => router.push("/settings")}
      >
        <Text style={styles.settingsText}>Open Settings</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 8,
  },
  primaryButton: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
  settingsLink: {
    marginTop: 8,
    alignItems: "center",
  },
  settingsText: {
    color: "#007AFF",
    fontWeight: "600",
  },
});
