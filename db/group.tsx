import { GroupType, DataTypes } from "../types/types";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";

// local date is ISO 8601 string
const localDate: CalendarDate = today(getLocalTimeZone());
const localDateString: string = localDate.toString();

const GROUPS: GroupType[] = [
    {
        id: '1',
        type: DataTypes.group,
        title: 'Group 1',
        description: 'Group 1 Description',     
        group: 'group-1',
        completed: false,
        active: true,
        date: localDateString,
        project: 'project-1',
        tasks: [
            {
                id: '001',
            },
            {
                id: '002',
            },
        ]
    },
    {
        id: '2',
        type: DataTypes.group,
        title: 'Group 2',
        description: 'Group 1 Description',     
        group: 'group-2',
        completed: false,
        active: true,
        date: localDateString,
        project: 'project-1',
        tasks: [
            {
                id: '005',
            },
            {
                id: '003',
            },
        ]
    },
]

export { GROUPS };