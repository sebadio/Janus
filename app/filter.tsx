import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  StatusBar,
  TouchableOpacity,
  TextInput,
  View,
  useWindowDimensions,
  StyleSheet,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import CurrencyDatabase from "@/constants/CurrencyDatabase";

import countriesList from "@/constants/countriesList";
import { Country } from "@/types/Country";
import CoinCardFilter from "@/components/CoinCardFilter";
import { getData, storeData } from "@/constants/storage";

export default function filter() {
  const { width, height } = useWindowDimensions();
  let colorScheme = useColorScheme();

  const currencyDB = useMemo(() => new CurrencyDatabase(countriesList), []);

  const [selectedCoins, setSelectedCoins] = useState<Map<string, Country>>(
    new Map()
  );
  const [isLoading, setIsLoading] = useState(true);
  const [searchedCoins, setSearhedCoins] = useState<Country[]>(
    currencyDB.getAllCountries()
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    currencyDB.search(query, (results) => {
      setSearhedCoins(results);
    });
  };

  // TODO: make the selected ones first in the list, currently it's getting all countries
  // And if calling sort with .sort -> .has(id) the set doesn't have yet the data.

  useEffect(() => {
    getData("selected_coins").then((data) => {
      setSelectedCoins(new Map(data));
    });
    setIsLoading(false);
  }, []);

  const memoizedToggleSelection = useCallback(
    (id: string, country: Country) => {
      setSelectedCoins((prev) => {
        const updated = new Map(prev);
        if (updated.has(id)) {
          updated.delete(id);
        } else {
          updated.set(id, country);
        }

        storeData("selected_coins", Array.from(updated));
        return updated;
      });
    },
    []
  );

  const renderItem = ({ item }: { item: Country }) => (
    <CoinCardFilter
      checked={selectedCoins.has(item.id)}
      country={item}
      onToggle={memoizedToggleSelection}
    />
  );

  return (
    <>
      <View
        style={[
          styles.topBar,
          colorScheme == "dark"
            ? styles.topBarDarkMode
            : styles.topBarLightMode,
          {
            width,
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.goBackButton,
            colorScheme == "dark"
              ? styles.goBackButtonDarkMode
              : styles.goBackButtonLightMode,
          ]}
          onPress={() => router.dismissTo("/")}
        >
          <Ionicons name="return-down-back" size={24} color="black" />
        </TouchableOpacity>

        <TextInput
          style={[
            styles.searchBar,
            colorScheme == "dark"
              ? styles.searchBarDarkMode
              : styles.searchBarLightMode,
          ]}
          placeholder="Search"
          clearButtonMode="always"
          autoCapitalize="none"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <View
        style={[
          {
            borderWidth: 1,
            width,
          },
          colorScheme == "dark"
            ? { borderColor: "rgba(255,255,255,0.2)" }
            : { borderColor: "rgba(0,0,0,0.2)" },
        ]}
      />

      {isLoading ? (
        <View
          style={{ alignItems: "center", justifyContent: "center", height }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={searchedCoins.sort((a, b) => {
            if (selectedCoins.has(a.id) && selectedCoins.has(b.id)) return 0;
            if (selectedCoins.has(a.id)) return -1;
            if (selectedCoins.has(b.id)) return 1;
            return 0;
          })}
          renderItem={renderItem}
          windowSize={10}
          keyExtractor={(country) => country.id}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          getItemLayout={(data, index) => ({
            length: 45,
            offset: 45 * index,
            index,
          })}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaStyles: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  safeAreaLightMode: {
    backgroundColor: "#eaeaea",
  },
  safeAreaDarkMode: {
    backgroundColor: "#1c1c1c",
  },
  topBar: { flexDirection: "row", gap: 10, padding: 10 },
  topBarLightMode: { backgroundColor: "#eaeaea" },
  topBarDarkMode: { backgroundColor: "#1c1c1c" },
  goBackButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 100,
    aspectRatio: 1,
  },
  goBackButtonLightMode: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  goBackButtonDarkMode: {
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  searchBar: {
    flexGrow: 1,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  searchBarLightMode: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  searchBarDarkMode: {
    backgroundColor: "rgba(255,255,255,0.5)",
  },
});
