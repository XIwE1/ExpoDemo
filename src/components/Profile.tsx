import { common } from "@/styles/common";
import { User } from "@/types/user";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";
import Cell from "./ui/Cell";

interface ProfileProps {
  user: User;
}

export default function Profile(props: ProfileProps) {
  const { user } = props;
  return (
    <View style={styles.container}>
      <View style={[common.center, styles.header]}>
        <Image
          source={{ uri: user.avatar }}
          style={[common.circle, styles.avatar]}
        />
        <ThemedText lightColor="white" darkColor="white">
          {user.name}
        </ThemedText>
      </View>
      <View style={[common.centerStart, styles.content]}>
        <Cell icon="person-outline" title="个人信息" titleColor="white" />
        <Cell icon="settings-outline" title="设置" titleColor="white" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "100%",
    height: "100%",
    // justifyContent: "center",
    // alignItems: "center",
  },
  header: {
    padding: 16,
    gap: 10,
  },
  content: {
    paddingHorizontal: 30,
    gap: 24,
  },
  avatar: {
    width: 60,
    height: 60,
  },
});
