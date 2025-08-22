import { useEffect, useState } from "react";
import { useTheme } from "./Context";
import { FaMoon, FaSun } from "react-icons/fa";

function App() {
  const { mode, setMode } = useTheme();
  const toggleTheme = () => setMode(!mode);
  const [data,setData] = useState(null)
  const [area,setArea] = useState(null)
  const [msg,setMsg] = useState('Please Enter Valid Location...')
  const [loading, setLoading] = useState(false);


  const API_KEY = import.meta.env.VITE_WEATHER_API;
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${area}&APPID=${API_KEY}`

    const fetchdata = async () => {
      if(!area || area === ""){
        setData(null)
        setMsg('⚠️ Please Enter a City Name...')
        return
      }
      setLoading(true)
      const weatherData = await fetch(URL).then(res => res.json()).then(data => data)
      setData(weatherData) 

       weatherData.cod === "404"
        ? (setData(null), setMsg(`⚠️ ${area} City Not Found...`))
        : (setData(weatherData), setMsg(""));

        setLoading(false)
      }

  return (
    <>
      <div className="fixed top-5 right-5">
        {mode ? (
          <FaSun
            className="cursor-pointer text-3xl text-yellow-400 hover:scale-110 transition"
            onClick={toggleTheme}
          />
        ) : (
          <FaMoon
            className="cursor-pointer text-3xl text-gray-800 hover:scale-110 transition"
            onClick={toggleTheme}
          />
        )}
      </div>

      <div
        className="h-screen w-screen flex items-center justify-center 
                   transition-colors duration-500"
        style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
      >
        <div
          className="p-8 rounded-2xl shadow-2xl backdrop-blur-md flex flex-col gap-6 w-[350px] transition-colors duration-500"
          style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
        >
          <h1 className="text-4xl font-extrabold text-center tracking-wide">
            Weather
          </h1>
          <input
            value={area || ""}
            onChange={(e) => setArea(e.target.value)}
            onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchdata();
            }
            }}
            type="text"
            placeholder="Enter city..."
            className="px-4 py-3 rounded-xl border border-gray-400/40 
                       bg-[var(--bg)] text-[var(--text)] 
                       placeholder:text-gray-500 dark:placeholder:text-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
  onClick={fetchdata}
  disabled={loading}
  className="mt-2 w-full px-4 py-3 rounded-xl font-semibold 
             bg-blue-600 hover:bg-blue-700 
             text-white transition flex items-center justify-center" >
      {loading ? (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin h-6 w-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 40 40"
          >
        <circle
          className="opacity-25"
          cx="20"
          cy="20"
          r="18"
          stroke="currentColor"
          strokeWidth="1"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
            </svg>
          </div>
        ) : (
          "Search"
        )}
      </button>

            {data ? '' : <span className="text-red-500">{msg}</span> }
            <div>
              <p>Area 👁️ : {data ? data.name : 'No Result Found'}</p>
              <p> Temperature ✨ : {data ? (Math.round(data.main.temp - 273.15) + " °C") : "No Result Found"}</p>
              <p>Country 🕶️ : {data ? data.sys.country : 'No Result Found'}</p>
            </div>
        </div>
      </div>
    </>
  );
}

export default App;
