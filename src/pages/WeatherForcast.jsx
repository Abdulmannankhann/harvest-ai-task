/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { LineChart } from "@mui/x-charts";
import { kelvinToCelsius } from "../utils/Funtions";
import { Box, CircularProgress } from "@mui/material";

const WeatherForcast = () => {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          setError(true);
          console.error("Error getting geolocation:", error.message);
        },
      );
    } else {
      console.error("Geolocation is not supported by your browser");
    }
  };

  const getWeatherData = async () => {
    if (location) {
      const apiKey = process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY;
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${location?.latitude}&lon=${location?.longitude}&appid=${apiKey}`;

      axios
        .get(apiUrl)
        .then((response) => {
          setWeatherData(response?.data);
        })
        .catch((err) => {
          setError(true);
          console.error("Error fetching weather data:", err);
        })
        .finally(() => {
          setLoader(false);
        });
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (location) {
      getWeatherData();
    }
  }, [location]);

  // Function to calculate average temperature for a given day
  const calculateAverageTemp = (dayData) => {
    const temperatures = dayData?.map((data) => data.main.temp);
    const averageTemp = temperatures?.reduce((sum, temp) => sum + temp, 0) / temperatures.length;
    return Math.round(averageTemp * 100) / 100;
  };

  // Function to group data by day
  const groupDataByDay = () => {
    const groupedData = {};
    weatherData?.list?.forEach((data) => {
      const date = data.dt_txt.split(" ")[0];
      if (!groupedData[date]) {
        groupedData[date] = [data];
      } else {
        groupedData[date].push(data);
      }
    });
    return groupedData;
  };

  const dailyWeather = useMemo(() => {
    if (weatherData) {
      const groupedData = groupDataByDay();
      const days = Object.keys(groupedData);
      const averages = days?.map((day) => ({
        date: day,
        averageTemp: kelvinToCelsius(calculateAverageTemp(groupedData[day])),
      }));
      return averages;
    }
    return [];
  }, [weatherData]);

  if (error) {
    return (
      <div>
        <h2>Weather Forecast Not Available</h2>
      </div>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <h2>Weather Forecast:</h2>
      {weatherData ? (
        <div>
          <LineChart width={window?.innerWidth > 800 ? 800 : window?.innerWidth} height={350} series={[{ data: dailyWeather?.map((v) => v?.averageTemp), label: "Avg. Temperature (°C)" }]} xAxis={[{ scaleType: "point", data: dailyWeather?.map((v) => v?.date) }]} />
        </div>
      ) : (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default WeatherForcast;
