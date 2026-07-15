import { Image } from "expo-image";
import {
    Dimensions,
    ImageStyle,
    Pressable,
    StyleProp,
    StyleSheet,
    ViewStyle,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import { ThemedView } from "../themed-view";

type SlideItem = {
  image: string;
  url?: string;
  title?: string;
  description?: string;
};

interface SlidesProps {
  data: SlideItem[];
  autoPlay?: boolean;
  interval?: number;
  height?: number;
  onClick?: (item: SlideItem) => void;
  imageStyle?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const width = Dimensions.get("window").width;

export default function Slides(props: SlidesProps) {
  const {
    autoPlay = true,
    interval = 3000,
    data,
    height = 200,
    onClick,
  } = props;

  const progress = useSharedValue(0);

  return (
    <ThemedView type="surface" style={[props.containerStyle]}>
      <Carousel
        style={{ width: "100%", height }}
        data={data}
        onProgressChange={progress}
        renderItem={({ item }) => (
          <Pressable onPress={() => onClick?.(item)}>
            <Image
              style={[props.imageStyle, { width: "100%", height: "100%" }]}
              source={item.image}
              contentFit="cover"
            />
          </Pressable>
        )}
        autoPlay={autoPlay}
        autoPlayInterval={interval}
      />
      <Pagination.Basic
        data={data}
        progress={progress}
        dotStyle={styles.paginationDot}
        activeDotStyle={styles.paginationActiveDot}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  paginationDot: {
    backgroundColor: "#ccc",
    borderRadius: 50,
    marginHorizontal: 5,
    width: 10,
    height: 10,
  },
  paginationActiveDot: {
    backgroundColor: "#1677ff",
  },
});
