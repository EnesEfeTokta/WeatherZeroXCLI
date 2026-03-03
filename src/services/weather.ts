import { WeatherData } from "../types";

export async function getWeather(city: string, lat: number, lon: number, date: string): Promise<WeatherData> {
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("API_KEY is not defined in .env file");
    
    if (date !== "today") throw new Error("Only 'today' date type is supported for now");

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    if (!response.ok) throw new Error('Failed to fetch weather data');
    const data = await response.json();

    return {
        city,
        temperature: data.main.temp,
        windSpeed: data.wind.speed,
        date: "today",
        createdAt: new Date().toISOString()
    };
}