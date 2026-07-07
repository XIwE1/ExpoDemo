import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

export interface CardItemProps {
  title: string;
  description?: string;
  image?: string;
  footer?: React.ReactNode;
}

export default function CardItem(props: CardItemProps) {
  const { title, description, image, footer } = props;
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.left}>
        <ThemedText type="defaultSemiBold" numberOfLines={1}>
          {title}
        </ThemedText>

        {description && (
          <ThemedText type="description" numberOfLines={2}>
            {description}
          </ThemedText>
        )}
        {footer && <ThemedView style={styles.footer}>{footer}</ThemedView>}
      </ThemedView>

      {image && (
        <ThemedView style={styles.right}>
          <Image source={image} style={styles.image} />
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: 8,
  },
  left: {
    flex: 2,
    flexDirection: "column",
    gap: 6,
  },
  right: {
    flex: 1,
    padding: 8,
  },
  image: {
    width: "100%",
    aspectRatio: 1.3,
    borderRadius: 8,
  },
  footer: {
    flexDirection: "row",
    gap: 8,
  },
});
