import { View, type ViewProps } from "react-native";

import { Colors } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";

export type ThemedViewType = keyof typeof Colors.light &
  keyof typeof Colors.dark;

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: ThemedViewType;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  type = "background",
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    type,
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
