'use client';
import { useQuery } from "@tanstack/react-query";
import { TaskModelType } from "../models/task";
import BASE_URL from "../utils/baseurl";

interface FetchTasksResponse {
    data: TaskModelType[];
}

const fetchTasks = async (groupId: string): Promise<TaskModelType[]> => {
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
    return useQuery<TaskModelType[]>({
        queryKey: ["tasks"], // Query key
        queryFn: () => fetchTasks(groupId),
        enabled: !!groupId,
        staleTime: 1000 * 60 * 30, // 30 minutes
      });
  }

  export { useTasksData };