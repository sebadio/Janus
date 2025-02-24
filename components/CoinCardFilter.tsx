import {
  Text,
  useWindowDimensions,
  View,
  TouchableNativeFeedback,
  StyleSheet,
  useColorScheme,
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
  let colorScheme = useColorScheme();

  const { currency, isoCode, name } = country;

  return (
    <TouchableNativeFeedback onPress={() => onToggle(country.id, country)}>
      <View
        style={[
          styles.outerView,
          colorScheme == "dark" ? styles.outerViewDarkMode : "",
          {
            width,
          },
        ]}
      >
        <CountryFlag isoCode={isoCode} size={35} style={{ borderRadius: 5 }} />

        <View style={{ flexGrow: 1 }}>
          <View style={styles.innerView}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.countryNameText,
                colorScheme == "dark" ? { color: "white" } : "",
              ]}
            >
              {name}
            </Text>

            <Text style={colorScheme == "dark" ? { color: "white" } : ""}>
              , {currency}, {isoCode}
            </Text>
            <Checkbox
              color={colorScheme == "dark" ? "#2F4F4F" : ""}
              style={styles.checkbox}
              value={checked}
              onValueChange={() => onToggle(country.id, country)}
            />
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  outerView: { padding: 10, alignItems: "center", flexDirection: "row" },
  outerViewDarkMode: { backgroundColor: "#1c1c1c" },
  innerView: { flexDirection: "row", gap: 5, alignSelf: "flex-end" },
  checkbox: { marginLeft: 10 },
  countryNameText: {
    maxWidth: "50%",
  },
});

export default memo(CoinCardFilter);
