import { TaskType, DataTypes, TaskStatus, TaskPriority } from "../types/types";
import { today, getLocalTimeZone } from "@internationalized/date";
const localDate = today(getLocalTimeZone());

console.log('localDate: ' + localDate);


const TASKS: TaskType[] = [
    {
            id: '001',
            type: DataTypes.task,
            title: 'Task 1',
            description: 'basic task',
            status: TaskStatus.open,
            deadline: localDate,
            priority: TaskPriority.high,
            group: 'group-1',
            assignee: 'John Snow',
            creator: 'Tom Jones',
            created: localDate,
            estimated: localDate,
            updated: localDate,
            tags: ['this', 'that'],
            subtasks: [{id: '0001'}, {id: '0002'}],
            dependencies: [],
            project: 'project-1',
    },
    {
        id: '002',
        type: DataTypes.task,
        title: 'Task 2',
        description: 'basic task',
        status: TaskStatus.open,
        deadline: localDate,
        priority: TaskPriority.high,
        group: 'group-1',
        assignee: 'John Snow',
        creator: 'Tom Jones',
        created: localDate,
        estimated: localDate,
        updated: localDate,
        tags: ['this', 'that'],
        subtasks: [{id: '0003'}, {id: '0002'}],
        dependencies: [{id: '001'}],
        project: 'project-1',
},
]

export { TASKS };