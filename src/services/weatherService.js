const weatherStackURL = 'http://api.weatherapi.com/v1';

export const getWeatherForecast = async (city) => {
  const forecastEndpoint = `${weatherStackURL}/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${city}&days=3`;
  const result = await fetch(forecastEndpoint);

  return result.json();
}