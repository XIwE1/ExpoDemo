import { useNavigation } from "expo-router";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";

import { CustomHeaderTabs } from "@/components/CustomTabs";
import NewsList from "@/components/NewsList";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Refreshing from "@/components/ui/Refreshing";
import Slides from "@/components/ui/Slides";
import { useToast } from "@/components/ui/Toast";
import { NEWS_DATA, SLIDES_DATA } from "@/constants/news";

const TABS = ["综合", "攻略", "赛事"] as const;

export default function HomeScreen() {
  const navigation = useNavigation();
  const pagerRef = useRef<PagerView>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  /** 上下滑/下拉时锁定，避免误触左右切页 */
  const [pagerEnabled, setPagerEnabled] = useState(true);
  const { show } = useToast();

  const lockPager = useCallback(() => setPagerEnabled(false), []);
  const unlockPager = useCallback(() => setPagerEnabled(true), []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      show("已刷新");
    }, 1000);
  };

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
        <Refreshing
          style={styles.wrapper}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onVerticalGesture={(active) => (active ? lockPager() : unlockPager())}
        >
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            onScrollBeginDrag={lockPager}
            onMomentumScrollBegin={lockPager}
            onScrollEndDrag={unlockPager}
            onMomentumScrollEnd={unlockPager}
          >
            <Slides
              data={SLIDES_DATA}
              onClick={(i) => i.url && alert(i.url)}
              containerStyle={styles.slidesContainer}
              height={160}
            />
            <NewsList data={NEWS_DATA} />
          </ScrollView>
        </Refreshing>
      </View>

      <View key="guide" style={styles.page}>
        <ThemedView type="surface" style={styles.placeholder}>
          <ThemedText>攻略</ThemedText>
        </ThemedView>
      </View>

      <View key="match" style={styles.page}>
        <ThemedView type="surface" style={styles.placeholder}>
          <ThemedText>赛事</ThemedText>
        </ThemedView>
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
  placeholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  slidesContainer: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
});
