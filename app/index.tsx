import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  StatusBar,
} from "react-native";
import Converter from "../components/converter";
import ClearCacheButton from "@/components/ClearCache";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { Foundation } from "@expo/vector-icons";

import { useState } from "react";
import { Link } from "expo-router";
import { storeData } from "@/constants/storage";

async function clearCache() {
  storeData("selected_coins", {});
  storeData("coins", null);
}

// TODO: hacer un whatsapp://send?text?... (deeplink)

export default function Index() {
  const [amount, setAmount] = useState("");

  const { width } = useWindowDimensions();

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StatusBar barStyle={"dark-content"} />

        <View
          style={{
            width: width,
            display: "flex",
            flexDirection: "row",
            gap: 10,
            padding: 5,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View></View>
          <Text>Last updated: TODO</Text>

          <Link href="/filter" asChild dismissTo>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                backgroundColor: "rgba(0,0,0,0.1)",
                borderRadius: 100,
                aspectRatio: 1,
              }}
            >
              <Foundation name="filter" size={28} color="black" />
            </TouchableOpacity>
          </Link>
        </View>

        <Converter />

        <View
          style={{
            backgroundColor: "grey",
            width: width,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <ClearCacheButton
            title="Clear cache"
            onPress={clearCache}
            color="#000"
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
