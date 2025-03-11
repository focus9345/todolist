import { CalendarDate } from '@internationalized/date'

export enum DataTypes {
    group = 'group',
    task = 'task',
    subtask = 'subtask',
}
export enum TaskStatus {
    open = 'open',
    inprogress = 'inprogress',
    completed = 'completed',
    archived = 'archived',
}
export enum TaskPriority {
    low = 'low',
    medium = 'medium',
    high = 'high',
    critical = 'critical',
}

export type GroupType = {
    id: string;
    type?: DataTypes.group;
    title?: string | null;
    description?: string;
    group?: string;
    completed?: boolean;
    active?: boolean;
    date?: CalendarDate;
    project?: string;
    tasks?: TaskType[];
}    

export type TaskType = {
    id: string;
    type?: DataTypes.task;
    title?: string;
    description?: string;
    status?: TaskStatus;
    deadline?: CalendarDate | null;
    priority?: TaskPriority;
    group?: string | null;
    assignee?: string | null;
    creator?: string | null;
    created?: CalendarDate;
    estimated?: CalendarDate | null;
    updated?: CalendarDate | null;
    tags?: string[] | null;
    subtasks?: SubtaskType[] | null;
    dependencies?: TaskType[] | null;
    project?: string | null;
}

export type SubtaskType = {
    id: string;
    type?: DataTypes.subtask;
    title?: string;
    description?: string;
    status?: TaskStatus;
    deadline?: CalendarDate;
    priority?: TaskPriority;
    group?: string;
    assignee?: string;
    creator?: string;
    created?: CalendarDate;
    updated?: CalendarDate;
    tags?: string[];
    project?: string;
}