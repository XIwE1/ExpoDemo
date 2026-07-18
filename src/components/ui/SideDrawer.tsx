import { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { Drawer } from "react-native-drawer-layout";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedView } from "@/components/themed-view";
import { ImageBackground } from "expo-image";

type SideDrawerProps = {
  open: boolean;
  onToggle: (open: boolean) => void;
  menu?: ReactNode;
  children: ReactNode;
};

export default function SideDrawer(props: SideDrawerProps) {
  const insets = useSafeAreaInsets();
  const { open, onToggle, menu, children } = props;
  return (
    <Drawer
      open={open}
      onOpen={() => onToggle(true)}
      onClose={() => onToggle(false)}
      drawerPosition="left"
      drawerType="front"
      drawerStyle={styles.drawer}
      swipeEnabled
      renderDrawerContent={() => (
        <ThemedView style={[styles.panel]}>
          <ImageBackground
            source={require("@/assets/images/lol_background.jpg")}
            style={styles.background}
            contentFit="cover"
          ></ImageBackground>
          <ThemedView style={styles.menuContainer}>{menu}</ThemedView>
        </ThemedView>
      )}
    >
      {children}
    </Drawer>
  );
}

const styles = StyleSheet.create({
  panel: {
    flex: 1,
    // paddingHorizontal: 16,
    backgroundColor: "transparent",
  },
  background: {
    width: "100%",
    height: "100%",
  },
  menuContainer: {
    gap: 4,
    backgroundColor: "transparent",
  },
  drawer: {
    width: "80%",
  },
});
