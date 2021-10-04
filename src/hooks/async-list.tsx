import { useCallback, useEffect, useState } from "react";

// Hook
const useAsyncList = (asyncFunction, immediate = true) => {
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState(null);

    const [list, setList] = useState(null);
    // The fetch function wraps asyncFunction and
    // handles setting state for pending, value, and error.
    // useCallback ensures the below useEffect is not called
    // on every render, but only if asyncFunction changes.
    const fetch = useCallback(() => {
      setStatus("pending");
      setList(null);
      setError(null);
      return asyncFunction()
        .then((response) => {
            setList(response);
          setStatus("success");
        })
        .catch((error) => {
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
    return { fetch, status, list, error };
};
  
export default useAsyncList;