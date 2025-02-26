import React from 'react';
import Task from './task';
/**
 * Groups that will hold tasks for categorization.
 * 
 * 
 */
const Group: React.FC = () => {
    return (
        <section className="border border-zinc-700 rounded-md grid grid-rows gap-2 justify-center">
        
            <h3 className="text-center text-lg py-1">Group Name</h3>
            <Task />
            <Task />
        
        </section>
    )
}
export default Group;