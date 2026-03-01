import { parseCLI } from "./cli/cli";
import "dotenv/config";

async function bootstrap() {
    try {
        await parseCLI();
    } catch (error) {
        console.error("Unexpected error:", error);
        process.exit(1);
    }
}

bootstrap();