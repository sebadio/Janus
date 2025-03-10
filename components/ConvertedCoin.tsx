import { CountryCurrencyRate } from "@/components/converter";
import {
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";
import CountryFlag from "react-native-country-flag";
import { memo, useRef } from "react";

type ConvertedCoinParams = {
  convertingFrom: CountryCurrencyRate;
  convertingTo: CountryCurrencyRate;
  changeValue: (
    amount: number,
    sourceCurrency: CountryCurrencyRate,
    targetCurrency: CountryCurrencyRate
  ) => void;
};

function ConvertedCoin({
  convertingFrom,
  convertingTo,
  changeValue,
}: ConvertedCoinParams) {
  const { width, fontScale } = useWindowDimensions();

  const textInputRef = useRef<TextInput>(null);

  const amount = convertingFrom.rate
    ? new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(
        convertingFrom.rate * convertingTo.rate
      )
    : "";

  let colorScheme = useColorScheme();

  const handleChangeText = (amount: string) => {
    let sanitized = amount.replace(/[^0-9.]/g, "");
    sanitized = sanitized.replace(/(?<=\..*)\./g, "");

    textInputRef.current?.setNativeProps({ text: sanitized });

    changeValue(parseFloat(sanitized), convertingTo, convertingTo);
  };

  return (
    <View style={[styles.outerContainer, { width: width }]}>
      <CountryFlag
        isoCode={convertingTo.isoCode}
        size={45 * fontScale}
        style={styles.countryFlag}
      />
      <View style={{ flex: 1 }}>
        <View style={styles.innerContainer}>
          <TextInput
            ref={textInputRef}
            autoComplete="off"
            autoCorrect={false}
            placeholder="0"
            placeholderTextColor={colorScheme == "dark" ? "gray" : "grey"}
            keyboardType="decimal-pad"
            numberOfLines={1}
            onChangeText={(amount) => handleChangeText(amount)}
            style={[
              styles.textInput,
              { fontSize: 25 * fontScale, flex: 1 },
              colorScheme == "dark"
                ? styles.textDarkMode
                : styles.textLightMode,
            ]}
            value={amount.toString()}
          />
          <Text
            style={[
              { fontSize: 25 * fontScale, fontWeight: 600 },
              colorScheme == "dark"
                ? styles.textDarkMode
                : styles.textLightMode,
            ]}
          >
            {" "}
            {convertingTo.currency}
          </Text>
        </View>
        <Text
          onPress={() => console.log(textInputRef.current)}
          style={[
            styles.countryName,
            {
              fontSize: 15 * fontScale,
            },
            colorScheme == "dark" ? styles.textDarkMode : styles.textLightMode,
          ]}
        >
          {convertingTo.name}
        </Text>
      </View>
    </View>
  );
}

export default memo(ConvertedCoin);

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },

  textInput: {
    textAlign: "right",
    fontWeight: "600",
  },

  textLightMode: {
    color: "black",
  },
  textDarkMode: {
    color: "white",
  },

  countryName: {
    textAlign: "right",
    color: "grey",
  },

  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  countryFlag: { borderRadius: 5 },
});
