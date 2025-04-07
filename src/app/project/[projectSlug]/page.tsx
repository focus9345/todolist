"use client";
import React, { Suspense } from "react";
import { useProjectsData } from "../../../../hooks/projects";
import GroupsGrid from "../../../../components/tasks/groups-grid";
import Loading from "../../../../layouts/loading";
import { ProjectModelType } from "../../../../models/project";
import BackButton from "../../../../layouts/ui/backbutton";


interface ProjectProps {
  params: { slug: string };
}

const Project: React.FC<ProjectProps> = ({ params }) => {
  const { slug } = params;
  const { data, isLoading, isError } = useProjectsData();
  const projects: ProjectModelType[] | null = data || null;

  if (isLoading) {
    return <Loading label="Loading Projects..." />;
  }

  if (isError || !projects) {
    return <p>Failed to load projects.</p>;
  }
  const project = projects.find((project) => project.slug === slug);

  if (!project) {
    return <p>Project not found.</p>;
  }
  return (
    <div className="grid grid-flow-row h-dvh font-[family-name:var(--font-geist-sans)] p-6 md:p-10 ">
      <main className="">
        <div className="flex justify-between gap-4">
        <div><h1>{project.title}</h1></div>
        <div><BackButton /></div>
        </div>
        <Suspense fallback={<Loading label="Loading Groups..." />}>
        
          <GroupsGrid projectId={project._id} /> 
        </Suspense>
      </main>
    </div>
  );
};

export default Project;
