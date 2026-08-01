import RecordHeader from "@/components/record/RecordHeader";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { USER_DATA } from "@/constants/user";
import { StyleSheet } from "react-native";

export default function Record() {
  const { avatar, name, level, winRate } = USER_DATA;
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={[styles.item, { paddingVertical: 8 }]}>
        <RecordHeader
          avatar={avatar}
          name={name}
          level={level}
          winRate={winRate}
        />
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
    padding: 16,
  },
});
