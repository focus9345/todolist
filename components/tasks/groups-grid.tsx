'use client';
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Group from "./group";
import LoadingSpinner from "../../layouts/loading";
import { GroupType } from "../../types/types";
import BASE_URL from "../../utils/baseurl";
/**
 * Container for many groups.
 *
 *
 */

const fetchGroups = async (): Promise<GroupType[]> => {
  const response = await fetch(BASE_URL + "/api/group", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Error fetching groups: ${response.statusText}`);
  }
  const data = await response.json();
  console.log('Group Data: ' + JSON.stringify(data.data));
  return data.data;
};

const GroupsGrid: React.FC = () => {
  const {
    data: groups,
    isLoading,
    isError,
  } = useQuery<GroupType[]>({
    queryKey: ["groups"], // Query key
    queryFn: fetchGroups,
  });

  if (isLoading) {
    return <LoadingSpinner label="Loading Groups..." />;
  }

  if (isError || !groups) {
    return <p>Failed to load groups.</p>;
  }

  return (
    <>
      <section className="mt-6 p-6 border border-zinc-700 rounded-md">
        <div className="grid md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4 xl:gap-4 size-auto">
          {groups?.map((group: GroupType) => (
            <Group key={String(group._id)} group={group} />
          ))}
        </div>
      </section>
    </>
  );
};
export default GroupsGrid;
