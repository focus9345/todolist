import React, { Suspense } from "react";
import Task from "./task";
import { GroupType, TaskType } from "../../types/types";
import LoadingSpinner from "../../layouts/loading";
import { TASKS } from "../../db/task";
/**
 * Groups that will hold tasks for categorization.
 *
 *
 */
interface GroupTypeProps {
  group: GroupType;
}
interface TasksTypeProps {
  grouptask: TaskType[] | undefined;
}

async function Tasks({ grouptask }: TasksTypeProps) {
    //console.log('GT: ' + JSON.stringify(grouptask));
  const tasks: TaskType[] = TASKS;
  const taskIds = grouptask?.map(task => task.id);
  const showTasks = tasks.filter((task) => {
    return taskIds?.includes(task.id);
  });
  //console.log(showTasks);
  if (showTasks.length === 0) {
    return <p>No groups to show.</p>;
  } else if (showTasks.length > 0) {
    return showTasks.map((task) => {
      return <Task key={task.id} task={task} />;
    });
  } else {
    return <p>Groups are unable to show at this time.</p>;
  }
}

const Group: React.FC<GroupTypeProps> = ({ group }) => {
  return (
    <>
    <section className="border border-zinc-500/40 rounded-md grid grid-rows gap-2 px-2 justify-center sm:max-w-[340px] max-w-full">
      <h3 className="text-center text-lg py-1"> {group.title}</h3>
      <Suspense fallback={<LoadingSpinner label="Loading Groups..." />}>
        <Tasks grouptask={group.tasks} />
      </Suspense>
    </section>
    </>
  );
};
export default Group;
