import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import EmbeddedApp from "../web/src/embedded";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <EmbeddedApp
          dom={{ useExpoDOMWebView: false, domStorageEnabled: true, style: { flex: 1 } }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
