import { useEffect, useState } from "react";
import { getWeatherForCity } from "../API's/weatherApi.js";



export function useWeatherSearch(cityName, debounceMs = 500) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!cityName.trim()) {
            setData(null);
            setError(null);
            setLoading(false)
            return;
        }

        let abortController;
        const debounceTimer = setTimeout(() => {
              abortController = new AbortController();

            async function fetchData(){
                setLoading(true);
                setError(null);

                try {
                    const result = await getWeatherForCity(
                        cityName,
                        abortController.signal
                    );
                    setData(result);
                } catch (err) {
                    if (err.name === "AbortError") {
                        return;
                    }
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            }

            fetchData();
        }, debounceMs);

        return () => {
            clearTimeout(debounceTimer);

            if (abortController) {
                abortController.abort();
            }
        };
    }, [cityName,debounceMs]);
    return { data, loading, error };
}