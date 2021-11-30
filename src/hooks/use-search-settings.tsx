import { useState } from "react";
import { IPossibleSettings } from "@interfaces/recommendation-settings";

function useSearchSettings(initialValue: any) {
    const [state, setState] = useState(initialValue);
  
    function setter(value: IPossibleSettings) {
      setState((prevState: any) => {
        const newState = { ...prevState, ...value };
        return newState;
      });
    }
  
    function getItem(name: string) {
      return state[name]
    }
  
    return [state, setter, getItem] as const;
  }
  
  export default useSearchSettings