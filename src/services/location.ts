import { handleError } from "../utils/error";

export async function getLocation(cityInput: string) {
    if (cityInput.toLowerCase() === "me") {
        const response = await fetch("http://ip-api.com/json");
        const data = await response.json();
        return {
            city: data.city,
            country: data.country,
            lat: data.lat,
            lon: data.lon
        }
    }

    const apiKey = process.env.API_KEY;
    if (!apiKey) handleError(new Error("API_KEY is not defined in .env file"));

    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=${apiKey}`);
    const data = await response.json();
    if (!data.length) handleError(new Error(`${cityInput} not found`));

    return {
        city: data[0].name,
        country: data[0].country,
        lat: data[0].lat,
        lon: data[0].lon
    }
}