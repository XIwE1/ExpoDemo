import { ReactNode } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Drawer } from "react-native-drawer-layout";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

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
      swipeEnabled
      renderDrawerContent={() => (
        <ThemedView style={[styles.panel, { paddingTop: insets.top + 16 }]}>
          <ThemedText type="subtitle">菜单</ThemedText>

          <ThemedView style={styles.menuContainer}>
            {menu ? (
              menu
            ) : (
              <>
                <MenuItem label="我的账号" />
                <MenuItem label="设置" />
                <MenuItem label="关于" />
              </>
            )}
          </ThemedView>
        </ThemedView>
      )}
    >
      {children}
    </Drawer>
  );
}

function MenuItem({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.item}>
      <ThemedText>{label}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  panel: {
    flex: 1,
    paddingHorizontal: 16,
  },
  menuContainer: {
    gap: 4,
  },
  item: {
    paddingVertical: 14,
  },
});
