import mongoose, { Schema } from "mongoose";
import { UserRoles } from "../types/types";

const userSchema: Schema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: UserRoles.user,
            required: true,
        },
        active: {
            type: Boolean,
            required: false,
        },
    
    }, { timestamps: true, autoIndex: true },);
    
    type UserType = typeof userSchema;
    const User = mongoose.models.PUser || mongoose.model("User", userSchema);
    
    export default User;
    export type { UserType };