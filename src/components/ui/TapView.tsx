import { type ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { scheduleOnRN } from "react-native-worklets";

export type TapViewProps = {
  onClick?: () => void;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  /** 最大位移（超过则不算点击），默认 10 */
  maxDistance?: number;
};

export default function TapView({
  onClick,
  children,
  style,
  maxDistance = 10,
}: TapViewProps) {
  const tap = Gesture.Tap()
    .maxDistance(maxDistance)
    .onEnd(() => {
      if (onClick) {
        scheduleOnRN(onClick);
      }
    });

  return (
    <GestureDetector gesture={tap}>
      <View style={style} collapsable={false}>
        {children}
      </View>
    </GestureDetector>
  );
}
