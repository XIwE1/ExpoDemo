import { Image } from "expo-image";
import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import { ThemedView } from "../themed-view";
import TapView from "./TapView";

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
        style={{ width: "100%", height, borderRadius: 6 }}
        data={data}
        onProgressChange={progress}
        renderItem={({ item }) => (
          <TapView onClick={() => onClick?.(item)}>
            <Image
              source={item.image}
              style={[
                props.imageStyle,
                {
                  height: "100%",
                  borderRadius: 6,
                },
              ]}
              contentFit="fill"
            />
          </TapView>
        )}
        autoPlay={autoPlay}
        autoPlayInterval={interval}
      />
      {/* 参考b站的bar 左下方文字 右下方轮播 */}
      <Pagination.Basic
        data={data}
        progress={progress}
        dotStyle={styles.paginationDot}
        activeDotStyle={styles.paginationActiveDot}
        containerStyle={styles.pagination}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  pagination: {
    position: "absolute",
    bottom: 10,
    gap: 6,
  },
  paginationDot: {
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 50,
    marginHorizontal: 2,
    width: 6,
    height: 6,
  },
  paginationActiveDot: {
    backgroundColor: "#fff",
  },
});
