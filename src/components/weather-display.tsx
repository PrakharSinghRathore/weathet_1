import { Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

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

export const WeatherDisplay = ({ weather }: { weather: WeatherData }) => {
  if (!weather || !weather.location || !weather.current) return null;

  const { location, current } = weather;

  // Map weather condition code to appropriate icon
  const getWeatherIcon = (condition: { code: number } | undefined) => {
    if (!condition || !condition.code) return "lucide:cloud";

    const code = condition.code;
    const isDay = current.is_day === 1;

    if (code === 1000) return isDay ? "lucide:sun" : "lucide:moon";
    if (code >= 1003 && code <= 1009) return isDay ? "lucide:cloud-sun" : "lucide:cloud-moon";
    if (code >= 1030 && code <= 1039) return "lucide:cloud-fog";
    if (code >= 1063 && code <= 1069) return "lucide:cloud-drizzle";
    if (code >= 1072 && code <= 1087) return "lucide:cloud-lightning";
    if (code >= 1114 && code <= 1117) return "lucide:snowflake";
    if (code >= 1135 && code <= 1147) return "lucide:cloud-fog";
    if (code >= 1150 && code <= 1201) return "lucide:cloud-rain";
    if (code >= 1204 && code <= 1237) return "lucide:snowflake";
    if (code >= 1240 && code <= 1252) return "lucide:cloud-rain";
    if (code >= 1255 && code <= 1264) return "lucide:snowflake";
    if (code >= 1273 && code <= 1282) return "lucide:cloud-lightning";

    return "lucide:cloud";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-center"
    >
      <motion.div 
        variants={itemVariants}
        className="flex justify-between items-center mb-4"
      >
        <div className="text-left">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {location.name}
          </h2>
          <p className="text-small text-default-500">{location.region}, {location.country}</p>
        </div>
        <motion.div 
          variants={itemVariants}
          className="text-right text-small text-default-400"
          whileHover={{ scale: 1.05 }}
        >
          <p>Last updated:</p>
          <p>{new Date(current.last_updated).toLocaleTimeString()}</p>
        </motion.div>
      </motion.div>

      <Divider className="my-4" />

      <motion.div 
        variants={itemVariants}
        className="flex items-center justify-center gap-6 mb-8"
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon
            icon={getWeatherIcon(current.condition)}
            className="text-8xl text-primary-500"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {current.temp_c}°C
          </div>
          <p className="text-default-600 text-lg">{current.condition?.text || "Unknown"}</p>
        </motion.div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-2 gap-6 text-left"
      >
        <motion.div 
          variants={itemVariants}
          className="flex items-center gap-3 p-3 rounded-lg bg-white/50 shadow-sm hover:shadow-md transition-shadow"
          whileHover={{ scale: 1.02 }}
        >
          <Icon icon="lucide:thermometer" className="text-blue-500 text-xl" />
          <div>
            <p className="text-xs text-default-500">Feels like</p>
            <p className="font-medium">{current.feelslike_c}°C</p>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="flex items-center gap-3 p-3 rounded-lg bg-white/50 shadow-sm hover:shadow-md transition-shadow"
          whileHover={{ scale: 1.02 }}
        >
          <Icon icon="lucide:droplets" className="text-blue-500 text-xl" />
          <div>
            <p className="text-xs text-default-500">Humidity</p>
            <p className="font-medium">{current.humidity}%</p>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="flex items-center gap-3 p-3 rounded-lg bg-white/50 shadow-sm hover:shadow-md transition-shadow"
          whileHover={{ scale: 1.02 }}
        >
          <Icon icon="lucide:wind" className="text-blue-500 text-xl" />
          <div>
            <p className="text-xs text-default-500">Wind</p>
            <p className="font-medium">{current.wind_kph} km/h {current.wind_dir}</p>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="flex items-center gap-3 p-3 rounded-lg bg-white/50 shadow-sm hover:shadow-md transition-shadow"
          whileHover={{ scale: 1.02 }}
        >
          <Icon icon="lucide:gauge" className="text-blue-500 text-xl" />
          <div>
            <p className="text-xs text-default-500">Pressure</p>
            <p className="font-medium">{current.pressure_mb} mb</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};