import { Request, Response, NextFunction, RequestHandler } from "express";
import { Schema } from "joi";

export const validateRequest = (schema: Schema): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        // Validate entire req.body against the Joi schema,
        // and collect all errors (abortEarly: false).
        
        // Guard: Check if req.body is missing or not an object
        if (!req.body || typeof req.body !== "object") {
            res.status(400).json({ error: "Invalid request body: must be a JSON object." });
            return;
        }
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            // If validation failed, extract all messages and join them.
            const messages = error.details.map((d) => d.message).join(', ');
            // Send 422 Unprocessable Entity with the combined error string.
            res.status(422).json({ error: messages });
            return; // <— Important: do NOT call next(), do not proceed to controller.
        }

        // If no error, proceed to the next middleware / controller.
        next();
    };
};