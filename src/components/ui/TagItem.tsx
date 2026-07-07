import { StyleSheet } from "react-native";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { formatRelativeTime } from "@/utils";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

export interface TagItemProps {
  category: string;
  time: unknown;
  mediaType: "image" | "video";
}

const MEDIA_LABEL: Record<string, string> = {
  image: "图文",
  video: "视频",
};

const TAG_COLORS = {
  light: {
    image: { bg: "#e6f4ff", fg: "#1677ff" },
    video: { bg: "#fff1f0", fg: "#ff4d4f" },
    default: { bg: "#f0f0f0", fg: "#333" },
  },
  dark: {
    image: { bg: "#111d2c", fg: "#3c89e8" },
    video: { bg: "#2a1215", fg: "#ff7875" },
    default: { bg: "#2a2a2a", fg: "#e0e0e0" },
  },
} as const;

export default function TagItem(props: TagItemProps) {
  const { category, time, mediaType } = props;
  const scheme = useColorScheme() ?? "light";
  const palette = TAG_COLORS[scheme];
  const c = palette[mediaType] ?? palette.default;
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
    fontWeight: "600",
  },
});
