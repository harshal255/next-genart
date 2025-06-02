import userModel from "../models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express";
import config from "../config/index.js";
import transactionModel from "../models/TransactionModel.js";
import razorpayInstance from "../config/razorpay.js";
import RazorpayInstance from "../config/razorpay.js";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("register user");
        const { name, email, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const encryptedHashPassword = await bcrypt.hash(password, salt);

        const userData = { name, email, password: encryptedHashPassword };
        const newUser = new userModel({ ...userData });
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, config.jwt_secret!);
        res.success({ token, user }, "User  Register Successful");
    } catch (error) {
        next(error);
    }
}


export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.fails("User Not Exist", "User Not Exist", 404);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, config.jwt_secret!);
            res.success({ token, user: { id: user._id, name: user.name, email: user.email } }, "User Login Successful");
        } else {
            return res.fails("Invalid Credentials", "Invalid Credentials", 401);
        }

    } catch (error) {
        next(error);
    }
}


export const userCredits = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.fails("User Not Exist", "User Not Exist", 404);
        }

        res.success({ credits: user.creditBalance, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        next(error);
    }
}

type RazorpayOrderCreateRequestBody = {
    amount: number;
    currency: string;
    receipt: any;
    notes?: Record<string, string>;
    payment_capture?: number;
    partial_payment?: boolean;
};


export const paymentRazorpay = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, planId } = req.body;
        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.fails("User Not Exist", "User Not Exist", 404);
        }

        let credits, plan, amount, date;
        switch (planId) {
            case 'Basic':
                {
                    plan = 'Basic';
                    credits = 100;
                    amount = 10;
                    break;
                };
            case 'Advance':
                {
                    plan = 'Advance';
                    credits = 500;
                    amount = 50;
                    break;
                };
            case 'Business':
                {
                    plan = 'Business';
                    credits = 5000;
                    amount = 250;
                    break;
                };
            default:
                return res.fails("Plan not Found", "Plan not Found")
        }
        date = Date.now();
        const transactionData = {
            userId, plan, amount, credits, date
        }
        const newTransaction = await transactionModel.create(transactionData);

        const options: RazorpayOrderCreateRequestBody = {
            amount: amount * 100, // Razorpay expects amount in पैसा
            currency: config.currency,
            receipt: newTransaction._id! // we can use this at vefify time
        }
        await RazorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.fails("razorpay error", "Razorpay error");
            }
            res.success({ order })
        })

    } catch (error) {
        next(error);
    }
}


export const verifyRazorpay = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { razorpay_order_id } = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        if (orderInfo.status === 'paid') {
            const transactionData = await transactionModel.findById(orderInfo.receipt);
            if (!transactionData) {
                return res.success("Transaction data not exist", "Transaction data not exist");
            }

            if (transactionData.payment) {
                return res.success("Payment Failed", "Payment Failed")
            }
            const userData = await userModel.findById(transactionData.userId);

            const creditBalance = userData?.creditBalance! + transactionData.credits;
            await userModel.findByIdAndUpdate(userData?._id, { creditBalance });
            await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true });
            res.success({ userId: userData?._id, creditBalance }, "Credit Added")
        } else {
            res.fails("Credit Added");
        }

    } catch (error) {
        next(error);
    }
}