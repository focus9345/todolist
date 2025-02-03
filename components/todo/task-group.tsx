import React from 'react';

interface Props {
  name: string;
}

const TaskGroup: React.FC<Props> = ({ name }) => {
  return ( 
    <section>
        {name} 
    </section>    

)};

export default TaskGroup;