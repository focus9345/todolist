import React from 'react';
import {Chip} from "@heroui/react";
import { TaskType } from "../../types/types";
import { TASKS } from "../../db/task";
/**
 * Dependencies that will hold tasks for categorization.
 * 
 *  
 */
interface Dependencies {
    id: string;
}

interface DependenciesProps {
    dependencies: Dependencies[];
}

const Dependencies: React.FC<DependenciesProps> = ({ dependencies }) => {
const taskNames: TaskType[] = TASKS.map(task => ({id: task.id, title: task.title}));
return (
    <div className="flex gap-2 mb-2">
        <p className="text-tiny font-semibold">Dependency: task to complete first</p><br />
        {dependencies.map((dependency, index) => (
            <Chip key={index} className="bg-primary-100 text-primary-600" color="primary" variant="light" size="sm">
                {dependency.id && taskNames.find(task => task.id === dependency.id)?.title}
            </Chip>
        ))}
    </div>
);

}
export default Dependencies;
// Compare this snippet from components/tasks/tasklist.tsx: