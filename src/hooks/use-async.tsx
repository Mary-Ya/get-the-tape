import { useCallback, useEffect, useState } from "react";

// Hook
const useAsync = (getAsyncFunction, immediate = true) => {
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState(null);

    const [data, setData] = useState(null);
    // The fetch function wraps asyncFunction and
    // handles setting state for pending, value, and error.
    // useCallback ensures the below useEffect is not called
    // on every render, but only if asyncFunction changes.
    const fetch = useCallback(() => {
      setStatus("pending");
      setData(null);
      setError(null);
      return getAsyncFunction()
        .then((response: any) => {
          setData(response);
          setStatus("success");
        })
        .catch((error: any) => {
          setError(error);
          setStatus("error");
        });
    }, [asyncFunction]);
    // Call fetch if we want to fire it right away.
    // Otherwise fetch can be called later, such as
    // in an onClick handler.
    useEffect(() => {
      if (immediate) {
        fetch();
      }
    }, [fetch, immediate]);
    return { fetch, status, data, error };
};
  
export default useAsync;