'use client';
import React from "react";
import Group from "./group";
import LoadingSpinner from "../../layouts/loading";
import { GroupModelType } from "../../models/group";
import { useGroupsData } from "../../hooks/groups";
import mongoose from "mongoose";
//import { useQueryClient } from "@tanstack/react-query";
/**
 * Container for many groups.
 * 
 *
 */
interface GroupsGridProps {
  projectId: mongoose.Types.ObjectId;
}

const GroupsGrid: React.FC<GroupsGridProps> = ({ projectId }) => {
  //const queryClient = useQueryClient();
  const {
    data,
    isLoading,
    isError,
  } = useGroupsData(String(projectId));
  const groups: GroupModelType[] | null = Array.isArray(data) ? data as GroupModelType[] : null;

  // const modifiedGroups = useMemo(() => {
  //   if (!groups) return [];
  //   return groups.map((group) => ({
  //     //! not sure this is what I need to do here
  //     ...group,
  //     projectId: String(group.projectId), // Ensure projectId is a string
  //   }));
  // });

  // console.log("modifiedGroups:\n", modifiedGroups);
  // useEffect(() => {

  //   return () => {
  //     console.log("Cleaning up GroupsGrid component");
  //     queryClient.getQueryData(["groups", projectId]);
      
  //     // queryClient.resetQueries({ queryKey: ["groups", projectId] });
  //     // queryCache.invalidateQueries({ queryKey: ["groups", projectId] });
  //   };
    
  // }, [ projectId, queryClient]);

//   groups?.map((group => {
//     console.log("Group projectID:", group.projectId);
//     console.log("Project Id:", String(projectId));

//     if (group.projectId !== String(projectId)) {
//       console.log("miss match expecting to invalidate query")
//       queryClient.resetQueries({ queryKey: ["groups", projectId]});
//   }
// }));

  if (isLoading) {
    return <LoadingSpinner label="Loading Groups..." />;
  }

  if (isError || !groups) {
    return <p>No groups found.</p>;
  }

  return (
    <>
      <section className="mt-6 p-6 border border-zinc-700 rounded-md">
        <div className="grid md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4 xl:gap-4 size-auto">
          {groups?.map((group) => (
            <Group key={String(group._id)} group={group as unknown as GroupModelType} />
          ))}
        </div>
      </section>
    </>
  );
};
export default GroupsGrid;
