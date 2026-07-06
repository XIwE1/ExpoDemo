// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

// type IconMapping = Record<
//   SymbolViewProps["name"],
//   ComponentProps<typeof MaterialIcons>["name"]
// >;
// type IconSymbolName = keyof typeof MAPPING;

/**
 * 在 MaterialIcons 中查找对应的图标名称
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
// const MAPPING = {
//   "house.fill": "home",
//   "paperplane.fill": "article",
//   "chevron.left.forwardslash.chevron.right": "code",
//   "chevron.right": "chevron-right",
// } as IconMapping;

/**
 * 在 IOS 中使用 SF Symbols，在 Android 和 Web 中使用 Material Icons
 * 图标名称基于 SF Symbols ，需要手动映射到 Material Icons
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: ComponentProps<typeof MaterialIcons>["name"];
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <MaterialIcons
      color={color}
      size={size}
      // name={MAPPING[name]}
      name={name}
      style={style}
    />
  );
}
