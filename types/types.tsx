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
    date?: Date;
    project?: string;
    tasks?: TaskType[];
}    

export type TaskType = {
    id: string;
    type?: DataTypes.task;
    title?: string;
    description?: string;
    status?: TaskStatus;
    deadline?: Date;
    priority?: TaskPriority;
    group?: string;
    assignee?: string;
    creator?: string;
    created?: Date;
    estimated?: Date;
    updated?: Date;
    tags?: string[];
    subtasks?: SubtaskType[];
    dependencies?: TaskType[];
    project?: string;
}

export type SubtaskType = {
    id: string;
    type?: DataTypes.subtask;
    title?: string;
    description?: string;
    status?: TaskStatus;
    deadline?: Date;
    priority?: TaskPriority;
    group?: string;
    assignee?: string;
    creator?: string;
    created?: Date;
    updated?: Date;
    tags?: string[];
    project?: string;
}