import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const quoteOptions = [
  {
    id: "custom",
    title: "Custom Quote",
    description: "Start from scratch with a custom quote.",
    route: "/quote",
  },
  {
    id: "standard",
    title: "Standard Quote",
    description: "Start a quote with a standard template.",
    route: "/quote",
  },
];

export default function NewQuoteScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Start a New Quote</Text>
      <Text style={styles.subtitle}>Choose a quote type.</Text>

      {quoteOptions.map((option) => (
        <Pressable
          key={option.id}
          style={styles.card}
          onPress={() => router.push(option.route as never)}
        >
          <Text style={styles.cardTitle}>{option.title}</Text>
          <Text style={styles.cardDescription}>{option.description}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    gap: 12,
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
