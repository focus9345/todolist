//import mongoose from 'mongoose';
import mongoose, { Document } from "mongoose";
// Definition of the types for the data in the application
export enum DataTypes {
    project = 'project',
    sprint = 'sprint',
    retrospective = 'retrospective',
    group = 'group',
    task = 'task',
    subtask = 'subtask',
}
export enum TaskStatus {
    opened = 'opened',
    inprogress = 'inprogress',
    inreview = 'inreview',
    intest = 'intest',
    pending = 'pending',
    blocked = 'blocked',
    completed = 'completed',
    rejected = 'rejected',
    accepted = 'accepted',
    abandoned = 'abandoned',
    reopened = 'reopened',
    archived = 'archived',
}
export enum TaskPriority {
    low = 'low',
    medium = 'medium',
    high = 'high',
    critical = 'critical',
}
export enum UserRoles {
    superadmin = 'superadmin',
    admin = 'admin',
    user = 'user',
    guest = 'guest',
}
// export type to define the type of the data for ISO 8601 date string
// export type TYear = `${number}${number}${number}${number}`;
// export type TMonth = `${number}${number}`;
// export type TDay = `${number}${number}`;
// export type THours = `${number}${number}`;
// export type TMinutes = `${number}${number}`;
// export type TSeconds = `${number}${number}`;
// export type TMilliseconds = `${number}${number}${number}`;
// export type TDateISODate = `${TYear}-${TMonth}-${TDay}`;
// export type TDateISOTime = `${THours}:${TMinutes}:${TSeconds}.${TMilliseconds}`;
// export type TDateISO = `${TDateISODate}T${TDateISOTime}Z`;

export type GroupType = Document & {
    _id: mongoose.Types.ObjectId,
    type: DataTypes.group;
    title: string;
    description?: string;
    groupslug?: string;
    completed?: boolean;
    active?: boolean;
    date?: string;
    projectID?: string;
    createdAt?: Date;
    updatedAt?: Date;
}    

export type TaskType = Document & {
    _id: mongoose.Types.ObjectId,
    type?: DataTypes.task;
    title?: string;
    description?: string;
    status?: TaskStatus;
    deadline?: string;
    priority?: TaskPriority;
    assignee?: string;
    creator?: string;
    estimated?: string;
    tags?: string[];
    groupID?: mongoose.Types.ObjectId,
    subtasks?: [mongoose.Types.ObjectId];
    dependencies?: [mongoose.Types.ObjectId];
    project?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type SubtaskType = Document & {
    _id: mongoose.Types.ObjectId,
    type?: DataTypes.subtask;
    title?: string;
    description?: string;
    status?: TaskStatus;
    deadline?: string;
    priority?: TaskPriority;
    groupID?: mongoose.Types.ObjectId,
    taskID?: mongoose.Types.ObjectId,
    assignee?: string;
    creator?: string;
    created?: string;
    tags?: string[];
    project?: string;
    createdAt?: Date;
    updatedAt?: Date;
}