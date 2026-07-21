import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { StyleSheet } from "react-native";

export default function Record() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView type="surface" style={styles.item}>
        <ThemedText>头像</ThemedText>
      </ThemedView>
      <ThemedView type="surface" style={styles.item}>
        <ThemedText>胜率</ThemedText>
      </ThemedView>
      <ThemedView type="surface" style={styles.item}>
        <ThemedText>战绩</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  item: {
    borderRadius: 16,
    padding: 16,
  },
});
