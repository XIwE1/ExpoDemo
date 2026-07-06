import { Ionicons } from "@expo/vector-icons";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

type TabIconProps = {
  name: IoniconName;
  color: string;
  size?: number;
};

export default function TabIcon({ name, color, size = 26 }: TabIconProps) {
  return <Ionicons name={name} size={size} color={color} />;
}
