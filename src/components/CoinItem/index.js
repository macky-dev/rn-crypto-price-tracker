import { useNavigation } from "@react-navigation/native";
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
} from "./styles";

const formatMarketCap = (marketCap) => {
  if (marketCap > 1_000_000_000_000) {
    return `${(marketCap / 1_000_000_000_000).toFixed(3)} Tn`;
  }
  if (marketCap > 1_000_000_000) {
    return `${(marketCap / 1_000_000_000).toFixed(3)} Bn`;
  }
  if (marketCap > 1_000_000) {
    return `${(marketCap / 1_000_000).toFixed(3)} M`;
  }
  if (marketCap > 1_000) {
    return `${(marketCap / 1_000).toFixed(3)} K`;
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
  } = coinData;

  const percentageColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || "white";

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
      <RightContainer>
        <Title>{`$${current_price}`}</Title>
        <InnerContainer>
          <MarketCap>MCap {formatMarketCap(market_cap)}</MarketCap>
        </InnerContainer>
      </RightContainer>
    </Container>
  );
};

export default CoinItem;
