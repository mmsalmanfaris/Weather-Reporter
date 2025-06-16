import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

const App = () => {

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchweather = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json`,
          {
            params: {
              key: import.meta.env.VITE_WEATHER_API_KEY,
              q: `Colombo`
            }
          }
        );
        setWeather(response.data);
        console.log(response.data);
      } catch (err) {
        toast.error(err.message || 'Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };
    fetchweather();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 border max-w-sm w-full">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-semibold text-gray-800">
              {weather.location.name}
            </h1>
            <p className="text-sm text-gray-500">Last updated: {weather.current.last_updated}</p>
          </div>
          <img
            src={weather.current.condition.icon}
            className="w-20 h-20"
          />
        </div>

        <div className="space-y-2 text-gray-700 text-lg">
          <div className="flex items-center justify-between">
            <span>🌡️ Temperature:</span>
            <span>{weather.current.temp_c} °C</span>
          </div>
          <div className="flex items-center justify-between">
            <span>💧 Humidity:</span>
            <span>{weather.current.humidity}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span>🌬️ Wind Speed:</span>
            <span>{weather.current.wind_kph} kph</span>
          </div>
          <div className="flex items-center justify-between">
            <span>☀️ UV Index:</span>
            <span>{weather.current.uv}</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t mt-4 text-sm text-gray-600">
            <span>Condition:</span>
            <span>{weather.current.condition.text}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App