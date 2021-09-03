import React, { useState } from 'react';
import { safeLocalStorage } from '../common/utils';
import { IArtist, ITrack } from '../types/track';

const useCashableState = (initialValue: (string | ITrack | IArtist | number | boolean)[], localStorageKey: string) => {
    let savedValue;
    try {
      savedValue = safeLocalStorage.getItem(localStorageKey);
    } catch (e) {
      console.warn(e);
    }

    const [state, setState] = useState(savedValue ? savedValue : initialValue);

    function setter(value: (string | number | ITrack | IArtist)[]) {
      safeLocalStorage.setItem(localStorageKey, value);
      setState(value);
    }
    
    return [state, setter] as const;
}
  
export {
    useCashableState
}