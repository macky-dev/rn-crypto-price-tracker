import { atom, selector } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { coinsListByIdRequest } from "../services";

export const allPortfolioBoughtAssets = selector({
  key: "allPortfolioBoughtAssets",
  get: async () => {
    const jsonValue = await AsyncStorage.getItem("@portfolio_assets");
    return jsonValue !== null ? JSON.parse(jsonValue) : [];
  },
});

export const allPortfolioBoughtAssetsFromAPI = selector({
  key: "allPortfolioBoughtAssetsFromAPI",
  get: async ({ get }) => {
    const boughtPortfolioAssets = get(allPortfolioBoughtAssetsInStorage);
    const assetsMarketData = await coinsListByIdRequest(
      boughtPortfolioAssets.map((asset) => asset.id).join(","),
    );

    const boughtAssets = boughtPortfolioAssets.map((asset) => {
      const assetMarketData = assetsMarketData.filter(
        (item) => item.id === asset.id,
      )[0];
      return {
        ...asset,
        currentPrice: assetMarketData.current_price,
        priceChangePercentage: assetMarketData.price_change_percentage_24h,
      };
    });
    return boughtAssets.sort(
      (item1, item2) =>
        item1.quantityBought * item1.currentPrice <
        item2.quantityBought * item2.currentPrice,
    );
  },
});

export const allPortfolioAssets = atom({
  key: "allPortfolioAssets",
  default: allPortfolioBoughtAssetsFromAPI,
});

export const allPortfolioBoughtAssetsInStorage = atom({
  key: "allPortfolioBoughtAssetsInStorage",
  default: allPortfolioBoughtAssets,
});
