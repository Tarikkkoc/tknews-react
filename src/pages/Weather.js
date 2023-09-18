import React, { useEffect, useState } from "react";

const api = {
  key: "a36c5872106b4a1bf43b2e0c424fafed",
  base: "https://api.openweathermap.org/data/2.5/",
};

const WeatherTable = () => {
  const cities = [
    "Istanbul",
    "Ankara",
    "Izmir",
    "Bursa",
    "Edirne",
    "Antalya",
    "Van",
    "Kars",
  ];
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      let data = [];
      for (let city of cities) {
        const response = await fetch(
          `${api.base}weather?q=${city}&units=metric&APPID=${api.key}`
        );
        const result = await response.json();
        data.push(result);
      }
      setWeatherData(data);
    };
    fetchWeather();
  }, []);

  return (
    <div className="flex flex-col bg-gray-100 dark:bg-zinc-950 text-black dark:text-white items-center p-8 h-screen">
      <h1 className="text-3xl mb-4">Hava Durumu</h1>
      <table className="border-2 border-gray-300 h-full">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 px-4 py-2">Şehir</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Sıcaklık</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Weather</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {weatherData.map((cityWeather, index) => (
            <tr key={index}>
              <td className="border-b-2 border-gray-300 px-4 py-2">
                {cityWeather.name}
              </td>
              <td className="border-b-2 border-gray-300 px-4 py-2">
                {cityWeather.main?.temp}°C
              </td>
              <td className="border-b-2 border-gray-300 px-4 py-2">
                {cityWeather.weather[0]?.main}
              </td>
              <td className="border-b-2 border-gray-300 px-4 py-2">
                {cityWeather.weather[0]?.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeatherTable;
