import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Drawer } from "react-native-drawer-layout";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
        <ImageBackground
          source={require("@/assets/images/lol_background.jpg")}
          style={styles.background}
          contentFit="cover"
        >
          <View style={[styles.menuContainer, { paddingTop: insets.top + 16 }]}>
            {menu}
          </View>
        </ImageBackground>
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
