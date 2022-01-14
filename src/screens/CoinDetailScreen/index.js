import { useLayoutEffect, useEffect, useState } from "react";
import { Dimensions, View, ActivityIndicator, Text } from "react-native";
import { Entypo, AntDesign, FontAwesome } from "@expo/vector-icons";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
} from "@rainbow-me/animated-charts";
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
} from "./styles";
import ChartFilterItem from "./components/ChartFilterItem";

export const { width: SIZE } = Dimensions.get("window");

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

  const fetchCoinPrices = async (selectedRangeValue) => {
    const coinPrices = await coinPricesRequest(coinId, selectedRangeValue);
    setCoinPrices(coinPrices);
  };

  useEffect(() => {
    const fetchCoinData = async () => {
      setIsLoading(true);
      const coin = await coinDetailRequest(coinId);
      setCoinData(coin);
      setIsLoading(false);
    };

    fetchCoinData();
    fetchCoinPrices(1);
  }, [coinId]);

  const toggleWatchList = () => {
    if (checkIfCoinIsWatchlisted() === false) {
      return addToWatchList(coinId);
    } else {
      return removeFromWatchList(coinId);
    }
  };

  const onSetSelectedRange = (selectedRange) => {
    setSelectedRange(selectedRange);
    fetchCoinPrices(selectedRange);
  };

  const checkIfCoinIsWatchlisted = () =>
    coinsWatchList.some((coin) => coin === coinId);

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
  } = coinData;

  const { prices } = coinPrices;

  const formatCurrentPrice = (value) => {
    "worklet";
    const price = value === "" ? current_price.usd : parseFloat(value);

    if (price < 1) {
      return `$${price}`;
    }
    return `$${price.toFixed(2)}`;
  };

  const percentageColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "#16c784";
  const chartColor = current_price.usd > prices[0][1] ? "#16c784" : "#ea3943";

  return (
    <Container>
      <ChartPathProvider
        data={{
          points: prices.map(([x, y]) => ({
            x,
            y,
          })),
        }}
      >
        <PriceContainer>
          <CurrentPriceText format={formatCurrentPrice} />
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
        <View>
          <ChartPath
            height={SIZE / 1.5}
            stroke={chartColor}
            strokeWidth={3}
            selectedStrokeWidth={2}
            selectedOpacity={0.9}
            width={SIZE}
          />
          <ChartDot style={{ backgroundColor: chartColor }} />
        </View>
      </ChartPathProvider>
    </Container>
  );
};

export default CoinDetailScreen;
