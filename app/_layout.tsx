import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Templates" }} />

      <Stack.Screen name="new-quote" options={{ title: "New Quote" }} />

      <Stack.Screen name="templates" options={{ title: "Templates" }} />

      <Stack.Screen name="settings" options={{ title: "Settings" }} />

      <Stack.Screen name="quote" options={{ title: "Quote Calculator" }} />
    </Stack>
  );
}
