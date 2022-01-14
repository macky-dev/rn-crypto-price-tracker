import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const SafeArea = ({ children }) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#121212" }}
        edges={["right", "top", "left"]}
      >
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SafeArea;
