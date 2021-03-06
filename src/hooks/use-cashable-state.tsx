import { useState } from "react";
import { IArtist, ITrack } from "@interfaces/track";
import { safeLocalStorage } from "@common/utils";

type TPossibleCashableStateValueTypes =
  | (string | ITrack | IArtist | number)[]
  | boolean
  | string
  | null;

const isNotEmpty = (value: TPossibleCashableStateValueTypes) => {
  const isArray = value && Array.isArray(value);
  return isArray ? value.length > 0 : Boolean(value);
};

const useCashableState = (
  initialValue: TPossibleCashableStateValueTypes,
  localStorageKey: string,
  defaultValue?: TPossibleCashableStateValueTypes
) => {
  let savedValue;
  const initialIsNotEmpty = isNotEmpty(initialValue);

  try {
    savedValue = safeLocalStorage.getItem(localStorageKey) || null;
  } catch (e) {
    console.warn(e);
  }

  if (!savedValue && initialIsNotEmpty) {
    safeLocalStorage.setItem(localStorageKey, initialValue);
  }

  const firstValue = initialIsNotEmpty
    ? initialValue
    : savedValue
      ? savedValue
      : defaultValue;
  safeLocalStorage.setItem(localStorageKey, firstValue);
  const [state, setState] = useState(firstValue);

  function setter(value: TPossibleCashableStateValueTypes) {
    safeLocalStorage.setItem(localStorageKey, value);
    setState(value);
  }

  return [state, setter] as const;
};

export default useCashableState;
