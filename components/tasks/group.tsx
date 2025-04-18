import React from "react";
import Tasks from "./tasks";
import { GroupModelType } from "../../models/group";
import { TaskModelType } from "../../models/task";
import { useTasksData } from "../../hooks/tasks";
import LoadingSpinner from "../../layouts/loading";

/**
 * Groups that will hold tasks for categorization.
 *
 *
 */
interface GroupTypeProps {
  group: GroupModelType;
}
// interface TasksTypeProps {
//   grouptask: TaskType[] | undefined;
// }

const Group: React.FC<GroupTypeProps> = ({ group }) => {

  const groupId = String(group._id);
  const {
    data,
    isLoading,
    isError,
  } = useTasksData(groupId);

  const tasks = data as TaskModelType[];

  if (isLoading) {
    return <LoadingSpinner label="Loading Tasks..." />;
  }

  if (isError || !tasks) {
    return (
    <>
    <section className="border border-zinc-500/40 rounded-md grid grid-rows gap-2 px-2 justify-center sm:max-w-[340px] max-w-full">
    <h3 className="text-center text-lg py-1"> {group.title}</h3>
    <div className="text-center text-white bg-red-500 p-2 rounded-md">
    <p>Failed to find tasks for the {group.title} group.</p>
    </div>
    </section>
    </>
  );
  }
  return (
    <>
    <section className="border border-zinc-500/40 rounded-md grid grid-rows gap-2 px-2 justify-center sm:max-w-[340px] max-w-full">
      <h3 className="text-center text-lg py-1"> {group.title}</h3>
      
        <Tasks tasks={tasks} />
        
    </section>
    </>
  );
};
export default Group;
