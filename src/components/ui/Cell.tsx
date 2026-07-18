import { common } from "@/styles/common";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";
import TabIcon, { IoniconName } from "./TabIcon";

interface CellProps {
  icon: IoniconName;
  title: string;
  iconColor?: string;
  titleColor?: string;
}

export default function Cell(props: CellProps) {
  const { icon, title, iconColor, titleColor } = props;
  const _iconColor = iconColor || "white";
  return (
    <View style={[common.row, styles.container]}>
      <TabIcon name={icon} color={_iconColor} size={20} />
      <ThemedText lightColor={titleColor} darkColor={titleColor}>
        {title}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
});
