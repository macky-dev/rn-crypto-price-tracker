import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WatchListContext = createContext();

export const useWatchList = () => useContext(WatchListContext);

const WatchListProvider = ({ children }) => {
  const [coinsWatchList, setCoinsWatchList] = useState([]);

  const fetchWatchList = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@coinsWatchList");
      setCoinsWatchList(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (e) {
      console.warn(e.message);
    }
  };

  useEffect(() => {
    fetchWatchList();
  }, []);

  const addToWatchList = async (coinId) => {
    try {
      const newWatchList = [...coinsWatchList, coinId];
      await AsyncStorage.setItem(
        "@coinsWatchList",
        JSON.stringify(newWatchList),
      );
      setCoinsWatchList(newWatchList);
    } catch (e) {
      console.warn(e.message);
    }
  };

  const removeFromWatchList = async (coinId) => {
    try {
      const updatedWatchList = coinsWatchList.filter((coin) => coin !== coinId);
      await AsyncStorage.setItem(
        "@coinsWatchList",
        JSON.stringify(updatedWatchList),
      );
      setCoinsWatchList(updatedWatchList);
    } catch (e) {
      console.warn(e.message);
    }
  };

  return (
    <WatchListContext.Provider
      value={{ coinsWatchList, addToWatchList, removeFromWatchList }}
    >
      {children}
    </WatchListContext.Provider>
  );
};

export default WatchListProvider;
