import React from 'react';

interface Props {
  name: string;
}

const Navigation: React.FC<Props> = ({ name }) => {
  return ( 
    <section>
        {name} 
    </section>    

)};

export default Navigation;