import React from 'react';

interface WeatherMapProps {
  lat?: number;
  lon?: number;
}

export const WeatherMap: React.FC<WeatherMapProps> = ({ lat, lon }) => {
  return (
    <div className="weather-map-container p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Weather Map</h2>
      <div className="map-placeholder w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        {lat && lon ? (
          <p className="text-gray-500">Map centered at: {lat}, {lon}</p>
        ) : (
          <p className="text-gray-500">Map will be displayed here</p>
        )}
      </div>
    </div>
  );
}; 