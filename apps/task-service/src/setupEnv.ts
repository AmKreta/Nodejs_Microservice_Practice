import { config } from "dotenv";
import path from "node:path";

const envFilePaths = [
    path.resolve(__dirname, "..", ".env"),
    path.resolve(__dirname, "..", "..", "..", ".env"),
]

export function setupEnv() {
    for (const envFilePath of envFilePaths) {
        try {
            config({
                path: envFilePath,
            })
        } catch (error) {
            console.error(`Error loading environment variables from ${envFilePath}:`, error);
        }
    }
}