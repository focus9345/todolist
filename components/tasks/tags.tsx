import React from 'react';
import {Chip} from "@heroui/react";
/**
 * Tags that will hold tasks for categorization.
 * 
 *  
 */

interface TagsProps {
    tags: string[];
}

const Tags: React.FC<TagsProps> = ({ tags }) => {

return (
    <div className="flex gap-2">
        {tags.map((tag, index) => (
            <Chip key={index} color="secondary" variant="bordered" size="sm">
                {tag}
            </Chip>
        ))}
    </div>
);

}
export default Tags;
// Compare this snippet from components/tasks/tasklist.tsx: