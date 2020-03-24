import React from "react";

const usePersistedState = (propertyName, value) => {
    console.log("In usePersistedState")
    const [cookieValue, setCookieValue] = React.useState(() => {
        const continuous = typeof window !== 'undefined' && window.localStorage.getItem(propertyName);
        
        return continuous !== null ? JSON.parse(continuous) : value;
    });

    React.useEffect(() => {
        console.log("In usePersistedState useEffect")
        window.localStorage.setItem(propertyName, JSON.stringify(cookieValue));
        return () => {
            console.log("In usePersistedState Closing")
            window.localStorage.setItem(propertyName, JSON.stringify(cookieValue));
        }
    }, [propertyName, value]);

    return [cookieValue, setCookieValue];
}
console.log('localStorage: ', window.localStorage);
export default usePersistedState;

//use persisted state + local storage  MAYBE USE window.localstorage
//store date then calculate how much time passed to calculate how many cookies
//to add. Review: Use effect, Use context, Set state videos.

//JSON stringify.value THEN parse for .get