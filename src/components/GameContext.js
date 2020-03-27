import React from "react";
import usePersistedState from "./UsePersistedState";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 }
];

export const GameProvider = ({ children }) => {
  const [state, setPersistedState] = usePersistedState();

  const numCookies = state.numCookies;
  const purchasedItems = state.purchasedItems;

  const setAll = (numberCookies, purchItems) => {
    setPersistedState({
      ...state,
      numCookies: numberCookies,
      purchasedItems: purchItems
    });
  };

  const setNumCookies = numberCookies => {
    setPersistedState({ ...state, numCookies: numberCookies });
  };

  const setPurchasedItems = purchItems => {
    setPersistedState({ ...state, purchasedItems: purchItems });
  };

  const calculateCookiesPerSecond = purchasedItems => {
    let perSecond =  Object.keys(purchasedItems).reduce((num, itemId) => {
      const numOwned = purchasedItems[itemId];
      const item = items.find(item => item.id === itemId);
      const value = item.value;

      return num + value * numOwned;
    }, 0);
    return perSecond;
  };

  return (
    <GameContext.Provider
      value={{
        numCookies,
        setNumCookies,
        purchasedItems,
        setPurchasedItems,
        setAll,
        cookiesPerSecond: calculateCookiesPerSecond(purchasedItems)
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const GameContext = React.createContext(null);
