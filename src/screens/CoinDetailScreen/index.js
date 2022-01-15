import { useLayoutEffect, useEffect, useState } from "react";
import { ActivityIndicator, Text } from "react-native";
import { Entypo, AntDesign, FontAwesome } from "@expo/vector-icons";
import { coinDetailRequest, coinPricesRequest } from "../../services";
import { useWatchList } from "../../contexts/WatchListContext";
import {
  HeaderLeft,
  HeaderCenter,
  HeaderImage,
  HeaderText,
  Container,
  CurrentPriceText,
  PriceContainer,
  ChangePercentageContainer,
  ChangePercentageText,
  HeaderRight,
  FilterContainer,
  DescriptionContainer,
  DescriptionText,
} from "./styles";
import ChartFilterItem from "./components/ChartFilterItem";
import Chart from "../../components/Chart";

const filterDaysArray = [
  { filterDay: "1", filterText: "24h" },
  { filterDay: "7", filterText: "7d" },
  { filterDay: "30", filterText: "30d" },
  { filterDay: "365", filterText: "1y" },
  { filterDay: "max", filterText: "All" },
];

const CoinDetailScreen = ({ navigation, route }) => {
  const [coinData, setCoinData] = useState(null);
  const [coinPrices, setCoinPrices] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRange, setSelectedRange] = useState("1");
  const { coinsWatchList, addToWatchList, removeFromWatchList } =
    useWatchList();
  const { coinId } = route.params;

  const fetchCoinData = async () => {
    setIsLoading(true);
    const coin = await coinDetailRequest(coinId);
    setCoinData(coin);
    setIsLoading(false);
  };

  const fetchCoinPrices = async (selectedRangeValue) => {
    const fetchedCointPrices = await coinPricesRequest(
      coinId,
      selectedRangeValue,
    );
    setCoinPrices(fetchedCointPrices);
  };

  const onSetSelectedRange = (selectedRange) => {
    setSelectedRange(selectedRange);
    fetchCoinPrices(selectedRange);
  };

  const checkIfCoinIsWatchlisted = () =>
    coinsWatchList.some((coin) => coin === coinId);

  const toggleWatchList = () => {
    if (checkIfCoinIsWatchlisted() === false) {
      return addToWatchList(coinId);
    } else {
      return removeFromWatchList(coinId);
    }
  };

  useEffect(() => {
    fetchCoinData();
    fetchCoinPrices(1);
  }, [coinId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: coinData?.name || "",
      headerStyle: { backgroundColor: "#121212", height: 50 },
      headerTitleAlign: "center",
      headerStatusBarHeight: 0,
      headerShadowVisible: false,
      headerLeft: () => (
        <HeaderLeft onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={30} color="white" />
        </HeaderLeft>
      ),
      headerTitle: () => (
        <HeaderCenter>
          <HeaderImage source={{ uri: coinData?.image.small }} />
          <HeaderText>
            {coinData?.name || ""} ({coinData?.symbol.toUpperCase() || ""})
          </HeaderText>
        </HeaderCenter>
      ),
      headerRight: () => (
        <HeaderRight onPress={toggleWatchList}>
          <FontAwesome
            name={checkIfCoinIsWatchlisted() ? "star" : "star-o"}
            size={25}
            color={checkIfCoinIsWatchlisted() ? "#FFBF00" : "white"}
          />
        </HeaderRight>
      ),
    });
  }, [navigation, coinData, coinsWatchList]);

  if (isLoading || !coinData || !coinPrices) {
    return <ActivityIndicator size="large" />;
  }

  const {
    market_data: { current_price, price_change_percentage_24h },
    description,
  } = coinData;

  const { prices } = coinPrices;

  const percentageColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "#16c784";

  const chartColor = current_price.usd > prices[0][1] ? "#16c784" : "#ea3943";

  return (
    <Container>
      <PriceContainer>
        <CurrentPriceText>
          {`$${
            current_price.usd < 1
              ? current_price.usd
              : current_price.usd.toLocaleString()
          }`}
        </CurrentPriceText>
        <ChangePercentageContainer color={percentageColor}>
          <AntDesign
            name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
            size={12}
            color="white"
          />
          <ChangePercentageText>
            {Math.abs(price_change_percentage_24h).toFixed(2)}%
          </ChangePercentageText>
        </ChangePercentageContainer>
      </PriceContainer>

      {/* Chart Filters */}
      <FilterContainer>
        {filterDaysArray.map((item) => (
          <ChartFilterItem
            filterValue={item.filterDay}
            filterText={item.filterText}
            selectedRange={selectedRange}
            setSelectedRange={onSetSelectedRange}
            key={item.filterText}
          />
        ))}
      </FilterContainer>

      {/* Chart */}
      {coinPrices && <Chart chartData={prices} chartColor={chartColor} />}

      {/* Coin description */}
      <DescriptionContainer>
        <DescriptionText numberOfLines={15}>{description.en}</DescriptionText>
      </DescriptionContainer>
    </Container>
  );
};

export default CoinDetailScreen;
