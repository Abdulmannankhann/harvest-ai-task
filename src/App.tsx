import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Header from "./components/Header";
import BarChartComponent from "./pages/BarChart";
import Weather from "./pages/WeatherForcast";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline>
        <Header />
        <Routes>
          <Route path="/dynamic-bar-chart" element={<BarChartComponent />}></Route>
          <Route path="/weather-forecast-line-graph" element={<Weather />}></Route>
          <Route path="/" element={<Navigate to="/dynamic-bar-chart" replace />} />
          <Route path="*" element={<div>Error 404</div>}></Route>
        </Routes>
      </CssBaseline>
    </BrowserRouter>
  );
}

export default App;
