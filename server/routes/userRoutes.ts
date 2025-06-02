import express from 'express';

import { registerUser, loginUser, userCredits, paymentRazorpay, verifyRazorpay } from "../controllers/userController.js";
import { registerUserSchema, loginUserSchema, paymentRazorpaySchema, verifyRazorpaySchema } from "../validations/userValidation.js";
import { validateRequest } from '../middlewares/validateRequest.js';
import userAuth from '../middlewares/authHandler.js';


const userRouter = express.Router();

userRouter.post('/register', validateRequest(registerUserSchema), registerUser);
userRouter.post('/login', validateRequest(loginUserSchema), loginUser);
userRouter.post('/credits', userAuth, userCredits);
userRouter.post('/pay-razor', validateRequest(paymentRazorpaySchema), userAuth, paymentRazorpay);
userRouter.post('/verify-razorpay', validateRequest(verifyRazorpaySchema), userAuth, verifyRazorpay);

export default userRouter;