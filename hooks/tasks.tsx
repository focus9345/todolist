'use client';
import { useQuery } from "@tanstack/react-query";
import { TaskSchemaType } from "../models/task";
import BASE_URL from "../utils/baseurl";

interface FetchTasksResponse {
    data: TaskSchemaType[];
}

const fetchTasks = async (groupId: string): Promise<TaskSchemaType[]> => {
    const response = await fetch(BASE_URL + `/api/task?groupId=${groupId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
        throw new Error(`Error fetching groups: ${response.statusText}`);
    }
    const data: FetchTasksResponse = await response.json();
    return data.data;
};

  const useTasksData = (groupId: string) => {
    return useQuery<TaskSchemaType[]>({
        queryKey: ["tasks"], // Query key
        queryFn: () => fetchTasks(groupId),
        enabled: !!groupId,
        staleTime: 1000 * 60 * 30, // 30 minutes
      });
  }

  export { useTasksData };