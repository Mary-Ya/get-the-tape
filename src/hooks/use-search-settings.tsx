import { useState } from "react";
import { IPossibleSettings } from "../types/recommendation-settings";

function useSearchSettings(initialValue: any) {
    const [state, setState] = useState(initialValue);
  
    function setter(value: IPossibleSettings) {
      setState((prevState: any) => {
        const newState = { ...prevState, ...value };
        return newState;
      });
      console.log('setSettings: ', state);
    }
  
    function getItem(name: string) {
      return state[name]
    }
  
    return [state, setter, getItem] as const;
  }
  
  export default useSearchSettings