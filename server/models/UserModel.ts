import mongoose, { Schema, Document, Model } from "mongoose";


export interface IUser extends Document {
    name: string;
    email: string,
    password: string,
    creditBalance: number,
    created_at: Date;
    deleted_at?: Date;
    modified_at: Date;
}


const userSchema: Schema<IUser> = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        creditBalance: { type: Number, default: 5 },
        created_at: { type: Date, default: Date.now },
        deleted_at: { type: Date, default: null },
        modified_at: { type: Date, default: Date.now },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "modified_at" } }
);

const userModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default userModel;