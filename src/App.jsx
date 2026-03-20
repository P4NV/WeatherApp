import './App.css'
// import {motion} from "motion"
import WeatherCard from "./Components/WeatherCard.jsx";

export default function App() {

    return (
    <div className="flex flex-col items-center w-screen h-screen">
        <div className="flex flex-col items-center justify-center mt-20 h-full">
            <WeatherCard />
        </div>
    </div>
  )
}

