import React from 'react';

interface ForecastData {
  date: string;
  temperature: number;
  description: string;
  icon: string;
}

interface ForecastDisplayProps {
  forecast: ForecastData[];
}

export const ForecastDisplay: React.FC<ForecastDisplayProps> = ({ forecast }) => {
  return (
    <div className="forecast-container p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">5-Day Forecast</h2>
      <div className="forecast-grid grid grid-cols-1 md:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-day p-3 bg-gray-50 rounded-lg">
            <p className="font-medium">{day.date}</p>
            <p className="text-2xl font-bold">{day.temperature}°C</p>
            <p className="text-gray-600">{day.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}; 