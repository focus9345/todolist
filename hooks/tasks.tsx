'use client';
import { useQuery } from "@tanstack/react-query";
import { TaskModelType } from "../models/task";
//import { unstable_cache } from "next/cache";
import BASE_URL from "../utils/baseurl";

interface FetchTasksResponse {
    data: TaskModelType[];
}

const fetchTasks = async (groupId: string): Promise<TaskModelType[]> => {
    const response = await fetch(BASE_URL + `/api/tasksbygroup?groupId=${groupId}`, {
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
        //cacheTime: 1000 * 60 * 10, // 10 minutes
        staleTime: 1000 * 60 * 5, // 5 minutes
        

      });
  }

  export { useTasksData };