import React from "react";

const usePersistedState = (stateObj = {}) => {
    let byebyeTime = ''; //******************************************
    window.onload = function(){
        //get stored time(last unMounted time) in local storage

        let timeOnLoad = new Date();
        console.log('******* Time on Load ******** ', timeOnLoad);

    //*********************** ELAPSED SECONDS ***********************
        //calculate how many cookies would have added up
        function timeDiff() {
            let calculation = byebyeTime - timeOnLoad
            calculation /=1000;
            let secondsElapsed = Math.round(calculation);
            console.log('Seconds elapsed: ', secondsElapsed);
        };
        console.log('**************timeDiff: ', timeDiff);

        //then add it to numCookies
            //check what bought and make calculations for seconds elapsed

        //destroy last unMounted time
        window.localStorage.removeItem(unmounted);
    //****************************************************************
    }

  // if first time, then local storage would be undefined
  if (
    window.localStorage.getItem("state") === undefined ||
    window.localStorage.getItem("state") === null, 

    window.localStorage.getItem("unmounted") === undefined ||
    window.localStorage.getItem("unmounted") === null //***************
  ) {

    // default state
    console.log("Default state added");
    stateObj = {
      numCookies: 1000,
      purchasedItems: { cursor: 0, grandma: 0, farm: 0 }
    };
    window.localStorage.setItem('unmounted', ''); //*****

  } else {
    //------------------------------------------------------------- NORMAL
    stateObj = JSON.parse(window.localStorage.getItem("state"));

    //------------------------------------------------------------- RESET
    // stateObj = {numCookies: 1000,
    //     purchasedItems: { cursor: 0, grandma: 0, farm: 0 }
    // };
    //     unmounted = ''
    //-------------------------------------------------------------
    console.log("**Getting stateObj from local storage: ", stateObj);
  }

  const [state, setState] = React.useState(stateObj);
  const [unmounted, setUnmounted] = React.useState(unmounted); //************************

  const setPersistedState = givenStateObj => {
    console.log("*Setting persisted state: ", givenStateObj);

    window.localStorage.setItem("state", JSON.stringify(givenStateObj));
    setState(givenStateObj);

    //*********************** STORE UNMOUNT DATE IN LOCAL STORAGE ***********************
    window.addEventListener('beforeunload', (event) => {
        window.localStorage.getItem("unmounted"); 
        event.returnValue = `Unmounting`;
        console.log('Unmounting');
    
        let unmountTime = new Date();
        byebyeTime = unmountTime;
        console.log('~~~~ Time unmounted ~~~~ ', unmountTime);

        window.localStorage.setItem("unmounted", JSON.stringify(unmountTime));
        setUnmounted(unmounted);
        console.log('unmounted: ', unmounted);
    });
    //************************************************************************************
  };

  return [state, setPersistedState];
};

console.log("localStorage: ", window.localStorage);
export default usePersistedState;
