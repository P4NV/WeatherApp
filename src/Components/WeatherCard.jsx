import { useState } from "react";
import { useWeatherSearch } from "./Hooks/useWeatherSearch.js";

export default function WeatherCard() {
    const [cityInput, setCityInput] = useState("");
    const {data, loading, error} = useWeatherSearch(cityInput);

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Weather Search</h1>
            <input
                type="text"
                value={cityInput}
                onChange={(e) => {setCityInput(e.target.value);}}
                placeholder="Enter city name..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            {loading && (
                <div className="mt-4 text-gray-600">
                    <p>Loading weather for {cityInput}...</p>
                </div>
            )}
            {error && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    <p className="font-semibold">Error:</p>
                    <p>{error}</p>
                </div>
            )}
            {data && !loading && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">
                        <p>{data.location.name}</p>
                        <p>{data.location.country}</p>
                    </h2>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-gray-600">Temperature</p>
                            <p className="text-2xl font-bold">
                                {data.weather.hourly.temperature_2m[0]}
                                °C
                            </p>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-gray-600">Rain</p>
                            <p className="text-2xl font-bold">
                                {data.weather.hourly.rain[0]}
                                mm
                            </p>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-gray-600">Cloud Cover</p>
                            <p className="text-2xl font-bold">
                                {data.weather.hourly.cloud_cover[0]}
                                %
                            </p>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-gray-600">Wind Speed</p>
                            <p className="text-2xl font-bold">
                                {data.weather.hourly.wind_speed_10m[0]}
                                km/h
                            </p>
                        </div>
                    </div>
                </div>
            )}
            {!cityInput && !data && !loading && (
                <div className="mt-4 text-gray-500">
                    <p>Type a city name to see the weather</p>
                </div>
            )}
        </div>
    );
}