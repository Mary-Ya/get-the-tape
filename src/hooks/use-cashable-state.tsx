import { useState } from 'react';
import { IArtist, ITrack } from '../types/track';
import { safeLocalStorage } from '../common/utils';

type TPossibleCashableStateValueTypes = (string | ITrack | IArtist | number)[] | boolean | string | null;

const useCashableState = (initialValue: TPossibleCashableStateValueTypes, localStorageKey: string) => {
    let savedValue;
    try {
      savedValue = safeLocalStorage.getItem(localStorageKey) || null;
    } catch (e) {
      console.warn(e);
    }

    if (!savedValue && initialValue) {
      safeLocalStorage.setItem(localStorageKey, initialValue);
    }
  
    const [state, setState] = useState(initialValue ? initialValue : savedValue );

    function setter(value: TPossibleCashableStateValueTypes) {
      safeLocalStorage.setItem(localStorageKey, value);
      setState(value);
    }
    
    return [state, setter] as const;
}
  
export default useCashableState;