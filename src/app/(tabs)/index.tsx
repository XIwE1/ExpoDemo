import { ThemedText } from "@/components/themed-text";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
  return <ThemedText>record</ThemedText>;
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
