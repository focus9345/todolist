"use client";
import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import { TaskModelType } from "../../models/task"; 
import Dependencies from "./dependencies";
import DueDate from "./due-date";
import Tags from "./tags";
import Status from "./status";
import Priority from "./priority";

/**
 * Task of what to do.
 *
 *
 */
interface TaskTypeProps {
  task: TaskModelType;
}

const Task: React.FC<TaskTypeProps> = ({ task }) => {
  console.log("Task: ", task);
  console.log("dueDate: ", task.deadline);
  return (
    <>
    <Card className="mb-5 w-full bg-amber-900/10 border-1 border-zinc-500/50" >
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {task.title}
            </h4>
          </div>
        </div>
  
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
      <div className="flex gap-2 mb-2">
        <p className="pb-2"> {task.description}</p>
        </div>
        
          {(task.dependencies && task.dependencies.length > 0) && <Dependencies dependencies={task.dependencies} />}
        
        <div className="flex gap-2 mb-2">
          {task.project && <span className="text-xs bg-amber-900/20 rounded-md px-2 py-1">{task.project}</span>}
          </div>
       
        {task.tags && <Tags tags={task.tags} />}
      </CardBody>
      <CardFooter className="gap-3">
          {task.status && <Status status={task.status} />}
          {task.priority && <Priority priority={task.priority} />}
          {task.deadline && <DueDate duedate={task.deadline} />}
      </CardFooter>
    </Card>
    </>
  );
};
export default Task;
