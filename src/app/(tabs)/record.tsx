import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Animated, Platform, StyleSheet } from "react-native";

export default function RecordScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          Welcome XIWEi!{" "}
          <Animated.Text
            style={{
              fontSize: 28,
              lineHeight: 32,
              marginTop: -6,
              animationName: {
                "50%": { transform: [{ rotate: "25deg" }] },
              },
              animationIterationCount: 4,
              animationDuration: "300ms",
            }}
          >
            👋
          </Animated.Text>
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: "ios cmd + d",
              android: "android cmd + m",
              web: "web F12",
            })}
          </ThemedText>
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            <ThemedText type="subtitle">Click me to open modal✋️</ThemedText>
          </Link.Trigger>
          <Link.Preview />
        </Link>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
