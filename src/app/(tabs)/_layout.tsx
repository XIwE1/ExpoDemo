import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
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
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "推荐",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="article" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="rank"
        options={{
          title: "排行榜",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="leaderboard" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="record"
        options={{
          title: "战绩",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="sports-esports" color={color} />
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
});
