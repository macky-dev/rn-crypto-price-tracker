import { AntDesign } from "@expo/vector-icons";
import {
  Container,
  Image,
  HeaderText,
  InnerLeftContainer,
  GrayText,
  InnerRightContainer,
  InnerMidContainer,
  ChangePercentageContainer,
  ChangePercentageText,
} from "./styles";

const PortfolioAssetsItem = ({ coinData }) => {
  const {
    image,
    name,
    symbol,
    currentPrice,
    priceChangePercentage,
    quantityBought,
  } = coinData;

  const isPriceChangePositive = priceChangePercentage >= 0;

  return (
    <Container>
      <Image
        source={{
          uri: image,
        }}
      />
      <InnerLeftContainer>
        <HeaderText>{name}</HeaderText>
        <GrayText>{symbol}</GrayText>
      </InnerLeftContainer>
      <InnerMidContainer>
        <HeaderText>{`$${currentPrice}`}</HeaderText>
        <ChangePercentageContainer>
          <AntDesign
            name={isPriceChangePositive ? "caretup" : "caretdown"}
            size={12}
            color={isPriceChangePositive ? "#16c784" : "#ea3943"}
            style={{ marginEnd: 5 }}
          />
          <ChangePercentageText positiveColor={isPriceChangePositive}>
            {priceChangePercentage.toFixed(2)}%
          </ChangePercentageText>
        </ChangePercentageContainer>
      </InnerMidContainer>
      <InnerRightContainer>
        <HeaderText>{`$${(currentPrice * quantityBought).toFixed(
          2,
        )}`}</HeaderText>
        <GrayText>
          {quantityBought} {symbol}
        </GrayText>
      </InnerRightContainer>
    </Container>
  );
};

export default PortfolioAssetsItem;
