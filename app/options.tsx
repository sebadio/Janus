import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Appearance,
  TouchableNativeFeedback,
  useColorScheme,
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";

const options = () => {
  const { width } = useWindowDimensions();
  let colorScheme = useColorScheme();
  const switchTheme = () => {
    if (colorScheme === "dark") {
      Appearance.setColorScheme("light");
    } else {
      Appearance.setColorScheme("dark");
    }
  };

  return (
    <>
      <View style={{ width, backgroundColor: "red", padding: 15 }}>
        <TouchableOpacity onPress={() => router.dismissTo("/")}>
          <Ionicons name="return-down-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableNativeFeedback onPress={() => switchTheme()}>
          <View style={{ padding: 10, backgroundColor: "blue" }}>
            <Text>Change Theme</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </>
  );
};

export default options;
