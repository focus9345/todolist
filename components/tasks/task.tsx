'use client';
import React from 'react';
import {Card, CardHeader, CardBody, CardFooter, Button} from "@heroui/react";
import { TaskType } from "../../types/types";

/**
 * Groups that will hold tasks for categorization.
 * 
 * 
 */
interface TaskTypeProps {
    task: TaskType;
}

const Task: React.FC<TaskTypeProps> = ( { task }) => {
    const [isFollowed, setIsFollowed] = React.useState(false);
    return (
        <Card className="max-w-[340px] mb-5">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{ task.title }</h4>
            <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
          </div>
        </div>
        <Button
          className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>Frontend developer and UI/UX enthusiast. Join me on this coding adventure!</p>
        <span className="pt-2">
          #FrontendWithZoey
          <span aria-label="computer" className="py-2" role="img">
            💻
          </span>
        </span>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">4</p>
          <p className=" text-default-400 text-small">Following</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">97.1K</p>
          <p className="text-default-400 text-small">Followers</p>
        </div>
      </CardFooter>
    </Card>
    )
}
export default Task;