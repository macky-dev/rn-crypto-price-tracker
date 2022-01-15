import styled from "styled-components/native";

export const HeaderCenter = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const HeaderImage = styled.Image`
  height: 30px;
  width: 30px;
  margin-right: 5px;
`;

export const HeaderText = styled.Text`
  color: white;
  font-size: 17px;
  font-weight: bold;
`;

export const HeaderLeft = styled.TouchableOpacity`
  padding: 5px;
`;

export const Container = styled.View`
  flex: 1;
`;

export const PriceContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

export const CurrentPriceText = styled.Text`
  color: white;
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

export const ChangePercentageContainer = styled.View`
  background-color: ${(props) => props.color};
  border-radius: 5px;
  padding: 5px;
  flex-direction: row;
  align-items: center;
`;

export const ChangePercentageText = styled.Text`
  margin-left: 4px;
  color: white;
  font-weight: 500;
`;

export const HeaderRight = styled.TouchableOpacity`
  padding: 5px;
  margin-right: 5px;
`;

export const FilterContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  background-color: #2b2b2b;
  border-radius: 5px;
  margin: 5px 10px;
  padding: 5px;
`;

export const DescriptionContainer = styled.View`
  background-color: #2b2b2b;
  border-radius: 5px;
  margin: 10px;
  padding: 5px;
`;

export const DescriptionText = styled.Text`
  color: white;
  font-size: 16px; ;
`;
