import { useState } from "react";
import { DimensionValue, StyleSheet, View } from "react-native";
import { WebView, WebViewProps } from "react-native-webview";
import Loading from "./Loading";

export default function ProgressWebView(props: WebViewProps) {
  const [progress, setProgress] = useState(0);

  return (
    <View style={styles.container}>
      {progress !== 1 && <ProgressBar progress={progress} />}
      <WebView
        startInLoadingState={true}
        renderLoading={() => <Loading />}
        onLoadProgress={(event) => setProgress(event.nativeEvent.progress)}
        {...props}
      />
    </View>
  );
}

const ProgressBar = (props: { progress: number }) => {
  const { progress } = props;
  const width = `${progress * 100}%` as DimensionValue;
  return <View style={[styles.progressBar, { width }]} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  progressBar: {
    height: 2,
    backgroundColor: "gray",
  },
});
