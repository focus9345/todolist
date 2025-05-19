import React from "react";
import Task from "./task";
import { TaskModelType } from "../../models/task";
/**
 * Tasks that will be displayed.
 *
 *
 */
interface TasksProps {
  tasks: TaskModelType[];
}

const Tasks: React.FC<TasksProps> = ({ tasks }) => {
  if (tasks.length === 0) {
    return <p>No tasks to show.</p>;
  } else if (tasks.length > 0) {
    return tasks.map((task) => {
      return <Task key={String(task._id)} task={task} />;
    });
  } else {
    return <p>Tasks are unable to show at this time.</p>;
  }
};

export default Tasks;
