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
    <ThemedView type="surface" style={styles.container}>
      <ThemedView type="surface" style={styles.left}>
        <ThemedText type="defaultSemiBold" numberOfLines={1}>
          {title}
        </ThemedText>

        {description && (
          <ThemedText type="description" numberOfLines={2}>
            {description}
          </ThemedText>
        )}
        {footer && (
          <ThemedView type="surface" style={styles.footer}>
            {footer}
          </ThemedView>
        )}
      </ThemedView>

      {image && (
        <ThemedView type="surface" style={styles.right}>
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
    paddingTop: 2,
    paddingLeft: 16,
    paddingRight: 4,
    paddingBottom: 2,
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
