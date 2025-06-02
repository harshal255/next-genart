import Joi from "joi";

export const registerUserSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

export const loginUserSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

export const paymentRazorpaySchema = Joi.object().keys({
    planId: Joi.string().required(),
});

export const verifyRazorpaySchema = Joi.object().keys({
    razorpay_order_id: Joi.string().required(),
    razorpay_payment_id: Joi.string().optional(),
    razorpay_signature: Joi.string().optional(),
});
