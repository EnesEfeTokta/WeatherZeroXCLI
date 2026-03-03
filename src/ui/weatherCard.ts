import chalk from "chalk";
import boxen from "boxen";
import figures from "figures";

type WeatherCardProps = {
    city: string;
    country: string;
    temperature: number;
    windSpeed: number;
    date: string;
};

export function renderWeatherCard(data: WeatherCardProps) {
    const icon = getWeatherIcon(data.temperature);
    const header = chalk.bold.cyan(`${icon} Weather in ${data.city}, ${data.country}`);

    const body = [
        chalk.green(`${figures.circleFilled} Temperature: ${data.temperature.toFixed(2)} °C`),
        chalk.yellow(`${figures.play} Wind Speed: ${data.windSpeed.toFixed(2)} m/s`),
        chalk.magenta(`${figures.info} Date: ${data.date}`)
    ].join("\n");

    const card = boxen(
        `${header}\n\n${body}`,
        {
            padding: 1,
            margin: 1,
            borderStyle: "round",
            borderColor: "cyan"
        }
    );

    console.log(card);
}

function getWeatherIcon(temp: number) {
    if (temp <= 0) return "❄️";
    if (temp <= 15) return "🌥";
    if (temp <= 25) return "☀️";
    return "🔥";
}