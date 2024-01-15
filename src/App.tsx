import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Header from "./components/Header";
import BarChartComponent from "./pages/BarChart";
import Weather from "./pages/WeatherForcast";
import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/dynamic-bar-chart" element={<BarChartComponent />}></Route>
          <Route path="/weather-forecast-line-graph" element={<Weather />}></Route>
          <Route path="*" element={<div>Error 404</div>}></Route>
        </Routes>
      </CssBaseline>
    </BrowserRouter>
  );
}

export default App;
