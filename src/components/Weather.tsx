import { useEffect, useState } from "react";

const WeatherReport = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [precipitationData, setPrecipitationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (condition) => {
    if (condition.includes("Sunny")) return "☀️";
    if (condition.includes("Cloudy")) return "☁️";
    if (condition.includes("Rain")) return "🌧️";
    if (condition.includes("Snow")) return "❄️";
    if (condition.includes("Thunder")) return "⛈️";
    return "🌍";
  };

  return (
    <div className="p-4 bg-blue-50 rounded-lg shadow-md w-96 text-center">
      <h3 className="text-xl font-bold"> Currently in Redmond, WA 🌲</h3>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">No weather data available</p>}
      {weatherData && (
        <div className="mt-2 text-lg">
          <p className="text-3xl">{getWeatherIcon(weatherData)}</p>
          <p>{weatherData}</p>
        </div>
      )}
      {precipitationData && (
        <div className="mt-4 p-2 bg-white rounded-md shadow-sm">
        </div>
      )}
    </div>
  );
};

export default WeatherReport;
