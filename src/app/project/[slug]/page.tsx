'use client'
import React, { Suspense } from "react";
import { useProjectsData } from "../../../../hooks/projects";
import GroupsGrid from "../../../../components/tasks/groups-grid";
import Loading from "../../../../layouts/loading";
import { ProjectModelType } from "../../../../models/project";
import BackButton from "../../../../layouts/ui/backbutton";
import { useParams } from "next/navigation";
import Link from 'next/link';

const Project: React.FC =  () => {
  const { data, isLoading, isError } = useProjectsData();
  const params = useParams();
  const slug = params?.slug && typeof params.slug === "string" ? params.slug : null;
  const projects: ProjectModelType[] | null = data || null;
  const project = projects?.find((project) => project.slug === slug) || null;

  if (!slug) {
    return <p>Error, Sorry please return to <Link href="/project">projects</Link> page.</p>;
  }

  if (isLoading) {
    return <Loading label="Loading Projects..." />;
  }

  if (isError || !projects) {
    return <p>Failed to load projects.</p>;
  }

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
