import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const templates = [
  {
    id: "deck",
    title: "Deck",
    description: "Quote template for deck projects.",
    route: "/quote",
  },
  {
    id: "custom",
    title: "Custom Template",
    description: "Start with a blank custom quote.",
    route: "/quote",
  },
];

export default function TemplatesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quote Templates</Text>
      <Text style={styles.subtitle}>Choose a template to get started.</Text>

      {templates.map((template) => (
        <Pressable
          key={template.id}
          style={styles.card}
          onPress={() => router.push(template.route as never)}
        >
          <Text style={styles.cardTitle}>{template.title}</Text>
          <Text style={styles.cardDescription}>{template.description}</Text>
        </Pressable>
      ))}
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
    textAlign: "center",
    marginTop: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 8,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#fff",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  cardDescription: {
    color: "#666",
  },
});
