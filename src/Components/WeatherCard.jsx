import { useState } from "react";
import { useWeatherSearch } from "./Hooks/useWeatherSearch.js";
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export default function WeatherCard() {
    const [cityInput, setCityInput] = useState("");
    const [selectedDay, setSelectedDay] = useState(0);
    const {data, loading, error} = useWeatherSearch(cityInput);
    const [isVisible, setIsVisible] = useState(true);

    return (
        <div className="flex flex-row flex-wrap w-screen gap-20 h-full ">
            <div className="h-full w-1/4 flex justify-center items-start mx-30 pt-20 ">
                <div className="max-w-2xl max-h-2/3 p-6 shadow-lg bg-white/25 border-t-4 shadow-white/40 rounded-3xl md:overflow-auto">
                    <h1 className="text-3xl text-white font-semibold mb-4 text-shadow-xs text-shadow-mist-600">Weather Search</h1>
                    <input
                        type="text"
                        value={cityInput}
                        onChange={(e) => {setCityInput(e.target.value);}}
                        placeholder="Enter city name..."
                        className="w-full text-white font-semibold px-4 py-2 border border-gray-300 rounded-xl"
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
                            <h2 className="text-xl text-white font-semibold mb-2">
                                <p>{data.location.name}</p>
                                <hr className="max-w-3/5 mt-1"/>
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
            <div className=" flex-col justify-center items-center mr-20 mt-5 ">
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
                        <div className="flex flex-col border-t-8 rounded-4xl pr-5 bg-white/15 shadow-white/40 shadow-md  items-center justify-center my-20" >
                            {/* Day selector buttons */}
                            <div className="flex justify-center items-center bg-white/25 border-t-3 shadow-lg shadow-white/40 rounded-3xl p-2 gap-5 mb-5">
                                {[...Array(totalDays)].map((_, dayIndex) => (
                                    <button
                                        key={dayIndex}
                                        onClick={() => {
                                            setIsVisible(false);
                                            setTimeout(() => {
                                                setSelectedDay(dayIndex);
                                                setIsVisible(true);
                                            }, 150);
                                        }}
                                        className={`transition-all duration-100 ease-in px-4 py-1.5 rounded-2xl text-center ${
                                            selectedDay === dayIndex
                                                ? 'transition-colors duration-200 ease-in bg-blue-500 border-t-3 border-black text-white'
                                                : 'bg-white/60 border-b-3 hover:bg-blue-500/50 hover:border-t-3 hover:border-b-0'
                                        }`}
                                    >
                                        {dayIndex === 0 ? 'Today' : `Day ${dayIndex + 1}`}
                                    </button>
                                ))}
                            </div>
                            <div className={`transition-opacity duration-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                                <LineChart width={750} height={320} data={chartData}>
                                    <XAxis stroke="white" dataKey="time" />
                                    <YAxis stroke="white" />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="temp"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                    />
                                </LineChart>
                            </div>
                        </div>

                    );
                })()}
            </div>
        </div>
    );
}