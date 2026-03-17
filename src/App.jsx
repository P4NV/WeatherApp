import './App.css'
// import {motion} from "motion"
import WeatherCard from "./Components/WeatherCard.jsx";
import {useState} from "react";

export default function App() {
    const [Value, SetValue] = useState("")

    return (
    <div className="flex flex-col items-center  ">
        <h1 className="mb-10">My App</h1>
            <form className="flex flex-col items-center w-2/3 h-screen mt-4">
                <label htmlFor="Name" id="Value">City: </label>
                <input className="border-2 w-1/3"
                       type="text"
                       id="Name"
                       value={Value}
                       onChange={(e) => SetValue(e.target.value)}
                />
            </form>
        <WeatherCard city={Value} />
    </div>
  )
}

