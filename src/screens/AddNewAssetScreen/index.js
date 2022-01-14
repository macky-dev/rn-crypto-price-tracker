import { useState, useEffect } from "react";
import SearchableDropdown from "react-native-searchable-dropdown";
import { useRecoilState } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { allPortfolioBoughtAssetsInStorage } from "../../atoms/PortfolioAssets";
import { allCoinsRequest, coinDetailRequest } from "../../services";
import {
  CoinText,
  Container,
  dropdownStyles,
  InputContainer,
  QuantityInput,
  QuantityContainer,
  AddAssetButton,
  AddAssetText,
  PriceText,
} from "./styles";

const AddNewAssetScreen = ({ navigation }) => {
  const [allCoins, setAllCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCoinId, setSelectedCoinId] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [boughtQuantity, setBoughtQuantity] = useState("");
  const [assetsInStorage, setAssetsInStorage] = useRecoilState(
    allPortfolioBoughtAssetsInStorage,
  );
  1;

  const isQuantityEntered = () => boughtQuantity === "";

  const fetchAllCoins = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const coins = await allCoinsRequest();
    setAllCoins(coins);
    setIsLoading(false);
  };

  const fetchCoinInfo = async (coinId) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const coinInfo = await coinDetailRequest(coinId);
    setSelectedCoin(coinInfo);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllCoins();
  }, []);

  useEffect(() => {
    if (selectedCoinId) {
      fetchCoinInfo(selectedCoinId);
    }
  }, [selectedCoinId]);

  const onAddNewAsset = async () => {
    const newAsset = {
      id: selectedCoin.id,
      uuid: `${selectedCoin.id}-${uuid.v4()}`,
      name: selectedCoin.name,
      image: selectedCoin.image.small,
      symbol: selectedCoin.symbol.toUpperCase(),
      quantityBought: parseFloat(boughtQuantity),
      priceBought: selectedCoin.market_data.current_price.usd,
    };

    const updatedAssets = [...assetsInStorage, newAsset];
    setIsLoading(true);
    await AsyncStorage.setItem(
      "@portfolio_assets",
      JSON.stringify(updatedAssets),
    );
    setAssetsInStorage(updatedAssets);
    setIsLoading(false);
    navigation.goBack();
  };

  const deleteTest = async () => {
    await AsyncStorage.removeItem("@portfolio_assets");
  };

  return (
    <Container>
      <SearchableDropdown
        items={allCoins}
        onItemSelect={(item) => setSelectedCoinId(item.id)}
        containerStyle={dropdownStyles.container}
        itemStyle={dropdownStyles.item}
        itemTextStyle={dropdownStyles.itemText}
        resetValue={false}
        placeholder={selectedCoinId || "Select a Coin..."}
        placeholderTextColor="white"
        textInputProps={{
          underlineColorAndroid: "transparent",
          style: dropdownStyles.input,
        }}
      />
      {selectedCoinId && (
        <>
          <QuantityContainer>
            <InputContainer>
              <QuantityInput
                placeholder="0"
                keyboardType="numeric"
                value={boughtQuantity}
                onChangeText={setBoughtQuantity}
              ></QuantityInput>
              <CoinText>{selectedCoin?.symbol.toUpperCase()}</CoinText>
            </InputContainer>
            <PriceText>
              ${selectedCoin?.market_data.current_price.usd} per coin
            </PriceText>
          </QuantityContainer>
          <AddAssetButton
            disabled={isQuantityEntered()}
            onPress={onAddNewAsset}
          >
            <AddAssetText disabled={isQuantityEntered()}>
              Add New Asset
            </AddAssetText>
          </AddAssetButton>
        </>
      )}
    </Container>
  );
};

export default AddNewAssetScreen;
