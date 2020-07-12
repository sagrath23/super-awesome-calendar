const openWeatherMapURL = 'https://samples.openweathermap.org';

export const getWeatherForecast = async ({ lon, lat }) => {
  const forecastEndpoint = `${openWeatherMapURL}/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=16&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
  const result = await fetch(forecastEndpoint);

  return result.json();
}