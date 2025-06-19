import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('Colombo');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchweather = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json`,
          {
            params: {
              key: import.meta.env.VITE_WEATHER_API_KEY,
              q: city
            }
          }
        );
        setWeather(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch weather data');
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };
    fetchweather();
  }, [city]);

  return (
    <div className="p-5 min-h-screen bg-gradient-to-tr from-[#0f0f0f] via-[#0a1a40] to-[#0f0f0f] flex items-center justify-center">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-md w-full transition-all duration-300">
        <div className='p-8'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const inputCity = e.target.elements.city.value.trim();
              if (inputCity) {
                setError(null);
                setLoading(true);
                setCity(inputCity);
              }
            }}
            className="flex items-center gap-3"
          >
            <input
              type="text"
              name="city"
              placeholder="Search city..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2  focus:ring-blue-600 transition"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Search
            </button>
          </form>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent mx-auto mb-3"></div>
            <p className="text-gray-600">Fetching weather data...</p>
          </div>
        ) :
          weather ? (
            <div className="text-gray-800 bg-white p-8 rounded-b-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-semibold">{weather.location.name}</h1>
                  <p className="text-md text-gray-500">{weather.current.condition.text}</p>
                </div>
                <img
                  src={weather.current.condition.icon}
                  alt="Weather Icon"
                  className="w-20 h-20"
                />
              </div>

              <div className="space-y-4 text-lg">
                <div className="flex items-center justify-between">
                  <span>🌡️ Temperature:</span>
                  <span className="font-medium">{weather.current.temp_c} °C</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>💧 Humidity:</span>
                  <span className="font-medium">{weather.current.humidity}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>🌬️ Wind Speed:</span>
                  <span className="font-medium">{weather.current.wind_kph} kph</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>☀️ UV Index:</span>
                  <span className="font-medium">{weather.current.uv}</span>
                </div>
                <div className="flex items-center justify-between pt-3 mt-3 border-t text-base text-gray-600">
                  <span>Condition:</span>
                  <span>{weather.current.last_updated}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 text-red-600 font-medium">
              {error}
            </div>
          )
        }
      </div>
    </div>
  );
};

export default App;
