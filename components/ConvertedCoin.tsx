import { CountryCurrencyRate } from "@/components/converter";
import {
  StyleSheet,
  Text,
  TextInput,
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
    ? new Intl.NumberFormat().format(convertingFrom.rate * convertingTo.rate)
    : "";

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
        size={35 * fontScale}
        style={styles.countryFlag}
      />
      <View>
        <View style={styles.innerContainer}>
          <TextInput
            ref={textInputRef}
            autoComplete="off"
            autoCorrect={false}
            placeholder="0"
            keyboardType="decimal-pad"
            numberOfLines={1}
            onChangeText={(amount) => handleChangeText(amount)}
            style={[styles.textInput, { fontSize: 25 * fontScale }]}
            value={amount.toString()}
          />
          <Text style={{ fontSize: 25 * fontScale, fontWeight: 600 }}>
            {" "}
            {convertingTo.currency}
          </Text>
        </View>
        <Text
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

  countryFlag: { borderRadius: 5 },
});
