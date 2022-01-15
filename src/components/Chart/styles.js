import styled from "styled-components/native";
import { ChartXLabel, ChartYLabel } from "@rainbow-me/animated-charts";

export const Container = styled.View`
  margin-top: 10px;
`;

export const YAxisLabelContainer = styled.View`
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  justify-content: space-between;
`;

export const YAxisLabel = styled.Text`
  color: #757575;
  font-size: 14px;
`;

export const ChartDotContainer = styled.View`
  position: absolute;
  left: -35px;
  width: 80px;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ChartDotOuter = styled.View`
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border-radius: 15px;
  background-color: white;
`;

export const ChartDotInner = styled.View`
  height: 15px;
  width: 15px;
  border-radius: 10px;
  background-color: ${(props) => props.chartColor};
`;

export const ChartDotYLabel = styled(ChartYLabel)`
  color: white;
  line-height: 22px;
  font-size: 12px;
`;

export const ChartDotXLabel = styled(ChartXLabel)`
  margin-top: 3px;
  color: #757575;
  line-height: 15px;
  font-size: 12px;
`;
