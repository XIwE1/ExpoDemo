import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

import CardItem, { CardItemProps } from "@/components/ui/CardItem";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import TagItem, { TagItemProps } from "./ui/TagItem";

interface NewsCardItemProps extends CardItemProps {
  tag: TagItemProps;
}

export default function NewsCardItem(props: NewsCardItemProps) {
  const router = useRouter();
  const { tag, ...cardItemProps } = props;
  const { category, time, mediaType } = tag;
  return (
    <Pressable
      onPress={() => {
        router.push(`/modal`);
      }}
    >
      <ThemedView style={styles.wrap}>
        <ThemedView style={[styles.badge]}>
          <ThemedText style={styles.badgeText}>New</ThemedText>
        </ThemedView>
        <CardItem
          {...cardItemProps}
          footer={
            <TagItem category={category} time={time} mediaType={mediaType} />
          }
        />
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { position: "relative", maxHeight: 250 },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    // padding: 2,
    paddingHorizontal: 3,
    // paddingVertical: 2,
    borderRadius: "50%",
    backgroundColor: "#ff4d4f",
    zIndex: 2,
  },
  badgeText: { color: "#fff", fontSize: 8 },
});
