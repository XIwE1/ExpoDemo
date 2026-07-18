import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Loading() {
  return (
    <View style={StyleSheet.absoluteFillObject}>
      <ActivityIndicator size="large" color="gray" />
    </View>
  );
}

const styles = StyleSheet.create({});
