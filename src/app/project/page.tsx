'use client';
import React from "react";
import LoadingSpinner from "../../../layouts/loading";
import { ProjectModelType } from "../../../models/project";
import { useProjectsData } from "../../../hooks/projects";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link } from "@heroui/react";

const Project: React.FC<ProjectModelType> = () => {
    const {
            data: projects,
            isLoading,
            isError,
          } = useProjectsData();
    
      if (isLoading) {
        return <LoadingSpinner label="Loading Projects..." />;
      }
    
      if (isError || !projects) {
        return <p>Failed to load projects.</p>;
      }
  return (
    <>
      <section className="mt-6 p-6 border border-zinc-700 rounded-md">
        <div className="grid md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4 xl:gap-4 size-auto">
          {projects.map((project) => (
            <Card key={String(project._id)}>
              <CardHeader>
                <h3>{project.title}</h3>
              </CardHeader>
              <Divider />
              <CardBody>
                <p className="text-tiny">{project.description}</p>
              </CardBody>
              <Divider />
              <CardFooter>
                <Link href={`/project/${project.slug}`} color="primary">View {project.title}</Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}       
export default Project;