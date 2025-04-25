import React, { useState } from 'react';
import { WeatherDisplay } from './components/weather-display';
import { ForecastDisplay } from './components/forecast-display';
import { AirQualityDisplay } from './components/air-quality-display';
import { WeatherMap } from './components/weather-map';

interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
    lat: number;
    lon: number;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    wind_dir: string;
    humidity: number;
    feelslike_c: number;
    uv: number;
  };
}

interface ForecastData {
  date: string;
  temperature: number;
  description: string;
  icon: string;
}

interface AirQualityData {
  aqi: number;
  pm25: number;
  pm10: number;
  no2: number;
  so2: number;
  o3: number;
}

export default function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const city = formData.get('city') as string;

    if (!city) return;

    setLoading(true);
    setError(null);

    try {
      // Add your API calls here
      // Example:
      // const weatherResponse = await fetch(`/api/weather?city=${city}`);
      // const weatherData = await weatherResponse.json();
      // setWeather(weatherData);
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Weather App
        </h1>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              name="city"
              placeholder="Enter city name"
              className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {loading && (
          <div className="text-center">
            <p className="text-gray-600">Loading...</p>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 mb-4">
            <p>{error}</p>
          </div>
        )}

        {weather && (
          <div className="space-y-6">
            <WeatherDisplay weather={weather} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ForecastDisplay forecast={forecast} />
              <AirQualityDisplay data={airQuality!} />
            </div>
            <WeatherMap lat={weather.location.lat} lon={weather.location.lon} />
          </div>
        )}
      </div>
    </div>
  );
}

