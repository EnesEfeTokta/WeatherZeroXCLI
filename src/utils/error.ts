import chalk from "chalk";

export function handleError(error: any) {
    console.error(chalk.red("Error:"), error.message);
    process.exit(1);
}