import { ScrollView, StyleSheet } from "react-native";

import NewsList from "@/components/NewsList";
import Refreshing from "@/components/ui/Refreshing";
import { NEWS_DATA } from "@/constants/news";
import { useRefresh } from "@/hooks/use-refresh";

interface MatchTabProps {
  onScrollLock?: () => void;
  onScrollUnlock?: () => void;
}

export default function MatchTab(props: MatchTabProps) {
  const { onScrollLock, onScrollUnlock } = props;
  const { refreshing, onRefresh } = useRefresh();

  // 赛事暂用活动数据
  const matchData = NEWS_DATA.filter((item) => item.tag.category === "活动");

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
        <NewsList data={matchData} />
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
});
