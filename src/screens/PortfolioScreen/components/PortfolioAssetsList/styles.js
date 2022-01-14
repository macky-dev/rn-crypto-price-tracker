import styled from "styled-components/native";

export const HeaderContainer = styled.View`
  padding: 10px;
`;

export const InnerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const InnerLeftContainer = styled.View``;

export const Text = styled.Text`
  color: white;
`;

export const BalanceText = styled.Text`
  color: white;
  font-size: 30px;
  letter-spacing: 1px;
  font-weight: 700;
`;

export const AmountGainsText = styled.Text`
  color: ${(props) => (props.isPositiveColor ? "#16c784" : "#ea3943")};
`;

export const InnerRightContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) =>
    props.isPositiveColor ? "#16c784" : "#ea3943"};
  padding: 5px;
  border-radius: 5px;
`;

export const AssetsHeaderText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 5px;
`;

export const AddAssetButton = styled.TouchableOpacity`
  background-color: #4169e1;
  border-radius: 5px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  margin-right: 10px;
`;

export const AddAssetText = styled.Text`
  font-weight: 700;
  color: white;
`;

export const DeleteContainer = styled.Pressable`
  background-color: #ea3943;
  align-items: flex-end;
  justify-content: center;
  flex: 1;
  padding-right: 25px;
  margin-left: 20px;
  border-bottom-color: #121212;
  border-bottom-width: 1px;
`;
