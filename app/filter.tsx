import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import CurrencyDatabase from "@/constants/CurrencyDatabase";

import countriesList from "@/constants/countriesList";
import { Country } from "@/types/Country";
import CoinCardFilter from "@/components/CoinCardFilter";
import { getData, storeData } from "@/constants/storage";

export default function other() {
  const { width } = useWindowDimensions();

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
        const { currency } = country;
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
    <SafeAreaProvider>
      <SafeAreaView>
        <StatusBar barStyle={"dark-content"} />

        <View
          style={{
            flexDirection: "row",
            width: width,
            gap: 10,
            padding: 10,
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 5,
              backgroundColor: "rgba(0,0,0,0.1)",
              borderRadius: 100,
              aspectRatio: 1,
            }}
            onPress={() => router.dismissTo("/")}
          >
            <Ionicons name="return-down-back" size={24} color="black" />
          </TouchableOpacity>

          <TextInput
            style={{
              flexGrow: 1,
              backgroundColor: "rgba(0,0,0,0.1)",
              paddingHorizontal: 15,
              borderRadius: 20,
            }}
            placeholder="Search"
            clearButtonMode="always"
            autoCapitalize="none"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.2)",
          }}
        />

        {isLoading ? (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text>LOADING</Text>
          </View>
        ) : (
          <FlatList
            data={searchedCoins}
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
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
