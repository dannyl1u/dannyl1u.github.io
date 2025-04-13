import { useEffect, useState } from "react";
import AsciiSpinner from "./AsciiSpinner";

const WeatherReport: React.FC = () => {
  const [weatherData, setWeatherData] = useState<string | null>(null);
  const [precipitationData, setPrecipitationData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherResponse = await fetch("https://wttr.in/Redmond?format=%C+%t+%w");
        const precipitationResponse = await fetch("https://wttr.in/Redmond?format=%p");

        if (!weatherResponse.ok || !precipitationResponse.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const weatherText = await weatherResponse.text();
        const precipitationText = await precipitationResponse.text();

        setWeatherData(weatherText);
        setPrecipitationData(precipitationText);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (condition: string): string => {
    if (condition.includes("Sunny")) return "☀️";
    if (condition.includes("Cloudy")) return "☁️";
    if (condition.includes("Rain")) return "🌧️";
    if (condition.includes("Snow")) return "❄️";
    if (condition.includes("Thunder")) return "⛈️";
    return "🌍";
  };

  return (
    <div className="p-4 bg-blue-50 rounded-lg shadow-md w-96 text-center font-mono">
      <p className="text-xl">Redmond, Washington</p>
      {loading && <AsciiSpinner />}
      {error && <p className="text-red-500">No weather data available</p>}
      {weatherData && (
        <div className="mt-2 text-lg">
          <p className="text-3xl">{getWeatherIcon(weatherData)} {weatherData}</p>
        </div>
      )}
      {/* {precipitationData && (
        <div className="mt-4 p-2 bg-white rounded-md shadow-sm">
          <p>Precipitation: {precipitationData}</p>
        </div>
      )} */}
    </div>
  );
};

export default WeatherReport;
