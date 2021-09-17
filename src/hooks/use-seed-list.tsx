import { useState } from 'react';
import { IArtist, ITrack } from '../types/track';
import { safeLocalStorage } from '../common/utils';
import useCashableState from './use-cashable-state';

type TPossibleSeeds = string | ITrack | IArtist | number;
type TSeedList = (TPossibleSeeds)[];

const useSeedList = (initialValue: TSeedList, localStorageKey: string) => {
  const [state, setState] = useCashableState(initialValue, localStorageKey, initialValue);

  const removeById = (id: string) => {
    const newSongSeeds = state.filter((i: ITrack) => i.id !== id);
    setState(newSongSeeds);
  };

  
  const removeItem = (item: string) => {
    const seedIndex = state.indexOf(item);
    const newSeedState = [...state];
    newSeedState.splice(seedIndex, 1);
    setState(newSeedState);
  };

  const addSeed = (seed: TPossibleSeeds) => {
    const newSeedState = [...state];
    newSeedState.push(seed);
    setState(newSeedState);
  };

  return [state, setState, addSeed, removeById, removeItem] as const;
}

export default useSeedList;