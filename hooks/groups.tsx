'use client';
import { useQuery } from "@tanstack/react-query";
import { ProjectModelType } from "../models/project";
import BASE_URL from "../utils/baseurl";

interface FetchGroupsResponse {
  data: ProjectModelType[];
}

const fetchGroups = async (projectId: string): Promise<ProjectModelType[]> => {
  const response = await fetch(BASE_URL + `/api/group?projectId=${projectId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Error fetching groups: ${response.statusText}`);
  }
  const data: FetchGroupsResponse = await response.json();
  return data.data;
};

  const useGroupsData = (projectId: string) => {
    return useQuery<ProjectModelType[]>({
        queryKey: ["groups"], // Query key
        queryFn: () => fetchGroups(projectId),
        enabled: !!projectId,
        // Only run the query if projectId is defined
        // This prevents the query from running on the initial render
        // and only runs when projectId is available
        // This is useful for dynamic queries
        // and prevents unnecessary network requests
        staleTime: 1000 * 60 * 30, // 30 minutes
      });
  }

  export { useGroupsData };