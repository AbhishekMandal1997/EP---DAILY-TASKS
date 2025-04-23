import { useState, useEffect, useRef } from "react";

const TTL = 5 * 60 * 1000; 

export function useFetch(url, options = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const controllerRef = useRef(null);

    const refetch = () => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            const key = `fetch::${url}`;
            const now = Date.now();

            try {
                controllerRef.current = new AbortController();
                const res = await fetch(url, {
                    ...options,
                    signal: controllerRef.current.signal,
                });
                const result = await res.json();
                sessionStorage.setItem(key, JSON.stringify({ data: result, ts: now }));
                setData(result);
            } catch (err) {
                if (err.name !== "AbortError") setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData(); 
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            const key = `fetch::${url}`;
            const now = Date.now();

            const cached = sessionStorage.getItem(key);
            if (cached) {
                const { data, ts } = JSON.parse(cached);
                if (now - ts < TTL) {
                    setData(data);
                    setLoading(false);
                    return;
                }
            }

            try {
                controllerRef.current = new AbortController();
                const res = await fetch(url, {
                    ...options,
                    signal: controllerRef.current.signal,
                });
                const result = await res.json();
                sessionStorage.setItem(key, JSON.stringify({ data: result, ts: now }));
                setData(result);
            } catch (err) {
                if (err.name !== "AbortError") setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            if (controllerRef.current) controllerRef.current.abort();
        };
    }, [url]);

    return { data, error, loading, refetch };
}
