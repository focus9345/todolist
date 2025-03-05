export type GroupType= {
    id: string;
    title: string;
    description: string;
    group: string;
    completed: boolean;
    active: boolean;
    date: string;
    project: string;
    tasks: TaskType[];
}    

export type TaskType = {
    id: string;
    title: string;
    description: string;
    status: string;
    deadline: string;
    priority: string;
    group: string;
    assignee: string;
    creator: string;
    created: string;
    estimated: string;
    updated: string;
    completed: boolean;
    deleted: boolean;
    archived: boolean;
    tags: string[];
    subtasks: SubtaskType[];
    dependencies: string[];
    date: string;
    project: string;
}

export type SubtaskType = {
    id: string;
    title: string;
    description: string;
    status: string;
    deadline: string;
    priority: string;
    group: string;
    assignee: string;
    creator: string;
    created: string;
    updated: string;
    completed: boolean;
    deleted: boolean;
    archived: boolean;
    tags: string[];
    date: string;
    project: string;
}