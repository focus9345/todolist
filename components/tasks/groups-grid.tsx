import React from 'react';
import Group from './group';
/**
 * Container for many groups.
 * 
 * 
 */
const GroupsGrid: React.FC = () => {
    return (
        <section className="mt-6 p-6 border border-zinc-700 rounded-md">
        <div className="grid md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4 xl:gap-4 size-auto">
            <Group />
            <Group />
            <Group />
            <Group />
        </div>
        </section>
    )
}
export default GroupsGrid;