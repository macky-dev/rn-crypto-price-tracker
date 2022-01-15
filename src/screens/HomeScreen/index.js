import { useState, useEffect } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import styled from "styled-components/native";
import { coinsListRequest } from "../../services";
import CoinItem from "../../components/CoinItem";

const HeaderText = styled.Text`
  font-family: "Roboto_400Regular";
  font-size: 25px;
  letter-spacing: 1px;
  color: white;
  margin-left: 10px;
  margin-bottom: 5px;
`;

const HomeScreen = () => {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCoinsList = async (page) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const coinsData = await coinsListRequest(page);
    coinsData.length && setCoins((prevState) => [...prevState, ...coinsData]);
    setIsLoading(false);
  };

  const refetchCoinsList = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const coinsData = await coinsListRequest();
    setCoins(coinsData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCoinsList();
  }, []);

  return (
    <View>
      <HeaderText>Cryptocurrency</HeaderText>
      <FlatList
        data={coins}
        keyExtractor={(item) => `c-${item.id}`}
        renderItem={({ item }) => <CoinItem coinData={item} />}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetchCoinsList}
            tintColor="white"
          />
        }
        onEndReached={() => {
          fetchCoinsList(coins.length / 50 + 1);
        }}
      />
    </View>
  );
};

export default HomeScreen;
