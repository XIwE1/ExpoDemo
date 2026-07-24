import { common } from "@/styles/common";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

interface RecordHeaderProps {
  avatar: string;
  name: string;
  level: string;
  winRate: string | number;
}

export default function RecordHeader(props: RecordHeaderProps) {
  const { avatar, name, level, winRate } = props;
  return (
    <ThemedView style={[common.rowStart, styles.container]}>
      <View style={styles.left}>
        <Image source={avatar} style={[common.circle, styles.avatar]} />
      </View>
      <View style={styles.right}>
        <ThemedText type="defaultSemiBold">{name}</ThemedText>
        <ThemedText type="description" lightColor="#9a9a9a" darkColor="#8e8e93">
          {level}·胜率{winRate}%
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },

  left: {
    top: "-50%",
    overflow: "hidden",
  },
  right: {
    gap: 2,
    top: -10,
    opacity: 0.85,
  },
  avatar: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: "black",
  },
});
