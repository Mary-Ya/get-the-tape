import { useCallback, useEffect, useState } from "react";
import { IAnyList } from "@interfaces/common";
import useAsync from "@hooks/use-async";

// Hook
const useAsyncList = (fetchList, immediate = true) => {
    const { fetch, status, data, error } = useAsync(() => (fetchList()), immediate);

    
  const setPage = () => {
    return (page: number) => {
      const offset = data.limit * page;
      console.log(page)
      fetch(props.access_token, offset)
    }
  }
    
    return { fetch, status, list: data, error };
};

export default useAsyncList;