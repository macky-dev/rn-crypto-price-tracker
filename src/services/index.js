import axios from "axios";

export const coinsListRequest = async (page = 1) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${page}&sparkline=true&price_change_percentage=24h`,
    );
    return response.data;
  } catch (e) {
    console.warn(e.message);
  }
};

export const coinsListByIdRequest = async (coinsId, page = 1) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinsId}&order=market_cap_desc&per_page=50&page=${page}&sparkline=true&price_change_percentage=24h`,
    );
    return response.data;
  } catch (e) {
    console.warn(e.message);
  }
};

export const coinDetailRequest = async (coinId) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false'`,
    );
    return response.data;
  } catch (e) {
    console.warn(e.message);
  }
};

export const coinPricesRequest = async (coinId, daysFilter) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${daysFilter}&interval=hourly`,
    );
    return response.data;
  } catch (e) {
    console.warn(e.message);
  }
};

export const allCoinsRequest = async () => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/list?include_platform=false`,
    );
    return response.data;
  } catch (e) {
    console.warn(e.message);
  }
};
