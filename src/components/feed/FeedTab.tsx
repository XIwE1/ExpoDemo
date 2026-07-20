import { router } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";

import NewsList from "@/components/NewsList";
import Refreshing from "@/components/ui/Refreshing";
import Slides from "@/components/ui/Slides";
import { useRefresh } from "@/hooks/use-refresh";
import { NEWS_DATA, SLIDES_DATA } from "@/constants/news";

interface FeedTabProps {
  onScrollLock?: () => void;
  onScrollUnlock?: () => void;
}

export default function FeedTab(props: FeedTabProps) {
  const { onScrollLock, onScrollUnlock } = props;
  const { refreshing, onRefresh } = useRefresh();

  return (
    <Refreshing
      style={styles.wrapper}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onVerticalGesture={(active) =>
        active ? onScrollLock?.() : onScrollUnlock?.()
      }
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        onScrollBeginDrag={onScrollLock}
        onMomentumScrollBegin={onScrollLock}
        onScrollEndDrag={onScrollUnlock}
        onMomentumScrollEnd={onScrollUnlock}
      >
        <Slides
          data={SLIDES_DATA}
          onClick={(i) => i.url && router.push(`/articles?url=${i.url}`)}
          containerStyle={styles.slidesContainer}
          height={160}
        />
        <NewsList data={NEWS_DATA} />
      </ScrollView>
    </Refreshing>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  container: {
    height: "100%",
    paddingTop: 4,
  },
  slidesContainer: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
});
