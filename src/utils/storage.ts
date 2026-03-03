import fs from "fs";
import path from "path";
import { WeatherData, WeatherRecord } from "../types";
import chalk from "chalk";
import figureSet from "figures";
import { renderTable } from "../ui/tableRenderer";
import { handleError } from "./error";

const dataDir = path.join(process.cwd(), "data");
const filePath = path.join(dataDir, "weather.json");

export function saveWeather(data: WeatherData) {
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

    let existing: WeatherRecord[] = [];
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
    console.log(chalk.green(figureSet.tick, "Weather data saved successfully."));
}

export function listWeather(filters: any) {

    if (!fs.existsSync(filePath)) {
        handleError(new Error("No records found. Please fetch and save weather data first."));
    }

    const records = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const filtered = records.filter((r: WeatherRecord) => matchesFilters(r, filters));

    if (filtered.length === 0) {
        handleError(new Error("No records match the given filters."));
    }
    renderTable(filtered);
}

export function matchesFilters(record: WeatherRecord, filters: any) {

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
        handleError(new Error("No records found. Please fetch and save weather data first."));
    }

    const records = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const remaining = records.filter((r: WeatherRecord) => !matchesFilters(r, filters));

    const deletedCount = records.length - remaining.length;
    fs.writeFileSync(filePath, JSON.stringify(remaining, null, 2));

    console.log(chalk.green(figureSet.tick, `Deleted ${deletedCount} record(s) matching the filters.`));
}