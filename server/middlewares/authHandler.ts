import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/index.js';

const userAuth = async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.headers;
    if (!token) {
        res.fails("Unauthorized", "Unauthorized", 401);
    }
    try {
        const tokenDecode = jwt.verify(token as string, config.jwt_secret);
        if (typeof tokenDecode === "object" && "id" in tokenDecode) {
            req.body.userId = (tokenDecode as JwtPayload).id;
            next(); // Don't forget to call next when successful 
        }
        else {
            res.fails("Unauthorized", "Unauthorized", 401);
        }
    } catch (error) {
        next(error);
    }
}

export default userAuth;