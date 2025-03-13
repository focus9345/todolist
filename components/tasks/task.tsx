"use client";
import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import { TaskType } from "../../types/types";
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
  task: TaskType;
}

const Task: React.FC<TaskTypeProps> = ({ task }) => {

  return (
    <>
    <Card className="mb-5 min-w-full bg-amber-900/10 border-1 border-zinc-500/50" >
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {task.title}
            </h4>
          </div>
        </div>
        {/* <Button
          className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button> */}
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p className="pb-2"> {task.description}</p>
        {task.dependencies && <Dependencies dependencies={task.dependencies} />}
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
