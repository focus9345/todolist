import React from "react";
import { TaskStatus } from "../../types/types";
import {
  FaGhost,
  FaEnvelopeOpen,
  FaEnvelopeOpenText,
  FaCloud,
  FaRocket,
  FaRoadBarrier,
  FaThumbsDown,
  FaThumbsUp,
  FaTrafficLight,
  FaTrophy,
  FaClapperboard,
  FaPenRuler,
  FaFlask,
} from "react-icons/fa6";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
/**
 * Status shows users the status of a task.
 *
 *
 */

function AssignIcon(status: TaskStatus) {
  let icon;
  let bgcolor = "bg-primary-300";
  switch (status) {
    case TaskStatus.opened:
      icon = <FaEnvelopeOpen />;
      bgcolor = "bg-stone-700";
      break;
    case TaskStatus.reopened:
      icon = <FaEnvelopeOpenText />;
      bgcolor = "bg-zinc-700";
      break;
    case TaskStatus.inprogress:
      icon = <FaRocket />;
      bgcolor = "bg-indigo-700";
      break;
    case TaskStatus.inreview:
      icon = <FaClapperboard />;
      bgcolor = "bg-blue-700";
      break;
    case TaskStatus.intest:
      icon = <FaPenRuler />;
      bgcolor = "bg-sky-700";
      break;
    case TaskStatus.blocked:
      icon = <FaRoadBarrier />;
      bgcolor = "bg-rose-700";
      break;
    case TaskStatus.pending:
      icon = <FaTrafficLight />;
      bgcolor = "bg-cyan-700";
      break;
    case TaskStatus.completed:
      icon = <FaTrophy />;
      bgcolor = "bg-emerald-700";
      break;
    case TaskStatus.abandoned:
      icon = <FaGhost />;
      bgcolor = "bg-slate-400";
      break;
    case TaskStatus.rejected:
      icon = <FaThumbsDown />;
      bgcolor = "bg-red-700";
      break;
    case TaskStatus.accepted:
      icon = <FaThumbsUp />;
      bgcolor = "bg-green-700";
      break;
    case TaskStatus.archived:
      icon = <FaCloud />;
      bgcolor = "bg-zinc-500";
      break;
    default:
      icon = <FaFlask />;
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

const Status: React.FC<{ status: TaskStatus }> = ({ status }) => {
  return (
    <>
      <Popover>
        <PopoverTrigger>{AssignIcon(status)}</PopoverTrigger>
        <PopoverContent className="bg-primary-300 text-zinc-300">
          <p className="text-tiny">{status}</p>
        </PopoverContent>
      </Popover>
    </>
  );
};
export default Status;
// Compare this snippet from components/tasks/tasklist.tsx:
