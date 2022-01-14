import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { RecoilRoot } from "recoil";
import { ActivityIndicator } from "react-native";
import SafeArea from "./src/components/Utility/SafeArea";
import StackNavigator from "./src/navigation/StackNavigator";
import WatchListProvider from "./src/contexts/WatchListContext";
import { useFonts, Roboto_400Regular } from "@expo-google-fonts/roboto";

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <SafeArea>
      <RecoilRoot>
        <WatchListProvider>
          <NavigationContainer
            theme={{
              colors: {
                background: "#121212",
              },
            }}
          >
            <StackNavigator />
          </NavigationContainer>
          <StatusBar style="light" />
        </WatchListProvider>
      </RecoilRoot>
    </SafeArea>
  );
}
