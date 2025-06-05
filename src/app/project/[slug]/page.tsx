"use client";
import React, { Suspense } from "react";
import { useProjectsData } from "../../../../hooks/projects";
import GroupsGrid from "../../../../components/tasks/groups-grid";
import Loading from "../../../../layouts/loading";
import { ProjectModelType } from "../../../../models/project";
import BackButton from "../../../../layouts/ui/backbutton";
import { useParams } from "next/navigation";
import Link from "next/link";
import SidebarRight from "../../../../layouts/sidebarright";

/* This component displays a single project and its associated groups.
 * It fetches project data using a custom hook and displays the project title,
 * along with a grid of groups related to that project.
 * TODO: Jest Unit Testing needed
*/
const Project: React.FC = () => {
  const { data, isLoading, isError } = useProjectsData();
  const params = useParams();
  const slug =
    params?.slug && typeof params.slug === "string" ? params.slug : null;
  const projects: ProjectModelType[] | null = data || null;
  const project = projects?.find((project) => project.slug === slug) || null;

  if (!slug) {
    return (
      <p>
        Error, Sorry please return to <Link href="/project">projects</Link>{" "}
        page.
      </p>
    );
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
    <div className="flex">
      <div className="w-full overflow-x-auto ">
        <div className="sm:h-[calc(99vh-60px)] overflow-auto ">
          <div className="w-full flex justify-center mx-auto overflow-auto h-[calc(100vh - 60px)] overflow-y-auto relative">
            <div className="w-full md:max-w-6xl">
              <main className="p-6 md:p-10">
                <div className="flex justify-between gap-4">
                  <div>
                    <h1>{project.title}</h1>
                  </div>
                  <div>
                    <BackButton />
                  </div>
                </div>
                <Suspense fallback={<Loading label="Loading Groups..." />}>
                  <GroupsGrid projectId={project._id} />
                </Suspense>
              </main>
            </div>
          </div>
        </div>
      </div>
      <SidebarRight projectId={project._id} />
    </div>
  );
};

export default Project;
