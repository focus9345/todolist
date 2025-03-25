import mongoose, { Schema } from "mongoose";
import { GroupType, DataTypes } from "../types/types";

const groupSchema: Schema = new mongoose.Schema<GroupType>({
    type: {
        type: String,
        required: true,
        default: DataTypes.group,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: false,
    },
    groupslug: {
        type: String,
        required: false,
    },
    completed: {
        type: Boolean,
        required: false,
    },
    active: {
        type: Boolean,
        required: false,
    },
    date: {
        type: String,
        required: false,
    },
    projectID: {
        type: String,
        required: false,
    },

}, { timestamps: true, autoIndex: true },);


const Group = mongoose.models.Group || mongoose.model<GroupType>("Group", groupSchema);

export default Group;

