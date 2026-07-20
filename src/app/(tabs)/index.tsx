import { useNavigation } from "expo-router";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";

import { CustomHeaderTabs } from "@/components/CustomTabs";
import FeedTab from "@/components/feed/FeedTab";
import GuideTab from "@/components/feed/GuideTab";
import MatchTab from "@/components/feed/MatchTab";

const TABS = ["综合", "攻略", "赛事"] as const;

export default function HomeScreen() {
  const navigation = useNavigation();
  const pagerRef = useRef<PagerView>(null);
  const [pageIndex, setPageIndex] = useState(0);
  /** 上下滑/下拉时锁定，避免误触左右切页 */
  const [pagerEnabled, setPagerEnabled] = useState(true);

  const lockPager = useCallback(() => setPagerEnabled(false), []);
  const unlockPager = useCallback(() => setPagerEnabled(true), []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <CustomHeaderTabs
          tabs={[...TABS]}
          activeIndex={pageIndex}
          onTabChange={(_, index) => {
            setPageIndex(index);
            pagerRef.current?.setPage(index);
          }}
        />
      ),
    });
  }, [navigation, pageIndex]);

  return (
    <PagerView
      ref={pagerRef}
      style={styles.pager}
      initialPage={0}
      scrollEnabled={pagerEnabled}
      onPageSelected={(e) => setPageIndex(e.nativeEvent.position)}
    >
      <View key="feed" style={styles.page}>
        <FeedTab onScrollLock={lockPager} onScrollUnlock={unlockPager} />
      </View>

      <View key="guide" style={styles.page}>
        <GuideTab onScrollLock={lockPager} onScrollUnlock={unlockPager} />
      </View>

      <View key="match" style={styles.page}>
        <MatchTab onScrollLock={lockPager} onScrollUnlock={unlockPager} />
      </View>
    </PagerView>
  );
}

const styles = StyleSheet.create({
  pager: {
    flex: 1,
  },
  page: {
    flex: 1,
  },
});
