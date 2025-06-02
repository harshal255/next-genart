import mongoose, { Schema, Document, Model, Types } from "mongoose";


export interface ITransaction extends Document {
    userId: Types.ObjectId;
    plan: string,
    amount: number,
    credits: number,
    payment: boolean,
    date?: number,
    created_at: Date;
    deleted_at?: Date;
    modified_at: Date;
}


const transactionSchema: Schema<ITransaction> = new mongoose.Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        plan: { type: String, required: true },
        amount: { type: Number, required: true },
        credits: { type: Number, required: true },
        payment: { type: Boolean, default: false },
        date: { type: Number }
    },
    { timestamps: { createdAt: "created_at", updatedAt: "modified_at" } }
);

const transactionModel: Model<ITransaction> = mongoose.models.Transaction || mongoose.model<ITransaction>("Transaction", transactionSchema);
export default transactionModel;