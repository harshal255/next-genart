import { Request, Response, NextFunction } from "express";
import userModel from "../models/UserModel.js";
import FormData from "form-data";
import config from "../config/index.js";
import axios from "axios";


export const generateImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, prompt } = req.body;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.fails("User not found", "NotFound", 404);
        }
        if (user.creditBalance <= 0) {
            return res.fails({ creditBalance: user.creditBalance }, "No Credit Balance");
        }

        // 🚀🚀 Link : https://clipdrop.co/apis/docs/text-to-image
        const formData = new FormData();

        formData.append('prompt', prompt);
        const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                'x-api-key': config.clipdrop_api,
            },
            responseType: 'arraybuffer'
        })

        const base64Image = Buffer.from(data as ArrayBuffer).toString('base64');
        const resultImage = `data:image/png;base64,${base64Image}`;
        await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 });
        res.success({ creditBalance: user.creditBalance - 1, resultImage }, "Image Generated")

    } catch (error) {
        next(error);
    }
}