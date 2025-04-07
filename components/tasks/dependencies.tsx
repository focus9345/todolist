import React from 'react';
import {Chip} from "@heroui/react";
import { TaskModelType } from "../../models/task"; 

/**
 * Dependencies that will hold tasks for categorization.
 * 
 *  
 */
interface Dependencies {
    id: string;
}

interface DependenciesProps {
    dependencies: TaskModelType[];
}

const Dependencies: React.FC<DependenciesProps> = ({ dependencies }) => {

return (
    <div className="flex gap-2 mb-2">
        <p className="text-tiny font-semibold">Dependency: task to complete first</p><br />
        {dependencies.map((dependency, index) => (
            <Chip key={index} className="bg-primary-100 text-primary-600" color="primary" variant="light" size="sm">
                {dependency._id && String(dependencies._id)}
            </Chip>
        ))}
    </div>
);

}
export default Dependencies;
// Compare this snippet from components/tasks/tasklist.tsx: