import ApiError from "../utils/api-errors.js";

export const notFound = (req, res, next) => {
    next(new ApiError(404, `Route Not Found - ${req.method} ${req.originalUrl}`));
};

export const errorHandler = (err, req, res, next) => {
    if (err.code === 11000) {
        return res.status(409).json({message: "Duplicate value entered"});
    }

    // Malformed ObjectId (e.g. /api/admin/users/abc)
    if (err.name === "CastError") {
        return res.status(400).json({ message: `Invalid ${err.path}: ${err.value}` });
    }

    const statusCode = err.statusCode || 500;
    const message = err.statusCode ? err.message : "Internal Server Error";
    if (statusCode === 500) console.error(err);
    res.status(statusCode).json({message});
}