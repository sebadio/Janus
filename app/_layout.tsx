import { Stack } from "expo-router";
import { StatusBar, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  let colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[
          styles.safeAreaStyles,
          colorScheme === "dark"
            ? styles.safeAreaDarkMode
            : styles.safeAreaLightMode,
        ]}
      >
        <StatusBar
          barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
          backgroundColor={colorScheme == "dark" ? "black" : "white"}
        />

        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "transparent",
            },
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaStyles: {
    flex: 1,
  },
  safeAreaLightMode: {
    backgroundColor: "#eaeaea",
  },
  safeAreaDarkMode: {
    backgroundColor: "#1c1c1c",
  },
});
