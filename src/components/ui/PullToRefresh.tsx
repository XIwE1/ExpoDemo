/**
 * 思路参考：https://github.com/sophister/react-native-pull-to-refresh-custom
 * 顶部用 PanResponder 接管下拉，松手超过阈值才触发 onRefresh
 */

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type ReactElement,
  type RefAttributes,
} from "react";
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  PanResponder,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

export type PullToRefreshHeaderProps = {
  pullDistance: number;
  percentAnimatedValue: Animated.AnimatedDivision<number>;
  percent: number;
  refreshing: boolean;
};

export type PullToRefreshHeaderHandle = {
  setProgress: (params: { pullDistance: number; percent: number }) => void;
};

/** 手指位移 → 实际下拉位移，拉得越远边际位移越小 */
function applyElasticity(dy: number, elasticity: number): number {
  if (dy <= 0) return 0;
  // elasticity 越大越费力；分母随 dy 增大，形成阻尼
  return dy / (1 + (dy * elasticity) / 200);
}

export type PullToRefreshProps = {
  style?: StyleProp<ViewStyle>;
  HeaderComponent: ComponentType<
    PullToRefreshHeaderProps & RefAttributes<PullToRefreshHeaderHandle>
  >;
  headerHeight: number;
  refreshTriggerHeight?: number;
  refreshingHoldHeight?: number;
  refreshing: boolean;
  onRefresh: () => void;
  children: ReactElement;
  topPullThreshold?: number;
  /** 弹性阻尼，越大下拉越费力，默认 0.8 */
  elasticity?: number;
  /** 纵向手势开始/结束（用于锁定外层 PagerView） */
  onVerticalGesture?: (active: boolean) => void;
};

export default function PullToRefresh(props: PullToRefreshProps) {
  const {
    style,
    HeaderComponent,
    headerHeight,
    refreshTriggerHeight,
    refreshingHoldHeight,
    refreshing,
    onRefresh,
    children,
    topPullThreshold = 2,
    elasticity = 0.8,
    onVerticalGesture,
  } = props;

  const triggerHeight = refreshTriggerHeight ?? headerHeight;
  const holdHeight = refreshingHoldHeight ?? headerHeight;

  const containerTop = useRef(new Animated.Value(0)).current;
  const containerTranslateY = useRef(0);
  const innerScrollTop = useRef(0);
  const scrollEnabledRef = useRef(false);
  const refreshingRef = useRef(refreshing);
  const elasticityRef = useRef(elasticity);
  const onVerticalGestureRef = useRef(onVerticalGesture);
  const headerRef = useRef<PullToRefreshHeaderHandle | null>(null);
  const scrollRef = useRef<any>(null);
  const [scrollEnabled, setScrollEnabled] = useState(false);

  refreshingRef.current = refreshing;
  elasticityRef.current = elasticity;
  onVerticalGestureRef.current = onVerticalGesture;

  const resetContainerPosition = useCallback(() => {
    Animated.timing(containerTop, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [containerTop]);

  const isInnerScrollTop = useCallback(() => {
    return innerScrollTop.current <= topPullThreshold;
  }, [topPullThreshold]);

  const checkScroll = useCallback(() => {
    const atTop = isInnerScrollTop();
    if (atTop && scrollEnabledRef.current) {
      scrollEnabledRef.current = false;
      setScrollEnabled(false);
    } else if (!atTop && !scrollEnabledRef.current) {
      scrollEnabledRef.current = true;
      setScrollEnabled(true);
    }
  }, [isInnerScrollTop]);

  useEffect(() => {
    const id = containerTop.addListener(({ value }) => {
      containerTranslateY.current = value;
      headerRef.current?.setProgress({
        pullDistance: value,
        percent: value / triggerHeight,
      });
    });
    return () => {
      containerTop.removeListener(id);
    };
  }, [containerTop, triggerHeight]);

  const prevRefreshingRef = useRef(refreshing);

  useEffect(() => {
    const wasRefreshing = prevRefreshingRef.current;
    prevRefreshingRef.current = refreshing;

    if (!wasRefreshing && refreshing) {
      Animated.timing(containerTop, {
        toValue: holdHeight,
        duration: 150,
        useNativeDriver: true,
      }).start();
    } else if (wasRefreshing && !refreshing) {
      Animated.timing(containerTop, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [refreshing, holdHeight, containerTop]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponderCapture: (_, gestureState) => {
          if (refreshingRef.current) return false;
          if (scrollEnabledRef.current) return false;
          // 仅纵向占优时接管，避免挡住 PagerView 左右滑
          return Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
        },
        onPanResponderGrant: () => {
          onVerticalGestureRef.current?.(true);
        },
        onPanResponderMove: (_, gestureState) => {
          if (gestureState.dy >= 0) {
            containerTop.setValue(
              applyElasticity(gestureState.dy, elasticityRef.current),
            );
          } else {
            containerTop.setValue(0);
            if (scrollRef.current) {
              if (typeof scrollRef.current.scrollToOffset === "function") {
                scrollRef.current.scrollToOffset({
                  offset: -gestureState.dy,
                  animated: false,
                });
              } else if (typeof scrollRef.current.scrollTo === "function") {
                scrollRef.current.scrollTo({
                  y: -gestureState.dy,
                  animated: false,
                });
              }
            }
          }
        },
        onPanResponderRelease: () => {
          onVerticalGestureRef.current?.(false);
          // 松手后才判断是否触发刷新
          if (containerTranslateY.current >= triggerHeight) {
            onRefresh();
          } else {
            resetContainerPosition();
          }
          checkScroll();
        },
        onPanResponderTerminate: () => {
          onVerticalGestureRef.current?.(false);
          resetContainerPosition();
          checkScroll();
        },
        onPanResponderTerminationRequest: () => false,
        onShouldBlockNativeResponder: () => true,
      }),
    [containerTop, triggerHeight, onRefresh, resetContainerPosition, checkScroll],
  );

  const innerScrollCallback = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      innerScrollTop.current = event.nativeEvent.contentOffset.y;
      checkScroll();
    },
    [checkScroll],
  );

  const child = useMemo(() => {
    const childProps = children.props as {
      onScroll?: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
    };
    return React.cloneElement(children, {
      onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        innerScrollCallback(e);
        childProps.onScroll?.(e);
      },
      bounces: false,
      alwaysBounceVertical: false,
      scrollEnabled,
      ref: (ref: any) => {
        scrollRef.current = ref;
      },
      scrollEventThrottle: 16,
    } as any);
  }, [children, scrollEnabled, innerScrollCallback]);

  const percentAnimatedValue = useMemo(
    () => Animated.divide(containerTop, triggerHeight),
    [containerTop, triggerHeight],
  );

  const Header = HeaderComponent;

  return (
    <View style={[styles.con, style]} {...panResponder.panHandlers}>
      <Animated.View
        style={{ flex: 1, transform: [{ translateY: containerTop }] }}
      >
        {child}
      </Animated.View>
      <Animated.View
        style={[
          styles.header,
          {
            top: -headerHeight,
            height: headerHeight,
            transform: [{ translateY: containerTop }],
          },
        ]}
      >
        <Header
          ref={headerRef}
          percentAnimatedValue={percentAnimatedValue}
          pullDistance={containerTranslateY.current}
          percent={containerTranslateY.current / triggerHeight}
          refreshing={refreshing}
        />
      </Animated.View>
    </View>
  );
}

const styles = {
  con: {
    flex: 1,
    // iOS 上不设背景色可能导致 PanResponder 被中断
    backgroundColor: "#fff",
  } as ViewStyle,
  header: {
    position: "absolute" as const,
    left: 0,
    width: "100%" as const,
  },
};
