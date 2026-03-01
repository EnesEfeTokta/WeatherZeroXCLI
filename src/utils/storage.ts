import fs from "fs";
import path from "path";
import { WeatherData } from "../types";

const dataDir = path.join(process.cwd(), "data");
const filePath = path.join(dataDir, "weather.json");

export function saveWeather(data: WeatherData) {
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

    let existing = [];
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, "utf-8");
        existing = JSON.parse(content);
    }

    existing.push({
        city: data.city,
        date: data.date,
        temp: data.temperature,
        wind: data.windSpeed,
        savedAt: new Date().toISOString()
    });
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
}

export function listWeather(filters: any) {

    if (!fs.existsSync(filePath)) {
        console.log("No records.");
        return;
    }

    const records = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const filtered = records.filter((r: any) => matchesFilters(r, filters));

    if (filtered.length === 0) {
        console.log("No records match the given filters.");
        return;
    }

    filtered.forEach((r: any, i: number) => {
        console.log(`#${i + 1}\nCity: ${r.city}\nDate: ${r.date}\nTemp: ${r.temp}\nWind: ${r.wind}\nSavedAt: ${r.savedAt}\n--------\n`);
    });
}

export function matchesFilters(record: any, filters: any) {

    if (filters.city && record.city !== filters.city) return false;

    if (filters["dateMin"] !== undefined &&
        new Date(record.date) < new Date(filters["dateMin"])) return false;

    if (filters["dateMax"] !== undefined &&
        new Date(record.date) > new Date(filters["dateMax"])) return false;

    if (filters["tempMin"] != null && !isNaN(filters["tempMin"]) &&
        record.temp < filters["tempMin"]) return false;

    if (filters["tempMax"] != null && !isNaN(filters["tempMax"]) &&
        record.temp > filters["tempMax"]) return false;

    if (filters["windMin"] != null && !isNaN(filters["windMin"]) &&
        record.wind < filters["windMin"]) return false;

    if (filters["windMax"] != null && !isNaN(filters["windMax"]) &&
        record.wind > filters["windMax"]) return false;

    return true;
}

export function deleteWeather(filters: any) {

    if (!fs.existsSync(filePath)) {
        console.log("No records.");
        return;
    }

    const records = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const remaining = records.filter((r: any) => !matchesFilters(r, filters));

    const deletedCount = records.length - remaining.length;
    fs.writeFileSync(filePath, JSON.stringify(remaining, null, 2));

    console.log(`${deletedCount} record(s) deleted.`);
}