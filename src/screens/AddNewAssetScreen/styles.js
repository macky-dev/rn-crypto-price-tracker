import { StyleSheet, Pressable } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const QuantityContainer = styled.View`
  align-items: center;
  margin-top: 50px;
  flex: 1;
`;

export const InputContainer = styled.View`
  flex-direction: row;
`;

export const QuantityInput = styled.TextInput`
  color: white;
  font-size: 90px;
`;

export const CoinText = styled.Text`
  color: grey;
  font-weight: 700;
  font-size: 20px;
  margin-top: 25px;
  margin-left: 5px;
`;

export const AddAssetButton = styled(Pressable)`
  background-color: ${(props) => (props.disabled ? "#303030" : "#4169e1")};
  border-radius: 5px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 25px;
`;

export const AddAssetText = styled.Text`
  font-weight: 700;
  color: ${(props) => (props.disabled ? "gray" : "white")};
`;

export const PriceText = styled.Text`
  color: grey;
  font-weight: 700;
  font-size: 17px;
`;

export const dropdownStyles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  item: {
    padding: 10,
    marginTop: 2,
    backgroundColor: "#1e1e1e",
    borderColor: "#444",
    borderWidth: 1,
    borderRadius: 5,
  },
  itemText: {
    color: "white",
  },
  input: {
    padding: 12,
    borderWidth: 1.5,
    borderColor: "#444",
    borderRadius: 5,
    color: "white",
    backgroundColor: "#1e1e1e",
  },
});
