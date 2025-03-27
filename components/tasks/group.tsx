import React from "react";
import Tasks from "./tasks";
import { useQuery } from "@tanstack/react-query";
import { GroupType, TaskType } from "../../types/types";
import LoadingSpinner from "../../layouts/loading";
import BASE_URL from "../../utils/baseurl";
/**
 * Groups that will hold tasks for categorization.
 *
 *
 */
interface GroupTypeProps {
  group: GroupType;
}
// interface TasksTypeProps {
//   grouptask: TaskType[] | undefined;
// }

const fetchTasks = async (id: string): Promise<TaskType[]> => {
  const reqInit: RequestInit = { 
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
};
  const response = await fetch(`${BASE_URL}/api/tasksbygroup?groupID=${id}`, reqInit);
  if (!response.ok) {
    throw new Error(`Error fetching tasks: ${response.statusText}`);
  }
  const data = await response.json();
  //console.log('Task Data: ' + JSON.stringify(data.data));
  return data.data;
};

const Group: React.FC<GroupTypeProps> = ({ group }) => {
  const groupID = String(group._id);
  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery<TaskType[]>({
    queryKey: ['tasks', groupID], // Query key
    queryFn: () => fetchTasks(groupID),
    enabled: !!group._id,
  });

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
