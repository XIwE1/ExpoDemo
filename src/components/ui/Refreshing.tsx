import React, {
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import PullToRefresh, {
  type PullToRefreshHeaderHandle,
  type PullToRefreshHeaderProps,
} from "@/components/ui/PullToRefresh";
import { useThemeColor } from "@/hooks/use-theme-color";

const HEADER_HEIGHT = 56;

type RefreshHeaderProps = PullToRefreshHeaderProps;

const RefreshHeader = forwardRef<PullToRefreshHeaderHandle, RefreshHeaderProps>(
  function RefreshHeader(props, ref) {
    const { refreshing } = props;
    const [percent, setPercent] = useState(0);
    const textColor = useThemeColor({}, "text");
    const tintColor = useThemeColor({}, "tint");

    useImperativeHandle(ref, () => ({
      setProgress: ({ percent: next }) => {
        setPercent(next);
      },
    }));

    let text = "下拉刷新";
    if (refreshing) {
      text = "刷新中...";
    } else if (percent >= 1) {
      text = "松开刷新";
    }

    return (
      <View style={styles.header}>
        {refreshing ? (
          <ActivityIndicator color={tintColor} />
        ) : (
          <Text style={[styles.headerText, { color: textColor }]}>{text}</Text>
        )}
      </View>
    );
  },
);

type RefreshingProps = {
  refreshing: boolean;
  onRefresh: () => void;
  children: React.ReactElement;
  style?: StyleProp<ViewStyle>;
  headerHeight?: number;
  /** 弹性阻尼，越大下拉越费力，默认 0.8 */
  elasticity?: number;
  onVerticalGesture?: (active: boolean) => void;
};

/** 封装好的下拉刷新：松手超过阈值才触发 onRefresh */
export default function Refreshing(props: RefreshingProps) {
  const {
    refreshing,
    onRefresh,
    children,
    style,
    headerHeight = HEADER_HEIGHT,
    elasticity,
    onVerticalGesture,
  } = props;
  const backgroundColor = useThemeColor({}, "background");

  return (
    <PullToRefresh
      style={[{ backgroundColor }, style]}
      HeaderComponent={RefreshHeader}
      headerHeight={headerHeight}
      refreshTriggerHeight={headerHeight}
      refreshing={refreshing}
      onRefresh={onRefresh}
      elasticity={elasticity}
      onVerticalGesture={onVerticalGesture}
    >
      {children}
    </PullToRefresh>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 13,
  },
});
