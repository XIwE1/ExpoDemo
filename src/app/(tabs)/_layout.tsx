import { Tabs, useSegments } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

import { IconSymbol } from "@/components/ui/icon-symbol";
import TabIcon from "@/components/ui/TabIcon";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const segments = useSegments();
  const activeTab = segments[1] ?? "index";

  return (
    // <NativeTabs>
    //   <NativeTabs.Trigger name="index" options={{ title: 'Home' }} />
    //   <NativeTabs.Trigger name="explore" options={{ title: 'Explore' }} />
    // </NativeTabs>
    <Tabs
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false, // 去掉默认底边线
        headerTransparent: activeTab !== "index",
        headerTitle: "",
        headerLeft: ({ tintColor }) => (
          <IconSymbol
            size={20}
            name="density-medium"
            color={tintColor ?? "#000"}
          />
        ),
        headerLeftContainerStyle: styles.headerLeftContainer,
        tabBarStyle: { ...styles.tabBar, backgroundColor: theme.surface },
        tabBarIconStyle: styles.tabBarIcon,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "推荐",
          headerRight: ({ tintColor }) => (
            <TabIcon
              name="search"
              color={tintColor ?? "#000"}
              style={styles.headerRightContainer}
            />
          ),
          tabBarIcon: ({ color }) => (
            <TabIcon name="newspaper-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="rank"
        options={{
          title: "排行榜",
          tabBarIcon: ({ color }) => (
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
  headerRightContainer: {
    paddingRight: 18,
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
