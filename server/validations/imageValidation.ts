import Joi from "joi";

export const generateImageSchema = Joi.object().keys({
    prompt: Joi.string().max(1000).required()
});