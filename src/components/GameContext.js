import React from 'react';
import usePersistedState from "./UsePersistedState";

const items = [
    { id: 'cursor', name: 'Cursor', cost: 10, value: 1 },
    { id: 'grandma', name: 'Grandma', cost: 100, value: 10 },
    { id: 'farm', name: 'Farm', cost: 1000, value: 80 }
];

export const GameProvider = ({ children }) => {
    const [numCookies, setNumCookies] = usePersistedState('num-cookies', 1000);
    const [purchasedItems, setPurchasedItems] = usePersistedState(
        'purchasedItems',
        { cursor: 0, grandma: 0, farm: 0, }
    );
    
    const calculateCookiesPerSecond = purchasedItems => {
        return Object.keys(purchasedItems).reduce((num, itemId) => {
            const numOwned = purchasedItems[itemId];
            const item = items.find(item => item.id === itemId);
            const value = item.value;

            return num + value * numOwned;
        }, 0);
    };

    return (
    <GameContext.Provider value= {{
        numCookies,
        setNumCookies,
        purchasedItems,
        setPurchasedItems,
        cookiesPerSecond: calculateCookiesPerSecond(purchasedItems)
    }}>
        {children}
    </GameContext.Provider>
    );
};

export const GameContext = React.createContext(null);