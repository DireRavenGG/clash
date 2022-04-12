import { useState, createContext, useContext } from "react";

const initialState = {
  data: [],
};

const GlobalContext = createContext<any>(null);

export const GlobalState = (props: any) => {
  const [globalState, setGlobalState] = useState<any>(initialState);

  const updateGlobalState = (key: any, newValue: any) => {
    setGlobalState((oldState: any) => {
      if (oldState[key] !== newValue) {
        const newState = { ...oldState };
        newState[key] = newValue;
        return newState;
      } else {
        return oldState;
      }
    });
  };
  return (
    <GlobalContext.Provider value={[globalState, updateGlobalState]}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
