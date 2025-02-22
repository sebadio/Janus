import {
  Text,
  useWindowDimensions,
  View,
  TouchableNativeFeedback,
} from "react-native";
import CountryFlag from "react-native-country-flag";
import Checkbox from "expo-checkbox";
import { memo } from "react";
import { Country } from "@/types/Country";

type CoinCardFilterProps = {
  country: Country;
  checked: boolean;
  onToggle: (id: string, currency: Country) => void;
};

const CoinCardFilter = ({
  country,
  checked,
  onToggle,
}: CoinCardFilterProps) => {
  const { width } = useWindowDimensions();

  const { currency, isoCode, name } = country;

  return (
    <TouchableNativeFeedback
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: width,
        maxWidth: width,
        paddingHorizontal: 15,
        paddingVertical: 15,
        // backgroundColor: pressed ? "rgba(0,0,0,0.1)" : "white",
        transitionDuration: "10000ms",
        transitionProperty: "background_color",
      }}
      onPress={() => onToggle(country.id, country)}
    >
      <View
        style={{
          padding: 10,
          width: width,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <CountryFlag isoCode={isoCode} size={35} style={{ borderRadius: 5 }} />

        <View style={{ flexGrow: 1 }}>
          <View style={{ flexDirection: "row", gap: 5, alignSelf: "flex-end" }}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                maxWidth: "50%",
              }}
            >
              {name}
            </Text>
            <Text>, </Text>
            <Text>{currency}</Text>
            <Text>, </Text>
            <Text>{isoCode}</Text>
            <Checkbox
              style={{ marginLeft: 10 }}
              value={checked}
              onValueChange={() => onToggle(country.id, country)}
            />
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default memo(CoinCardFilter);
