import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

const webUrl = process.env.EXPO_PUBLIC_WEB_URL;

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        {webUrl ? (
          <WebView
            source={{ uri: webUrl }}
            style={{ flex: 1 }}
            cacheEnabled
            domStorageEnabled
          />
        ) : (
          <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
            <Text>EXPO_PUBLIC_WEB_URL에 웹 앱 주소를 설정하세요.</Text>
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
