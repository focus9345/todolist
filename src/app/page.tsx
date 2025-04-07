'use client'
import React, { Suspense } from "react";
import Loading from "../../layouts/loading";
import {Button} from "@heroui/react";

import Link from 'next/link'


const Home: React.FC = () => {
  return (
    <div className="grid grid-flow-row h-dvh font-[family-name:var(--font-geist-sans)] p-6 md:p-10 ">
      <main className="">
        <h1 className="mb-2">Projects and ToDo Lists</h1>
        
        <Suspense fallback={<Loading label="Loading Groups..."/>}>
        <Link href="/project"> <Button color="primary" variant="solid" className="mb-4">
          <span className="text-2xl font-semibold">Projects</span>
          </Button>
        </Link>
        </Suspense>
        
      </main>
    </div>
  );
}

export default Home;
