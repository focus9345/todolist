import React from "react";
/**
 * Tasks that will hold task for categorization.
 *
 *
 */
const Tasks: React.FC = () => {
  return (
    <section className="">
      <div className="p-10 border border-zinc-700 rounded-md">
        <h4>Title</h4>
        <p>Task Description</p>
        <p>Task Status</p>
        <p>Task Deadline</p>
        <p>Task Priority</p>
        <p>Task Group</p>
        <p>Task Assignee</p>
        <p>Task Creator</p>
        <p>Task Created Date</p>
        <p>Task Updated Date</p>
        <p>Task Completed Date</p>
        <p>Task Deleted Date</p>
        <p>Task Archived Date</p>
        <p>Task Tags</p>
        <div>Subtasks</div>
        <button>Edit</button>
      </div>
    </section>
  );
};
export default Tasks;
