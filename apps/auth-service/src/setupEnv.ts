import { config } from "dotenv";
import path from "node:path";

// Listed highest-priority first: dotenv keeps the value that was loaded first.
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