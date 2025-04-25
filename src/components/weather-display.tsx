import React from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

// WeatherAPI.com response format
interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
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

interface WeatherDisplayProps {
  weather: WeatherData;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-gray-800">
          {weather.location.name}, {weather.location.country}
        </h2>
        <p className="text-gray-600">{weather.location.localtime}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="backdrop-blur-sm bg-white/90 rounded-lg shadow-md p-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center">
              <img
                src={`https:${weather.current.condition.icon}`}
                alt={weather.current.condition.text}
                className="w-24 h-24"
              />
            </div>
            <div>
              <h3 className="text-4xl font-bold text-gray-800">
                {weather.current.temp_c}°C
              </h3>
              <p className="text-gray-600">{weather.current.condition.text}</p>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-sm bg-white/90 rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <Icon icon="lucide:thermometer" className="mx-auto text-2xl text-blue-500 mb-2" />
                <p className="text-sm text-gray-600">Feels Like</p>
                <p className="font-semibold">{weather.current.feelslike_c}°C</p>
              </div>
              <div className="text-center">
                <Icon icon="lucide:droplets" className="mx-auto text-2xl text-blue-500 mb-2" />
                <p className="text-sm text-gray-600">Humidity</p>
                <p className="font-semibold">{weather.current.humidity}%</p>
              </div>
              <div className="text-center">
                <Icon icon="lucide:wind" className="mx-auto text-2xl text-blue-500 mb-2" />
                <p className="text-sm text-gray-600">Wind</p>
                <p className="font-semibold">{weather.current.wind_kph} km/h</p>
              </div>
              <div className="text-center">
                <Icon icon="lucide:sun" className="mx-auto text-2xl text-blue-500 mb-2" />
                <p className="text-sm text-gray-600">UV Index</p>
                <p className="font-semibold">{weather.current.uv}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};