import { getData } from "@/constants/storage";
import { Foundation } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  Appearance,
} from "react-native";

const IndexTopBar = () => {
  let colorScheme = useColorScheme();
  const { width } = useWindowDimensions();
  const [lastUpdate, setLastUpdate] = useState<string>("");

  useEffect(() => {
    getData("last_update").then((data) =>
      setLastUpdate(new Date(data).toLocaleDateString())
    );
  }, []);

  const switchTheme = () => {
    if (colorScheme === "dark") {
      Appearance.setColorScheme("light");
    } else {
      Appearance.setColorScheme("dark");
    }
  };

  return (
    <View style={[styles.topBar, { width }]}>
      <Pressable
        style={[
          styles.goToFilterButton,
          colorScheme === "dark"
            ? styles.goToFilterDarkMode
            : styles.goToFilterLightMode,
        ]}
        onPress={switchTheme}
      >
        {colorScheme === "light" ? (
          <Ionicons name="sunny" size={26} color="black" />
        ) : (
          <Ionicons name="moon" size={26} color="black" />
        )}
      </Pressable>
      <Text
        style={colorScheme === "dark" ? { color: "white" } : { color: "black" }}
      >
        Last Updated: {lastUpdate}
      </Text>

      <Link
        style={[
          styles.goToFilterButton,
          colorScheme == "dark"
            ? styles.goToFilterDarkMode
            : styles.goToFilterLightMode,
        ]}
        href="/filter"
        asChild
        dismissTo
      >
        <TouchableOpacity>
          <Foundation name="filter" size={28} color="black" />
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default IndexTopBar;
const styles = StyleSheet.create({
  topBar: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  goToFilterButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    aspectRatio: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  goToFilterDarkMode: {
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  goToFilterLightMode: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
});
