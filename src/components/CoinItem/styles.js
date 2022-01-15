import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

export const Container = styled(TouchableOpacity)`
  padding: 10px;
  border-bottom-width: 0.3px;
  border-bottom-color: #282828;
  flex-direction: row;
`;

export const Image = styled.Image`
  height: 30px;
  width: 30px;
  align-self: center;
`;

export const LeftContainer = styled.View`
  flex-direction: column;
  padding-left: 10px;
  flex: 1.5;
  justify-content: center;
`;

export const Title = styled.Text`
  font-weight: bold;
  color: white;
  margin-bottom: 3px;
`;

export const InnerContainer = styled.View`
  flex-direction: row;
`;

export const Text = styled.Text`
  color: white;
  margin-right: 5px;
`;

export const RankContainer = styled.View`
  padding-left: 5px;
  padding-right: 5px;
  background-color: #585858;
  border-radius: 5px;
  margin-right: 5px;
`;

export const Rank = styled.Text`
  color: white;
  font-weight: bold;
`;

export const RightContainer = styled.View`
  margin-left: auto;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
  flex: 1;
`;

export const PriceChangeIndicator = styled(AntDesign)`
  align-self: center;
  margin-right: 5px;
`;

export const MarketCap = styled.Text`
  color: white;
`;

export const ChangePercentageText = styled.Text`
  color: ${(props) => props.fontColor};
`;

export const MidContainer = styled.View`
  align-items: center;
`;
