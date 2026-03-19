import './App.css'
// import {motion} from "motion"
import WeatherCard from "./Components/WeatherCard.jsx";

export default function App() {

    return (
    <div className="flex flex-col items-center  ">
        <h1 className="mb-10">My App</h1>
        <WeatherCard />
    </div>
  )
}

