import { ScrollView, StyleSheet } from "react-native";

import NewsList from "@/components/NewsList";
import Refreshing from "@/components/ui/Refreshing";
import { NEWS_DATA } from "@/constants/news";
import { useRefresh } from "@/hooks/use-refresh";

interface GuideTabProps {
  onScrollLock?: () => void;
  onScrollUnlock?: () => void;
}

export default function GuideTab(props: GuideTabProps) {
  const { onScrollLock, onScrollUnlock } = props;
  const { refreshing, onRefresh } = useRefresh();

  const guideData = NEWS_DATA.filter((item) => item.tag.category === "攻略");

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
        <NewsList data={guideData} />
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
