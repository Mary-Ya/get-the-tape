import { useState } from "react";
import { genresFilter } from "../components/GenresList/utils";

const UseList = (initialValue: any[]) => {
  const [data, useData] = useState(initialValue);

  const setFiltered = (newData: any[], query: string) => {
    useData(newData.filter((i: string) => (genresFilter(i, query))));
  };

  return [data, useData, setFiltered] as const;
}

export default UseList;