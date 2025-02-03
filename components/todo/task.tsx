import React from 'react';


const Task: React.FC = () => {
  return ( 
    <div className="">
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
        <div>
            Subtasks
        </div>
        <button>Edit</button>
    </div>    

)};

export default Task;