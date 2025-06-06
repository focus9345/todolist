import React from "react";
import { TaskPriority } from "../../types/types";
// import {
//   FaCloud,
//   FaCloudRain,
//   FaCloudShowersHeavy,
//   FaCloudBolt,
//   FaFlask,
// } from "react-icons/fa6";
import { LuZapOff, LuTarget, LuRadioTower, LuRadiation, LuSiren } from "react-icons/lu";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
/**
 * Priority shows users the priority of a task.
 *
 *
 */
function AssignIcon(priority: TaskPriority) {
  let icon;
  let bgcolor = "bg-primary-300";
  switch (priority) {
    case TaskPriority.low:
      icon = <LuTarget />;
      bgcolor = "bg-yellow-700";
      break;
    case TaskPriority.medium:
      icon = <LuRadioTower />;
      bgcolor = "bg-orange-700";
      break;
    case TaskPriority.high:
      icon = <LuSiren />;
      bgcolor = "bg-fuchsia-700";
      break;
    case TaskPriority.critical:
      icon = <LuRadiation />;
      bgcolor = "bg-rose-700";
      break;

    default:
      icon = <LuZapOff />;
      bgcolor = "bg-primary-300";
      break;
  }
  return (
    <button
      className={`text-zinc-300 hover:text-zinc-100 focus:outline-none rounded-full py-2 px-2 text-md leading-none ${bgcolor}`}
    >
      {icon}
    </button>
  );
}
const Priority: React.FC<{ priority: TaskPriority }> = ({ priority }) => {
  return (
    <>
      <Popover>
        <PopoverTrigger>{AssignIcon(priority)}</PopoverTrigger>
        <PopoverContent className="bg-primary-300 text-zinc-300">
          <p className="text-tiny">{priority}</p>
        </PopoverContent>
      </Popover>
    </>
  );
};
export default Priority;
