import React from 'react';

interface Props {
  name: string;
}

const AddTaskForm: React.FC<Props> = ({ name }) => {
  return ( 
    <section>
        {name} 
    </section>    

)};

export default AddTaskForm;