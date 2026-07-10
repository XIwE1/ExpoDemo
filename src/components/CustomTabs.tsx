import { useThemeColor } from "@/hooks/use-theme-color";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  LayoutRectangle,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

interface CustomHeaderTabsProps {
  tabs: string[];
  activeIndex?: number;
  onTabChange: (tab: string, index: number) => void;
}

export const CustomHeaderTabs = ({
  tabs,
  activeIndex,
  onTabChange,
}: CustomHeaderTabsProps) => {
  const [activeTab, setActiveTab] = useState(activeIndex ?? 0);
  const activeColor = useThemeColor({}, "tint");
  const inactiveColor = useThemeColor({}, "text");

  const tabLayouts = useRef<LayoutRectangle[]>([]);
  const underlineLeft = useRef(new Animated.Value(0)).current;
  const underlineWidth = useRef(new Animated.Value(0)).current;

  const moveUnderline = (index: number) => {
    const layout = tabLayouts.current[index];
    if (!layout) return;
    Animated.parallel([
      Animated.timing(underlineLeft, {
        toValue: layout.x + 11,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(underlineWidth, {
        toValue: 16,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  useEffect(() => {
    if (activeIndex === undefined || activeIndex === activeTab) return;
    setActiveTab(activeIndex);
    moveUnderline(activeIndex);
    // eslint-disable-next-line
  }, [activeIndex]);

  return (
    <ThemedView style={styles.container}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          onLayout={(e) => {
            tabLayouts.current[index] = e.nativeEvent.layout;
            if (index === activeTab) moveUnderline(index);
          }}
          onPress={() => {
            setActiveTab(index);
            onTabChange(tab, index);
            moveUnderline(index);
          }}
          style={styles.tab}
        >
          <ThemedText
            style={[
              styles.tabText,
              { color: activeTab === index ? activeColor : inactiveColor },
              activeTab === index && styles.activeTabText,
            ]}
          >
            {tab}
          </ThemedText>
        </TouchableOpacity>
      ))}
      <Animated.View
        style={[
          styles.underline,
          {
            left: underlineLeft,
            width: underlineWidth,
            backgroundColor: activeColor,
          },
        ]}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", paddingBottom: 2 },
  tab: { paddingHorizontal: 12, paddingVertical: 8, alignItems: "center" },
  tabText: { fontSize: 16 },
  activeTabText: { fontWeight: "bold" },
  underline: {
    position: "absolute",
    bottom: 4,
    height: 2,
  },
});
