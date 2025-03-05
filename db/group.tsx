import { GroupType } from "../types/types";

const GROUP: GroupType[] = [
    {
        id: '1',
        title: 'Group 1',
        description: 'Group 1 Description',     
        group: 'group-1',
        completed: false,
        active: true,
        date: '2022-01-01',
        project: 'project-1',
        tasks: [
            {
                id: '1',
            }
        ]
    },
]

export { GROUP };