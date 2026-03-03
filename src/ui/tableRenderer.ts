import chalk from "chalk";
import Table from "cli-table3";
import { WeatherRecord } from "../types";

export function renderTable(data: WeatherRecord[]) {
    if (!data.length) {
        console.log(chalk.yellow("No records found matching the criteria."));
        return;
    }
    const table = new Table({
        head: ['#', 'City', 'Temperature (°C)', 'Weather Icon', 'Wind Speed (m/s)', 'Date', 'Saved At'],
        colWidths: [5, 20, 20, 10,20, 15, 25],
        style: { head: ['bold'], border: ['grey'] }
    });
    data.forEach((r: WeatherRecord, i: number) => {
        table.push([
            i + 1,
            r.city,
            chalk.green(r.temp.toFixed(2)),
            getWeatherIcon(r.temp),
            chalk.yellow(r.wind.toFixed(2)),
            chalk.magenta(r.date),
            chalk.blue(r.savedAt)
        ]);
    });
    console.log(table.toString());
}

function getWeatherIcon(temp: number) {
    if (temp <= 0) return "❄️";
    if (temp <= 15) return "🌥";
    if (temp <= 25) return "☀️";
    return "🔥";
}