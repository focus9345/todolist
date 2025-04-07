import mongoose, { Schema, InferSchemaType } from "mongoose";
import { DataTypes, TaskTags, TaskStatus, TaskPriority } from "../types/types";

interface ITaskSchema {
        _id: mongoose.Types.ObjectId,
        type?: DataTypes.task;
        title?: string;
        description?: string;
        status?: TaskStatus;
        deadline?: Date;
        priority?: TaskPriority;
        assignee?: string;
        creator?: string;
        estimated?: string;
        tags?: string[];
        groupId?: mongoose.Types.ObjectId,
        subtasks?: [mongoose.Types.ObjectId];
        dependencies?: [mongoose.Types.ObjectId];
        project?: string;
        createdAt?: Date;
        updatedAt?: Date;
}
interface AddMonthsFunction {
    (date: Date, monthsToAdd: number): Date;
}

const addMonths: AddMonthsFunction = (date, monthsToAdd) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + monthsToAdd);
    return newDate;
};

const taskSchema: Schema<ITaskSchema> = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        default: DataTypes.task,
    },
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        minlength: [3, 'Title must be at least 3 characters'],
        max_length: [50, 'Title cannot be more than 50 characters'],
        match: [/^[a-zA-Z0-9 ]+$/, 'Title must be alphanumeric'],
        unique: true,
    },
    description: {
        type: String,
        required: false,
        minlength: [3, 'Description must be at least 3 characters'],
        max_length: [350, 'Description cannot be more than 350 characters'],
        match: [/^[a-zA-Z0-9 ]+$/, 'Description must be alphanumeric'],
    },
    status: {
        type: String,
        enum: Object.values(TaskStatus),
        default: TaskStatus.opened,
        required: [true, 'Please provide a status'],
    },
    deadline: {
        type: Date,
        min: [new Date(), 'Deadline must be in the future'],
        max: [addMonths((new Date()), 2), 'Deadline must up to two months in the future'],
        required: false,
    },
    priority: {
        type: String,
        enum: Object.values(TaskPriority),
        default: TaskPriority.low,
        required: [true, 'Please provide a priority'],
    },
    assignee: {
        type: String,
        required: false,
    },
    creator: {
        type: String,
        required: false,
        default: 'Fake User',
    },
    estimated: {
        type: Date,
        min: [new Date(), 'Estimated date must be in the future'],
        required: false,
    },
    tags: {
        type: [String],
        enum: Object.values(TaskTags),
        required: [true, 'Please provide at least one tag'],
        default: [TaskTags.feature],
    },
    groupId: {
        type: Schema.Types.ObjectId,
        ref: "Group",
        required: [true, 'Task must be in a group'],
    },
    subtasks: [
        {
            type: Schema.Types.ObjectId,
            ref: "Subtask",
            required: false,
        },
    ],
    dependencies: [
        {
            type: Schema.Types.ObjectId,
            ref: "Task",
            required: false,
        },
    ],
 

}, { timestamps: true, autoIndex: true },);

type TaskModelType = InferSchemaType<typeof taskSchema>;
const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
export type { TaskModelType };