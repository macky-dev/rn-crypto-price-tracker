import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNavigator";
import CoinDetailScreen from "../screens/CoinDetailScreen";
import AddNewAssetScreen from "../screens/AddNewAssetScreen";
import { borderColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const globalScreenOptions = {
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerMode: "screen",
  };

  return (
    <Stack.Navigator
      screenOptions={globalScreenOptions}
      initialRouteName="Root"
    >
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="CoinDetail" component={CoinDetailScreen} />
      <Stack.Screen
        name="AddNewAsset"
        component={AddNewAssetScreen}
        options={{
          title: "Add New Asset",
          headerTintColor: "white",
          headerBackTitle: "Back",
          headerTitleStyle: {
            fontSize: 17,
            fontWeight: "bold",
          },
          headerStatusBarHeight: 0,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
