import { StyleSheet } from "react-native";

import { newsItem } from "@/constants/news";
import NewsCardItem from "./NewsCardItem";
import { ThemedView } from "./themed-view";

interface NewsListProps {
  data: newsItem[];
}

export default function NewsList(props: NewsListProps) {
  const { data } = props;
  return (
    <ThemedView type="surface" style={styles.container}>
      {data.map((item) => (
        <NewsCardItem
          key={item.title}
          title={item.title}
          description={item.description}
          image={item.image}
          tag={item.tag}
        />
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingTop: 4,
  },
});
