import styled from "styled-components/native";

export const Image = styled.Image`
  height: 30px;
  width: 30px;
  align-self: center;
`;

export const Container = styled.View`
  padding: 15px;
  flex-direction: row;
  background-color: #121212;
`;

export const InnerLeftContainer = styled.View`
  margin-left: 10px;
`;

export const GrayText = styled.Text`
  color: gray;
`;

export const HeaderText = styled.Text`
  color: white;
  font-weight: 600;
`;

export const InnerMidContainer = styled.View`
  margin-left: auto;
  align-items: flex-end;
`;

export const InnerRightContainer = styled.View`
  margin-left: auto;
  align-items: flex-end;
`;

export const ChangePercentageContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ChangePercentageText = styled.Text`
  color: ${(props) => (props.positiveColor ? "#16c784" : "#ea3943")};
`;
