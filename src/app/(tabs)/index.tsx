import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import NewsCardItem from "@/components/NewsCardItem";
import { ThemedView } from "@/components/themed-view";
import Refreshing from "@/components/ui/Refreshing";

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <Refreshing
      style={styles.wrapper}
      refreshing={refreshing}
      onRefresh={onRefresh}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <ThemedView type="surface" style={styles.container}>
          <NewsCardItem
            title="高压锅+法穿棒或峡谷等于版本答案？最详细的高压锅攻略"
            description="新一期璀璨臻彩召唤活动上线，至臻皮肤限时加入特等奖池。限时拿下心仪至臻、臻彩、限定皮肤，更有机会12元夺宝赢自选臻彩。臻彩【天龙之子 黛安娜 赫赫龙威】，【腥红之月 劫 琉璃】已加入自选臻彩池中，以下是详细介绍。"
            image={require("@/assets/images/lol.webp")}
            tag={{
              category: "攻略",
              time: "2026-07-06",
              mediaType: "image",
            }}
          />
        </ThemedView>
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
