import React from "react";
import { WebView } from "react-native-webview";

export default function InteractiveMap() {
  const handleWebViewMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    console.log(`Latitude: ${data.lat}, Longitude: ${data.lng}`);
  };
  return (
    <WebView
      originWhitelist={["*"]}
      source={require("../assets/maps/maps.html")}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      onMessage={handleWebViewMessage}
    />
  );
}
