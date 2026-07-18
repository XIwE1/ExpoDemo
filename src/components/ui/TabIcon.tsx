import { Ionicons } from "@expo/vector-icons";

export type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

type TabIconProps = {
  name: IoniconName;
  color: string;
  size?: number;
  style?: any;
};

export default function TabIcon(props: TabIconProps) {
  const { name, color, size = 26, style } = props;
  return <Ionicons name={name} size={size} color={color} style={style} />;
}
