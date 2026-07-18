import { StyleSheet } from "react-native";

export const common = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center" },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowStart: { flexDirection: "row", alignItems: "flex-start" },
  center: { justifyContent: "center", alignItems: "center" },
  centerStart: { justifyContent: "center", alignItems: "flex-start" },
  flex1: { flex: 1 },
  circle: { borderRadius: "50%" },
});
