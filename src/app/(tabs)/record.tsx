import Record from "@/app/record";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";

export default function RecordScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/lol_record_background.jpg")}
          style={styles.recordBg}
          contentFit="cover"
        />
      }
    >
      <Record />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  recordBg: {
    height: 210,
    width: "100%",
    top: 0,
    left: 0,
    position: "absolute",
  },
});
