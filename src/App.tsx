import React, { useMemo, useCallback } from "react";
import { Card, CardBody, CardHeader, Spinner, Button, Autocomplete, AutocompleteItem, addToast } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { WeatherDisplay } from "./components/weather-display";

// WeatherAPI.com response format
interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
  };
}

interface CityItem {
  label: string;
  key: string;
  value?: string;
}

export default function App() {
  const [city, setCity] = React.useState("india");
  const [weather, setWeather] = React.useState<WeatherData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [suggestions, setSuggestions] = React.useState<CityItem[]>([]);
  const [searchLoading, setSearchLoading] = React.useState(false);

  const popularCities = React.useMemo(() => [
    { label: "New York", key: "new york" },
    { label: "London", key: "london" },
    { label: "Tokyo", key: "tokyo" },
    { label: "Paris", key: "paris" },
    { label: "Sydney", key: "sydney" },
    { label: "Mumbai", key: "mumbai" },
    { label: "Delhi", key: "delhi" },
    { label: "Singapore", key: "singapore" },
    { label: "Dubai", key: "dubai" },
    { label: "Berlin", key: "berlin" },
  ], []);

  const fetchWeather = React.useCallback(async (cityName: string = city) => {
    if (!cityName.trim()) {
      addToast({
        title: "Error",
        description: "Please enter a city name",
        severity: "danger",
      });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Using WeatherAPI.com with the provided API key
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=95c714ae2c5a459081375154252504&q=${cityName}&aqi=yes`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch weather data (${response.status})`);
      }

      const data = await response.json();
      setWeather(data);
    } catch (err: unknown) {
      console.error("Weather fetch error:", err);
      setError(err instanceof Error ? err.message : "An error occurred while fetching weather data");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }, [city]);

  const fetchSuggestions = React.useCallback(async (value: string) => {
    if (!value || value.length < 2) {
      setSuggestions(popularCities);
      return;
    }

    setSearchLoading(true);
    try {
      // Using WeatherAPI.com search endpoint with the provided API key
      const response = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=95c714ae2c5a459081375154252504&q=${value}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }

      const data = await response.json();
      const formattedSuggestions = data.map((item: { name: string; country: string }) => ({
        label: `${item.name}, ${item.country}`,
        key: item.name.toLowerCase(),
        value: item.name
      }));

      setSuggestions(formattedSuggestions.length > 0 ? formattedSuggestions : popularCities);
    } catch (err: unknown) {
      console.error("Suggestion fetch error:", err);
      setSuggestions(popularCities);
    } finally {
      setSearchLoading(false);
    }
  }, [popularCities]);

  React.useEffect(() => {
    fetchWeather();
    setSuggestions(popularCities);
  }, [fetchWeather, popularCities]);

  const handleSelectionChange = (key: string | number | null) => {
    if (key) {
      const selected = suggestions.find(item => item.key === key);
      if (selected) {
        setCity(selected.value || selected.label);
        fetchWeather(selected.value || selected.label);
      }
    }
  };

  const handleInputChange = (value: string) => {
    setCity(value);
    fetchSuggestions(value);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const getBackgroundGradient = useMemo(() => {
    if (!weather) return "from-blue-50 to-blue-100";
    const temp = weather.current.temp_c;
    if (temp > 30) return "from-orange-50 to-red-100";
    if (temp > 20) return "from-yellow-50 to-orange-100";
    if (temp > 10) return "from-green-50 to-blue-100";
    if (temp > 0) return "from-blue-50 to-indigo-100";
    return "from-indigo-50 to-purple-100";
  }, [weather]);

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`flex min-h-screen items-center justify-center p-4 sm:p-8 bg-gradient-to-b ${getBackgroundGradient} transition-colors duration-1000`}
    >
      <motion.div variants={itemVariants} className="w-full max-w-md">
        <Card className="w-full backdrop-blur-sm bg-white/80 shadow-xl">
          <CardHeader className="flex flex-col gap-1">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Weather App
            </motion.h1>
            <motion.div 
              variants={itemVariants}
              className="w-full mt-4"
            >
              <Autocomplete
                defaultItems={suggestions}
                items={suggestions}
                inputValue={city}
                placeholder="Enter city name"
                isLoading={searchLoading}
                startContent={<Icon icon="lucide:search" className="text-default-400" />}
                size="sm"
                onInputChange={handleInputChange}
                onSelectionChange={handleSelectionChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    fetchWeather();
                  }
                }}
                className="shadow-sm"
              >
                {(item) => (
                  <AutocompleteItem key={item.key} textValue={item.label}>
                    {item.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </motion.div>
          </CardHeader>

          <CardBody>
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center py-8"
                >
                  <Spinner size="lg" color="primary" />
                </motion.div>
              ) : error ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-8 text-danger"
                >
                  <Icon icon="lucide:alert-circle" className="text-5xl mx-auto mb-2" />
                  <p>{error}</p>
                  <Button
                    color="primary"
                    variant="flat"
                    onPress={() => fetchWeather()}
                    className="mt-4"
                    size="sm"
                  >
                    Try Again
                  </Button>
                </motion.div>
              ) : weather ? (
                <motion.div
                  key="weather"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <WeatherDisplay weather={weather} />
                </motion.div>
              ) : (
                <motion.div
                  key="no-data"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8 text-default-500"
                >
                  <Icon icon="lucide:cloud" className="text-6xl mx-auto mb-2" />
                  <p>No weather data available</p>
                  <Button
                    color="primary"
                    variant="flat"
                    onPress={() => fetchWeather()}
                    className="mt-4"
                    size="sm"
                  >
                    Try Again
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </CardBody>
        </Card>
      </motion.div>
    </motion.div>
  );
}

