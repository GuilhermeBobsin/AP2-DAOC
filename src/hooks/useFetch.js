import { useState, useEffect, useRef } from 'react';

export default function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const result = await fetcher();
        if (!mounted.current) return;
        setData(result);
      } catch (err) {
        if (!mounted.current) return;
        setError(err);
      } finally {
        if (!mounted.current) return;
        setLoading(false);
      }
    })();

    return () => {
      mounted.current = false;
    };
  }, deps);

  return { data, loading, error };
}
