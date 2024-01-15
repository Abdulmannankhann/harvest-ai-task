export const getRandomInt = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

export const kelvinToCelsius = (kelvin) => {
  const kelvinValue = parseFloat(kelvin);
  if (!isNaN(kelvinValue)) {
    return (kelvinValue - 273.15).toFixed(2);
  } else {
    return "Invalid input";
  }
};
