import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Button, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

const defaultWebUrl = process.env.EXPO_PUBLIC_WEB_URL;
const webUrlStorageKey = "daver-web-url";

export default function App() {
  const [webUrl, setWebUrl] = useState<string | null | undefined>();
  const [input, setInput] = useState(defaultWebUrl ?? "");
  const [error, setError] = useState("");

  useEffect(() => {
    AsyncStorage.getItem(webUrlStorageKey)
      .then((savedUrl) => {
        setWebUrl(savedUrl || defaultWebUrl || null);
        setInput(savedUrl || defaultWebUrl || "");
      })
      .catch(() => setWebUrl(defaultWebUrl || null));
  }, []);

  async function openWebUrl() {
    let nextUrl: string;
    try {
      const url = new URL(input.trim());
      if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error();
      nextUrl = url.href;
    } catch {
      setError("http:// 또는 https://로 시작하는 주소를 입력하세요.");
      return;
    }

    try {
      await AsyncStorage.setItem(webUrlStorageKey, nextUrl);
      setError("");
      setWebUrl(nextUrl);
    } catch {
      setError("웹 주소를 저장하지 못했습니다.");
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        {webUrl === undefined ? (
          <ActivityIndicator style={{ flex: 1 }} />
        ) : webUrl ? (
          <>
            <WebView
              source={{ uri: webUrl }}
              style={{ flex: 1 }}
              cacheEnabled
              domStorageEnabled
              onError={() => {
                setError("웹 앱에 연결할 수 없습니다. 주소와 네트워크를 확인하세요.");
                setWebUrl(null);
              }}
            />
            <Pressable onPress={() => setWebUrl(null)} style={{ alignSelf: "flex-end", padding: 8 }}>
              <Text style={{ color: "#52525b", fontSize: 12 }}>웹 주소 변경</Text>
            </Pressable>
          </>
        ) : (
          <View style={{ flex: 1, justifyContent: "center", gap: 12, padding: 24 }}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>웹 앱 주소</Text>
            <TextInput
              value={input}
              onChangeText={setInput}
              onSubmitEditing={openWebUrl}
              accessibilityLabel="웹 앱 주소"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="url"
              returnKeyType="go"
              placeholder="https://example.com"
              style={{ borderWidth: 1, borderColor: "#d4d4d8", borderRadius: 8, padding: 12 }}
            />
            {error ? <Text style={{ color: "#dc2626" }}>{error}</Text> : null}
            <Button title="열기" onPress={openWebUrl} />
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
