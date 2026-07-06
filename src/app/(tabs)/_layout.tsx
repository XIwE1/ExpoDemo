import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

import { IconSymbol } from "@/components/ui/icon-symbol";
import TabIcon from "@/components/ui/TabIcon";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    // <NativeTabs>
    //   <NativeTabs.Trigger name="index" options={{ title: 'Home' }} />
    //   <NativeTabs.Trigger name="explore" options={{ title: 'Explore' }} />
    // </NativeTabs>
    <Tabs
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false, // 去掉默认底边线
        headerTransparent: true, // 不占布局高度，浮在内容上
        headerTitle: "",
        headerLeft: ({ tintColor }) => (
          <IconSymbol
            size={20}
            name="density-medium"
            color={tintColor ?? "#000"}
          />
        ),
        headerLeftContainerStyle: styles.headerLeftContainer,
        tabBarStyle: styles.tabBar,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "推荐",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="newspaper-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="rank"
        options={{
          title: "排行榜",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="podium-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="record"
        options={{
          title: "战绩",
          tabBarIcon: ({ color }) => (
            <TabIcon name="game-controller-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerLeftContainer: {
    paddingLeft: 18,
  },
  tabBar: {
    paddingTop: 5,
  },
  tabBarIcon: {
    marginBottom: 4,
  },
  tabBarLabel: {
    fontSize: 11,
  },
});
