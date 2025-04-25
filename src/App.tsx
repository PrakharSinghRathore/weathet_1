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
      // Example weather data (replace with actual API call)
      const mockWeatherData: WeatherData = {
        location: {
          name: city,
          region: "Region",
          country: "Country",
          localtime: new Date().toLocaleString(),
          lat: 51.5074,
          lon: -0.1278
        },
        current: {
          temp_c: 20,
          temp_f: 68,
          condition: {
            text: "Partly cloudy",
            icon: "//cdn.weatherapi.com/weather/64x64/day/116.png"
          },
          wind_kph: 10,
          wind_dir: "N",
          humidity: 60,
          feelslike_c: 19,
          uv: 5
        }
      };

      const mockForecastData: ForecastData[] = [
        {
          date: "2024-04-26",
          temperature: 20,
          description: "Sunny",
          icon: "//cdn.weatherapi.com/weather/64x64/day/113.png"
        },
        {
          date: "2024-04-27",
          temperature: 22,
          description: "Partly cloudy",
          icon: "//cdn.weatherapi.com/weather/64x64/day/116.png"
        },
        {
          date: "2024-04-28",
          temperature: 19,
          description: "Rainy",
          icon: "//cdn.weatherapi.com/weather/64x64/day/176.png"
        },
        {
          date: "2024-04-29",
          temperature: 21,
          description: "Cloudy",
          icon: "//cdn.weatherapi.com/weather/64x64/day/119.png"
        },
        {
          date: "2024-04-30",
          temperature: 23,
          description: "Sunny",
          icon: "//cdn.weatherapi.com/weather/64x64/day/113.png"
        }
      ];

      const mockAirQualityData: AirQualityData = {
        aqi: 45,
        pm25: 12,
        pm10: 20,
        no2: 15,
        so2: 5,
        o3: 30
      };

      setWeather(mockWeatherData);
      setForecast(mockForecastData);
      setAirQuality(mockAirQualityData);
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

