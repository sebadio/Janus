import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, value: object | null) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log("ERROR Storing Data");
    console.log(error);
  }
};

export const getData = async (key: string): Promise<any | null> => {
  try {
    const jsonString = await AsyncStorage.getItem(key);
    if (jsonString !== null) {
      return JSON.parse(jsonString);
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
