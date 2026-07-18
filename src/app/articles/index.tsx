import ProgressWebView from "@/components/ui/ProgressWebView";
import { Stack, useLocalSearchParams } from "expo-router";

export default function WebviewScreen() {
  const { url } = useLocalSearchParams<{ url: string }>();
  return (
    <>
      <Stack.Screen options={{ title: "详情", headerBackTitle: "返回" }} />
      <ProgressWebView source={{ uri: url }} style={{ flex: 1 }} />
    </>
  );
}
