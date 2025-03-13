import { TaskType, DataTypes, TaskStatus, TaskPriority } from "../types/types";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
// local date is ISO 8601 string
const localDate: CalendarDate = today(getLocalTimeZone());
const localDateString: string = localDate.toString();
const localDueDate: string = localDate.add({ days: 4 }).toString();
const pastDueDate: string = localDate.subtract({ days: 4 }).toString();

console.log("Task localDateString: " + localDateString);

const TASKS: TaskType[] = [
  {
    id: "001",
    type: DataTypes.task,
    title: "Task 1",
    description: "You shouldn't like things because people tell you you're supposed to. You act like you want me to be your friend and then you treat me like garbage. Why’s he gotta kick the door? Friends don't lie. Nancy, seriously, you're gonna be so cool now, it's ridiculous.",
    status: TaskStatus.inprogress,
    deadline: localDueDate,
    priority: TaskPriority.low,
    group: "group-1",
    assignee: "John Snow",
    creator: "Tom Jones",
    created: localDateString,
    estimated: localDateString,
    updated: localDateString,
    tags: ["this", "that"],
    subtasks: [{ id: "0001" }, { id: "0002" }],
    dependencies: [],
    project: "project-1",
  },
  {
    id: "002",
    type: DataTypes.task,
    title: "Task 2",
    description: "basic task",
    status: TaskStatus.blocked,
    deadline: pastDueDate,
    priority: TaskPriority.critical,
    group: "group-1",
    assignee: "John Snow",
    creator: "Tom Jones",
    created: localDateString,
    estimated: localDateString,
    updated: localDateString,
    tags: ["this", "that"],
    subtasks: [{ id: "0003" }, { id: "0002" }],
    dependencies: [{ id: "001" }],
    project: "project-1",
  },
  {
    id: "003",
    type: DataTypes.task,
    title: "Task 3",
    description: "basic task",
    status: TaskStatus.opened,
    deadline: localDueDate,
    priority: TaskPriority.medium,
    group: "group-1",
    assignee: "John Snow",
    creator: "Tom Jones",
    created: localDateString,
    estimated: localDateString,
    updated: localDateString,
    tags: ["this", "that"],
    subtasks: [{ id: "0003" }, { id: "0002" }],
    dependencies: [{ id: "001" }],
    project: "project-1",
  },
];

export { TASKS };
