import { StyleSheet, View, Text, FlatList } from "react-native";
import { useEffect, useRef, useState } from "react";
import ConvertedCoin from "@/components/ConvertedCoin";
import { getData, storeData } from "@/constants/storage";
import { Country } from "@/types/Country";
import convertCurrency from "@/constants/convertCurrency";

export interface CountryCurrencyRate extends Country {
  rate: number;
}

async function getCoinData() {
  const dataSaved = await getData("coins");

  if (dataSaved != null) {
    return [dataSaved, false];
  }

  const response = await fetch("https://open.er-api.com/v6/latest/USD");
  const data = await response.json();

  await storeData("coins", data.rates);
  return [data.rates, true];
}

export default function Converter() {
  const [coins, setCoins] = useState<CountryCurrencyRate[]>([]);
  const [didFetch, setDidFetch] = useState<boolean>(true);
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
        setDidFetch(didFetch);
      }
    );
  }, []);

  function aguacate(
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
      changeValue={aguacate}
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
      <Text>{didFetch ? "Yes" : "No"}</Text>

      <FlatList
        removeClippedSubviews={false}
        data={coins}
        ref={flatListRef}
        keyExtractor={({ id }) => id}
        renderItem={renderItem}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        getItemLayout={(data, index) => ({
          length: 95, // Approximate height of each item
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
