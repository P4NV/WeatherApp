import './App.css'
// import {motion} from "motion"
import WeatherCard from "./Components/WeatherCard.jsx";

export default function App() {

    const weatherGradient = `linear-gradient(to bottom right,#475569 0%,#94a3b8 35%,#94a3b8 55%,#475569 100%)`;
    // const weatherGradient = `radial-gradient(circle at 50% -20%,#f1f5f9 0%,#cbd5e1 25%,#94a3b8 50%,#64748b 75%,#475569 100%)`;

    return (
    <div className="flex flex-col items-center w-screen h-screen"
         style={{background: weatherGradient,
                 backgroundSize: '150% 100%',
                 backgroundPosition: 'center center',
         }}>
        <div className="flex flex-col items-center w-screen">
            <h1 className="text-7xl p-10 text-white text-shadow-md text-shadow-black font-extrabold">Weatheo</h1>
        </div>
        <div className="flex flex-col items-center justify-center h-full">
            <WeatherCard />
        </div>
    </div>
  )
}

