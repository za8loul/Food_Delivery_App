export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || err.cause || 500;
    const message = err.message || "Internal Server Error";
    
    res.status(statusCode).json({
        status: "fail",
        message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};
