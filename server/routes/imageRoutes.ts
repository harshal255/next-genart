import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest.js";
import { generateImageSchema } from "../validations/imageValidation.js";
import userAuth from "../middlewares/authHandler.js";
import { generateImage } from "../controllers/imageController.js";

const imageRouter = Router();


imageRouter.post('/generate-image', validateRequest(generateImageSchema), userAuth, generateImage);

export default imageRouter;