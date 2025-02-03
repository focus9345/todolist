import Link from 'next/link';
import { Button } from "@nextui-org/react";
 
  const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <p><br /><Link href="/">
      <Button
        color="warning" 
      >
        Return Home
      </Button>
      </Link>
      </p>
    </div>
  )
}

export default NotFound;
