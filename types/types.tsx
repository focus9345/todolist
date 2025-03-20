//import mongoose from 'mongoose';
import { Document } from "mongoose";
// Definition of the types for the data in the application
export enum DataTypes {
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
 //   _id?: mongoose.Types.ObjectId,
    type: DataTypes.group;
    title: string;
    description?: string;
    group?: string;
    completed?: boolean;
    active?: boolean;
    date?: string;
    project?: string;
    tasks?: TaskType[];
}    

export type TaskType = Document & {
    //_id?: mongoose.Types.ObjectId,
    type?: DataTypes.task;
    title?: string;
    description?: string;
    status?: TaskStatus;
    deadline?: string;
    priority?: TaskPriority;
    group?: string;
    assignee?: string;
    creator?: string;
    estimated?: string;
    tags?: string[];
    subtasks?: SubtaskType[];
    dependencies?: TaskType[];
    project?: string;
}

export type SubtaskType = Document & {
    //_id?: mongoose.Types.ObjectId,
    type?: DataTypes.subtask;
    title?: string;
    description?: string;
    status?: TaskStatus;
    deadline?: string;
    priority?: TaskPriority;
    group?: string;
    assignee?: string;
    creator?: string;
    created?: string;
    tags?: string[];
    project?: string;
}