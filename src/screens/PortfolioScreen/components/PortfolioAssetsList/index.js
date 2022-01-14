import { useNavigation } from "@react-navigation/native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useRecoilValue, useRecoilState } from "recoil";
import { SwipeListView } from "react-native-swipe-list-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  allPortfolioAssets,
  allPortfolioBoughtAssetsInStorage,
} from "../../../../atoms/PortfolioAssets";
import {
  HeaderContainer,
  InnerContainer,
  InnerLeftContainer,
  BalanceText,
  Text,
  AmountGainsText,
  InnerRightContainer,
  AssetsHeaderText,
  AddAssetButton,
  AddAssetText,
  DeleteContainer,
} from "./styles";
import PortfolioAssetsItem from "../PortfolioAssetsItem";

const PortfolioAssetsList = () => {
  const navigation = useNavigation();
  const assets = useRecoilValue(allPortfolioAssets);
  const [storageAssets, setStorageAssets] = useRecoilState(
    allPortfolioBoughtAssetsInStorage,
  );

  const getCurrentBalance = () => {
    return assets
      .reduce(
        (total, asset) => total + asset.currentPrice * asset.quantityBought,
        0,
      )
      .toFixed(2);
  };

  const getCurrentValueChange = () => {
    const currentBalance = getCurrentBalance();
    const boughtBalance = assets.reduce(
      (total, asset) => total + asset.priceBought * asset.quantityBought,
      0,
    );
    return (currentBalance - boughtBalance).toFixed(2);
  };

  const getCurrentPercentageChange = () => {
    const currentBalance = getCurrentBalance();
    const boughtBalance = assets.reduce(
      (total, asset) => total + asset.priceBought * asset.quantityBought,
      0,
    );
    return (
      ((currentBalance - boughtBalance) / boughtBalance) * 100 || 0
    ).toFixed(2);
  };

  const isPositiveChange = getCurrentPercentageChange() >= 0;

  const onDeleteAsset = async ({ item }) => {
    const newAssets = storageAssets.filter((coin) => coin.uuid !== item.uuid);
    await AsyncStorage.setItem("@portfolio_assets", JSON.stringify(newAssets));
    setStorageAssets(newAssets);
  };

  const renderDeleteItem = (data) => {
    return (
      <DeleteContainer onPress={() => onDeleteAsset(data)}>
        <FontAwesome name="trash-o" size={25} color="white" />
      </DeleteContainer>
    );
  };

  return (
    <SwipeListView
      data={assets}
      renderItem={({ item }) => <PortfolioAssetsItem coinData={item} />}
      renderHiddenItem={(data) => renderDeleteItem(data)}
      rightOpenValue={-75}
      disableRightSwipe
      closeOnRowPress
      keyExtractor={(item) => item.uuid}
      ListHeaderComponent={
        <HeaderContainer>
          <InnerContainer>
            <InnerLeftContainer>
              <Text>Current Balance</Text>
              <BalanceText>{`$${getCurrentBalance()}`}</BalanceText>
              <AmountGainsText isPositiveColor={isPositiveChange}>
                {`$${getCurrentValueChange()} (All Time)`}
              </AmountGainsText>
            </InnerLeftContainer>
            <InnerRightContainer isPositiveColor={isPositiveChange}>
              <AntDesign
                name={isPositiveChange ? "caretup" : "caretdown"}
                size={12}
                color="white"
                style={{ marginEnd: 5 }}
              />
              <Text>{`${getCurrentPercentageChange()}%`}</Text>
            </InnerRightContainer>
          </InnerContainer>
          <AssetsHeaderText>Your Assets</AssetsHeaderText>
        </HeaderContainer>
      }
      ListFooterComponent={
        <AddAssetButton onPress={() => navigation.navigate("AddNewAsset")}>
          <AddAssetText>Add New Asset</AddAssetText>
        </AddAssetButton>
      }
    />
  );
};

export default PortfolioAssetsList;
