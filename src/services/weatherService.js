const openWeatherMapURL = 'https://api.openweathermap.org';

export const getWeatherForecast = async ({ city }) => {
  const forecastEndpoint = `${openWeatherMapURL}/data/2.5/forecast/daily?q=${city}&cnt=16&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
  const result = await fetch(forecastEndpoint);

  return result.json();
}