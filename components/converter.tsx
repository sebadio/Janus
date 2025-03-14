import { StyleSheet, View, FlatList } from "react-native";
import { useEffect, useRef, useState } from "react";
import ConvertedCoin from "@/components/ConvertedCoin";
import { getData, storeData } from "@/constants/storage";
import { Country } from "@/types/Country";

export interface CountryCurrencyRate extends Country {
  rate: number;
}

async function getCoinData() {
  const dataSaved = await getData("coins");
  const next_update = await getData("next_update");

  if (dataSaved != null && new Date() < new Date(next_update)) {
    return [dataSaved, false];
  }

  const response = await fetch("https://open.er-api.com/v6/latest/USD");
  const data = await response.json();

  await storeData("last_update", data.time_last_update_utc);
  await storeData("next_update", data.time_next_update_utc);
  await storeData("coins", data.rates);
  return [data.rates, true];
}

export default function Converter() {
  const [coins, setCoins] = useState<CountryCurrencyRate[]>([]);
  const [amountToConvert, setAmountToConvert] = useState<number>(0);

  const flatListRef = useRef<FlatList<CountryCurrencyRate>>(null);

  useEffect(() => {
    Promise.all([getData("selected_coins"), getCoinData()]).then(
      ([selectedCoinData, getCoinValues]) => {
        const coinsArray: CountryCurrencyRate[] = [];
        const [currencyRates, didFetch] = getCoinValues;

        const selected = new Map(selectedCoinData);

        for (const [key, { currency, id, isoCode, name }] of (
          selected as Map<string, Country>
        ).entries()) {
          const rate: number = currencyRates[currency];
          coinsArray.push({ currency, rate, id, isoCode, name });
        }

        setCoins(coinsArray);
      }
    );
  }, []);

  function convert(
    amount: number,
    currencyA: CountryCurrencyRate,
    currencyB: CountryCurrencyRate
  ) {
    const amountInUSD = amount / currencyA.rate;
    setAmountToConvert(amountInUSD);
  }

  const renderItem = ({
    item,
    index,
  }: {
    item: CountryCurrencyRate;
    index: number;
  }) => (
    <ConvertedCoin
      changeValue={convert}
      convertingFrom={{
        currency: "USD",
        id: "1",
        isoCode: "US",
        name: "United States",
        rate: amountToConvert,
      }}
      convertingTo={item}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        removeClippedSubviews={false}
        data={coins}
        ref={flatListRef}
        keyExtractor={({ id }) => id}
        renderItem={renderItem}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        getItemLayout={(data, index) => ({
          length: 95,
          offset: 95 * index,
          index,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollview: {
    width: "auto",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
