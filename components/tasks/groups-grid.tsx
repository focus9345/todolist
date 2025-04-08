'use client';
import React from "react";
import Group from "./group";
import LoadingSpinner from "../../layouts/loading";
import { GroupModelType } from "../../models/group";
import { useGroupsData } from "../../hooks/groups";
import mongoose from "mongoose";
/**
 * Container for many groups.
 *
 *
 */
interface GroupsGridProps {
  projectId: mongoose.Types.ObjectId;
}

const GroupsGrid: React.FC<GroupsGridProps> = ({ projectId }) => {
  const {
    data,
    isLoading,
    isError,
  } = useGroupsData(String(projectId));
  const groups: GroupModelType[] | null = Array.isArray(data) ? data as GroupModelType[] : null;

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
