'use client';
import { useQuery } from "@tanstack/react-query";
import { ProjectModelType } from "../models/project";
import BASE_URL from "../utils/baseurl";

const fetchProjects = async (): Promise<ProjectModelType[]> => {
    const response = await fetch(BASE_URL + "/api/project", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`Error fetching projects: ${response.statusText}`);
    }
    const data = await response.json();
    //console.log('Group Data: ' + JSON.stringify(data.data));
    return data.data;
  };

  const useProjectsData = () => {
    return useQuery({
        queryKey: ["projects"], // Query key
        queryFn: fetchProjects,
        staleTime: 1000 * 60 * 30, // 30 minutes
      });
  }

  export { useProjectsData };