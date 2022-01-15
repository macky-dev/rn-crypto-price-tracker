import { useNavigation } from "@react-navigation/native";
import { LineChart } from "react-native-chart-kit";
import {
  Container,
  Image,
  LeftContainer,
  Title,
  InnerContainer,
  Text,
  RankContainer,
  Rank,
  RightContainer,
  PriceChangeIndicator,
  MarketCap,
  ChangePercentageText,
  MidContainer,
} from "./styles";

const formatMarketCap = (marketCap) => {
  if (marketCap > 1e12) {
    return `${(marketCap / 1e12).toFixed(3)} Tn`;
  }
  if (marketCap > 1e9) {
    return `${(marketCap / 1e9).toFixed(3)} Bn`;
  }
  if (marketCap > 1e6) {
    return `${(marketCap / 1e6).toFixed(3)} M`;
  }
  if (marketCap > 1e3) {
    return `${(marketCap / 1e3).toFixed(3)} K`;
  }
  return marketCap;
};

const CoinItem = ({ coinData }) => {
  const navigation = useNavigation();

  const {
    id,
    image,
    name,
    symbol,
    price_change_percentage_24h,
    current_price,
    market_cap,
    market_cap_rank,
    sparkline_in_7d,
  } = coinData;

  const percentageColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || "white";

  const sparkline_in_1d = sparkline_in_7d.price.slice(-24);

  return (
    <Container
      onPress={() => navigation.navigate("CoinDetail", { coinId: id })}
    >
      <Image
        source={{
          uri: image,
        }}
      />
      <LeftContainer>
        <Title>{name}</Title>
        <InnerContainer>
          <RankContainer>
            <Rank>{market_cap_rank}</Rank>
          </RankContainer>
          <Text>{symbol?.toUpperCase()}</Text>
          <PriceChangeIndicator
            name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
            size={12}
            color={percentageColor}
          />
          <ChangePercentageText fontColor={percentageColor}>
            {price_change_percentage_24h?.toFixed(2)}%
          </ChangePercentageText>
        </InnerContainer>
      </LeftContainer>
      <MidContainer>
        <LineChart
          withVerticalLabels={false}
          withHorizontalLabels={false}
          withDots={false}
          withInnerLines={false}
          withVerticalLines={false}
          withOuterLines={false}
          data={{
            datasets: [
              {
                data: sparkline_in_1d,
              },
            ],
          }}
          width={70}
          height={70}
          chartConfig={{
            backgroundGradientFrom: "#121212",
            backgroundGradientFromOpacity: 1,
            backgroundGradientTo: "#121212",
            backgroundGradientToOpacity: 1,
            color: () => percentageColor,
            strokeWidth: 2,
          }}
          bezier
          style={{
            paddingRight: 0,
            flex: 1,
          }}
        />
      </MidContainer>
      <RightContainer>
        <Title>{`$${
          current_price < 1 ? current_price : current_price.toLocaleString()
        }`}</Title>
        <InnerContainer>
          <MarketCap>{formatMarketCap(market_cap)}</MarketCap>
        </InnerContainer>
      </RightContainer>
    </Container>
  );
};

export default CoinItem;
