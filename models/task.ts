import mongoose, { Schema } from "mongoose";
import { TaskType, DataTypes } from "../types/types";

const taskSchema: Schema = new mongoose.Schema<TaskType>({
    type: {
        type: String,
        required: true,
        default: DataTypes.task,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: false,
    },
    deadline: {
        type: String,
        required: false,
    },
    priority: {
        type: String,
        required: false,
    },
    assignee: {
        type: String,
        required: false,
    },
    creator: {
        type: String,
        required: false,
    },
    estimated: {
        type: String,
        required: false,
    },
    tags: {
        type: [String],
        required: false,
    },
    subtasks: [
        {
            type: Schema.Types.ObjectId,
            ref: "Subtask",
        },
    ],
    dependencies: [
        {
            type: Schema.Types.ObjectId,
            ref: "Task",
        },
    ],
    project: {
        type: String,
        required: false,
    },  

}, { timestamps: true },);

const Task = mongoose.models.Task || mongoose.model<TaskType>("Task", taskSchema);

export default Task;