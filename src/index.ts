import { parseCLI } from "./cli/cli";
import "dotenv/config";
import figlet from "figlet";
import gradient from "gradient-string";

async function bootstrap() {
    try {

        const text = figlet.textSync('Weather Zero X  CLI', { font: 'Big' });
        console.log(gradient.pastel.multiline(text));

        await parseCLI();
    } catch (error) {
        console.error("Unexpected error:", error);
        process.exit(1);
    }
}

bootstrap();