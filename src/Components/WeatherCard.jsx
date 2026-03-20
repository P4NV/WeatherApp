import { useState } from "react";
import { useWeatherSearch } from "./Hooks/useWeatherSearch.js";
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export default function WeatherCard() {
    const [cityInput, setCityInput] = useState("");
    const [selectedDay, setSelectedDay] = useState(0);
    const {data, loading, error} = useWeatherSearch(cityInput);

    return (
        <div className="flex flex-col flex-wrap w-screen h-full justify-center">
            <div className="h-full w-1/4 flex justify-center items-start p-5 ">
                <div className="max-w-2xl max-h-2/4  p-6 border-2 rounded-3xl shadow-2xl shadow-red-900 md:overflow-auto">
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
                            <div className="grid grid-cols-2 gap-4 mt-4 ">
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
            </div>
        {/* CHART COMPONENT */}
            <div className="max-w-3xl flex-col ">
                {data && !loading && (() => {
                    // Get total days available
                    const totalHours = data.weather.hourly.time.length;
                    const totalDays = Math.ceil(totalHours / 24);

                    // Filter data for selected day (24 hours per day)
                    const startIndex = selectedDay * 24;
                    const endIndex = startIndex + 24;

                    const chartData = data.weather.hourly.time
                        .slice(startIndex, endIndex)
                        .map((time, index) => ({
                            time: time.split('T')[1], // Just show "14:00" instead of full date
                            temp: data.weather.hourly.temperature_2m[startIndex + index]
                        }));

                    return (
                        <div className="flex flex-col items-center  " >
                            {/* Day selector buttons */}
                            <div className="flex justify-center gap-4 mb-5">
                                {[...Array(totalDays)].map((_, dayIndex) => (
                                    <button
                                        key={dayIndex}
                                        onClick={() => setSelectedDay(dayIndex)}
                                        className={`px-4 py-2 rounded-lg ${
                                            selectedDay === dayIndex
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-200 hover:bg-gray-300'
                                        }`}
                                    >
                                        {dayIndex === 0 ? 'Today' : `Day ${dayIndex + 1}`}
                                    </button>
                                ))}
                            </div>

                            <LineChart width={700} height={300} data={chartData}>
                                <XAxis dataKey="time" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={2} />
                            </LineChart>
                        </div>

                    );
                })()}
            </div>
        </div>
    );
}