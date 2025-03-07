import { useState, useEffect } from "react";
export default function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchDat = async () => {
      setLoading(true);
      const abortController = new AbortController();
      options.signal = abortController.signal;
      try {
        const response = await fetch(url, { ...options });
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setData(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDat();
    return () => abortController.abort();
  }, [url]);
  return { data, loading, error };
}
