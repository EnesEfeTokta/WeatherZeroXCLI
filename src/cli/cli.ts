import { Command } from "commander";
import { saveWeather, listWeather, deleteWeather } from "../utils/storage";
import { getWeather } from "../services/weather";
import { getLocation } from "../services/location";

export function parseCLI() {
    const program = new Command();

    program
        .name("weatherzerox")
        .description("Weather CLI")
        .version("1.0.0");

    program
        .command("get")
        .description("Get weather information")
        .option("--city <name>", "City name or 'me'")
        .option("--date <type>", "today | tomorrow", "today")
        .option("--save", "Save result to file")
        .action((options) => {
            handleGet(options);
        });

    program
        .command("list")
        .option("--city <name>")
        .option("--date-min <date>")
        .option("--date-max <date>")
        .option("--temp-min <number>", "Minimum temperature", parseFloat)
        .option("--temp-max <number>", "Maximum temperature", parseFloat)
        .option("--wind-min <number>", "Minimum wind speed", parseFloat)
        .option("--wind-max <number>", "Maximum wind speed", parseFloat)
        .action((options) => {
            handleList(options);
        });

    program
        .command("delete")
        .option("--city <name>")
        .option("--date-min <date>")
        .option("--date-max <date>")
        .option("--temp-min <number>", "Minimum temperature", parseFloat)
        .option("--temp-max <number>", "Maximum temperature", parseFloat)
        .option("--wind-min <number>", "Minimum wind speed", parseFloat)
        .option("--wind-max <number>", "Maximum wind speed", parseFloat)
        .action((options) => {
            handleDelete(options);
        });

    program.parse();
}

async function handleGet(options: any) {
    const location = await getLocation(options.city);
    const weatherData = await getWeather(
        location.city,
        location.lat,
        location.lon,
        options.date
    );

    console.log(weatherData);

    if (options.save) {
        saveWeather(weatherData);
        console.log("Saved successfully.");
    }
}

function handleList(options: any) {
    console.log("FILTERS:", options);
    listWeather(options);
}

function handleDelete(options: any) {
    deleteWeather(options);
}
