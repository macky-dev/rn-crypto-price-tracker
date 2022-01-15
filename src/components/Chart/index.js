import React from "react";
import { View, Dimensions } from "react-native";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  monotoneCubicInterpolation,
} from "@rainbow-me/animated-charts";
import {
  ChartDotContainer,
  ChartDotOuter,
  ChartDotInner,
  Container,
  YAxisLabel,
  YAxisLabelContainer,
  ChartDotYLabel,
  ChartDotXLabel,
} from "./styles";

export const { width: SIZE } = Dimensions.get("window");

const Chart = ({ chartData, chartColor }) => {
  console.log("rendering chart");

  const data = chartData.map(([x, y]) => ({ x, y }));

  const points = monotoneCubicInterpolation({ data, range: 40 });

  const formatNumber = (value, roundingPoint) => {
    if (value > 1e9) {
      return `${(value / 1e9).toFixed(roundingPoint)}B`;
    } else if (value > 1e6) {
      return `${(value / 1e6).toFixed(roundingPoint)}M`;
    } else if (value > 1e3) {
      return `${(value / 1e3).toFixed(roundingPoint)}K`;
    } else {
      return `${value.toFixed(roundingPoint)}`;
    }
  };

  const getYAxisLabelValues = () => {
    if (chartData.length) {
      const pricesArray = chartData.map((itemArray) => itemArray[1]);

      const minValue = Math.min(...pricesArray);
      const maxValue = Math.max(...pricesArray);

      const midValue = (minValue + maxValue) / 2;

      const higherMidValue = (maxValue + midValue) / 2;
      const lowerMidValue = (minValue + midValue) / 2;

      const roundingPoint = 2;

      return [
        formatNumber(maxValue, roundingPoint),
        formatNumber(higherMidValue, roundingPoint),
        formatNumber(lowerMidValue, roundingPoint),
        formatNumber(minValue, roundingPoint),
      ];
    } else {
      return [];
    }
  };

  const formatCurrentChartPrice = (value) => {
    "worklet";
    if (value === "") {
      return "";
    }

    if (value > 1e9) {
      return `${(value / 1e9).toFixed(2)}B`;
    } else if (value > 1e6) {
      return `${(value / 1e6).toFixed(2)}M`;
    } else if (value > 1e3) {
      return `${(value / 1e3).toFixed(2)}K`;
    } else {
      return `${parseFloat(value).toFixed(2)}`;
    }
  };

  const formatDateTime = (value) => {
    "worklet";
    if (value === "") {
      return "";
    }
    const selectedDate = new Date(parseInt(value));
    const date = `0${selectedDate.getDate()}`.slice(-2);
    const month = `0${selectedDate.getMonth() + 1}`.slice(-2);
    const hour = `0${selectedDate.getHours()}`.slice(-2);
    const minute = `0${selectedDate.getMinutes()}`.slice(-2);

    return `${month}/${date} ${hour}:${minute}`;
  };

  return (
    <Container>
      {/* y-axis label */}
      <YAxisLabelContainer>
        {getYAxisLabelValues().map((item, index) => {
          return <YAxisLabel key={index}>{item}</YAxisLabel>;
        })}
      </YAxisLabelContainer>

      {/* chart */}
      <ChartPathProvider
        data={{
          points,
          smoothingStrategy: "bezier",
        }}
      >
        <View>
          <ChartPath
            height={SIZE / 1.5}
            stroke={chartColor}
            strokeWidth={3}
            selectedStrokeWidth={2}
            selectedOpacity={0.9}
            width={SIZE}
          />
          <ChartDot>
            <ChartDotContainer>
              <ChartDotOuter>
                <ChartDotInner chartColor={chartColor} />
              </ChartDotOuter>

              <ChartDotYLabel format={formatCurrentChartPrice} />

              {/* x-label */}
              <ChartDotXLabel format={formatDateTime} />
            </ChartDotContainer>
          </ChartDot>
        </View>
      </ChartPathProvider>
    </Container>
  );
};

export default Chart;
