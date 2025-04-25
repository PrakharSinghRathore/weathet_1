import React from 'react';

interface AirQualityData {
  aqi: number;
  pm25: number;
  pm10: number;
  no2: number;
  so2: number;
  o3: number;
}

interface AirQualityDisplayProps {
  data: AirQualityData;
}

export const AirQualityDisplay: React.FC<AirQualityDisplayProps> = ({ data }) => {
  const getAQICategory = (aqi: number) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  return (
    <div className="air-quality-container p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Air Quality</h2>
      <div className="aqi-value text-3xl font-bold mb-2">{data.aqi}</div>
      <div className="aqi-category text-lg mb-4">{getAQICategory(data.aqi)}</div>
      <div className="pollutants-grid grid grid-cols-2 gap-4">
        <div className="pollutant">
          <p className="text-sm text-gray-600">PM2.5</p>
          <p className="font-medium">{data.pm25} µg/m³</p>
        </div>
        <div className="pollutant">
          <p className="text-sm text-gray-600">PM10</p>
          <p className="font-medium">{data.pm10} µg/m³</p>
        </div>
        <div className="pollutant">
          <p className="text-sm text-gray-600">NO2</p>
          <p className="font-medium">{data.no2} µg/m³</p>
        </div>
        <div className="pollutant">
          <p className="text-sm text-gray-600">SO2</p>
          <p className="font-medium">{data.so2} µg/m³</p>
        </div>
      </div>
    </div>
  );
}; 