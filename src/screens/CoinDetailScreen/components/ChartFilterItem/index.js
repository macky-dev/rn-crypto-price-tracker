import { memo } from "react";
import styled from "styled-components/native";

const PressableContainer = styled.Pressable`
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${(props) => (props.selected ? "#1e1e1e" : "transparent")};
`;

const FilterText = styled.Text`
  color: ${(props) => (props.selected ? "white" : "grey")};
`;

const ChartFilterItem = (props) => {
  const { filterValue, filterText, selectedRange, setSelectedRange } = props;
  const isFilterSelected = filterValue === selectedRange;

  return (
    <PressableContainer
      selected={isFilterSelected}
      onPress={() => setSelectedRange(filterValue)}
    >
      <FilterText selected={isFilterSelected}>{filterText}</FilterText>
    </PressableContainer>
  );
};

export default memo(ChartFilterItem);
