import { Text, TouchableOpacity, StyleSheet } from "react-native";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  color?: string;
};

export default function CustomButton({
  title,
  onPress,
  color = "#007BFF",
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
