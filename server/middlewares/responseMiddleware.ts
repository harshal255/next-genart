import { Request, Response, NextFunction } from "express";

declare global {
    namespace Express {
        interface Response {
            success: (data: any, message?: string, statusCode?: number) => void;
            fails: (data: any, message?: string, statusCode?: number) => void;
        }
    }
}

const responseMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.success = (data, message = "Success", statusCode = 200) => {
        res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    };
    res.fails = (data, message = "Fails", statusCode = 400) => {
        res.status(statusCode).json({
            success: false,
            message,
            data,
        });
    };

    next();
};

export default responseMiddleware;
