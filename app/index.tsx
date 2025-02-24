import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  useColorScheme,
} from "react-native";
import Converter from "../components/converter";

import { Foundation } from "@expo/vector-icons";

import { Link } from "expo-router";
import { storeData } from "@/constants/storage";

async function clearCache() {
  storeData("selected_coins", {});
  storeData("coins", null);
}

// TODO: hacer un whatsapp://send?text?... (deeplink)

export default function Index() {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();

  return (
    <>
      <View style={[styles.topBar, { width }]}>
        <View></View>
        <Text>Last updated: TODO</Text>

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

      <Converter />
    </>
  );
}

const styles = StyleSheet.create({
  topBar: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    padding: 5,
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
