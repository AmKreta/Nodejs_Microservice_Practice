export class AppError extends Error {
    readonly #statusCode: number;
    readonly #isOperational: boolean;
    constructor(message: string, statusCode: number, isOperational: boolean = true) {
        super(message);
        this.#statusCode = statusCode;
        this.name = this.constructor.name;
        this.#isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }

    get statusCode() {
        return this.#statusCode;
    }

    get isOperational() {
        return this.#isOperational;
    }
}