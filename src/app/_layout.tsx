import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { ToastProvider } from "@/components/ui/Toast";
import { Themes } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  // 获取系统主题
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? Themes.dark : Themes.light}>
      <ToastProvider>
        <Stack>
          {/* name=路由名，options=路由选项 */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ToastProvider>
    </ThemeProvider>
  );
}
