import { StyleSheet } from "react-native";

import { formatRelativeTime } from "@/utils";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

export interface TagItemProps {
  category: string;
  time: unknown;
  mediaType: "image" | "video" | string;
}

const MEDIA_LABEL: Record<string, string> = {
  image: "图文",
  video: "视频",
};

const TAG_COLORS: Record<string, { bg: string; fg: string }> = {
  image: { bg: "#e6f4ff", fg: "#1677ff" },
  video: { bg: "#fff7e6", fg: "#fa8c16" },
};

export default function TagItem(props: TagItemProps) {
  const { category, time, mediaType } = props;
  const c = TAG_COLORS[mediaType] ?? { bg: "#f0f0f0", fg: "#333" };
  return (
    <ThemedView style={styles.row}>
      <ThemedText type="description">{category}·</ThemedText>
      <ThemedText type="description">{formatRelativeTime(time)}</ThemedText>
      <ThemedView style={[styles.tag, { backgroundColor: c.bg }]}>
        <ThemedText style={[styles.tagText, { color: c.fg }]}>
          {MEDIA_LABEL[mediaType] ?? mediaType}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  row: {
    fontSize: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 2,
  },
  tag: {
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 12,
    lineHeight: 18,
  },
});
