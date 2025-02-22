import { CountryCurrencyRate } from "@/app/converter";
import {
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import CountryFlag from "react-native-country-flag";
import { memo } from "react";

type ConvertedCoinParams = {
  convertingFrom: CountryCurrencyRate;
  convertingTo: CountryCurrencyRate;
  changeValue: (
    amount: number,
    sourceCurrency: CountryCurrencyRate,
    targetCurrency: CountryCurrencyRate
  ) => void;
  onFocus: () => void;
};

function ConvertedCoin({
  convertingFrom,
  convertingTo,
  changeValue,
  onFocus,
}: ConvertedCoinParams) {
  const { width, fontScale } = useWindowDimensions();

  const amount = convertingFrom.rate
    ? new Intl.NumberFormat().format(convertingFrom.rate * convertingTo.rate)
    : "";

  return (
    <View style={[styles.outerContainer, { width: width }]}>
      <CountryFlag
        isoCode={convertingTo.isoCode}
        size={35 * fontScale}
        style={{ borderRadius: 5 }}
      />
      <View>
        <View style={styles.innerContainer}>
          <TextInput
            onFocus={() => onFocus()}
            autoComplete="off"
            autoCorrect={false}
            placeholder="0"
            keyboardType="decimal-pad"
            numberOfLines={1}
            onChangeText={(amount) =>
              changeValue(
                parseFloat(amount.replace(/,/g, "")),
                convertingTo,
                convertingTo
              )
            }
            style={[styles.textInput, { fontSize: 25 * fontScale }]}
          >
            {amount}
          </TextInput>
          <Text style={{ fontSize: 25 * fontScale, fontWeight: 600 }}>
            {" "}
            {convertingTo.currency}
          </Text>
        </View>
        <Text
          data-name
          style={[
            styles.countryName,
            {
              fontSize: 15 * fontScale,
            },
          ]}
        >
          {convertingTo.name}
        </Text>
      </View>
    </View>
  );
}

export default memo(ConvertedCoin);

// TODO: Make the input only be able to put numbers and a dot
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

  countryName: {
    textAlign: "right",
    color: "grey",
  },

  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
