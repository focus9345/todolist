'use client';
import { useQuery } from "@tanstack/react-query";
import { TaskModelType } from "../models/task";
import BASE_URL from "../utils/baseurl";

interface FetchTasksResponse {
    data: TaskModelType[];
}

const fetchTasksById = async (groupId: string): Promise<TaskModelType[]> => {
    const response = await fetch(BASE_URL + `/api/tasksbygroup?groupId=${groupId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
        throw new Error(`Error fetching tasks: ${response.statusText}`);
    }
    const data: FetchTasksResponse = await response.json();
    //console.log("Fetched tasks:", data.data);
    return data.data;
};

  const useTasksData = (groupId: string) => {
    console.log("useTasksData groupId:", groupId);
    return useQuery<TaskModelType[]>({
        queryKey: ["tasks", groupId], // Query key
        queryFn: () => fetchTasksById(groupId),
        enabled: !!groupId,
        //cacheTime: 1000 * 60 * 10, // 10 minutes
        //staleTime: 1000 * 60 * 5, // 5 minutes
        

      });
  }

  export { useTasksData };