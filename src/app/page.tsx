import React, { Suspense } from "react";
import GroupsGrid from "../../components/tasks/groups-grid";
import Loading from "../../layouts/loading";


export default function Home() {
  return (
    <div className="grid grid-flow-row h-dvh font-[family-name:var(--font-geist-sans)] p-6 md:p-10 ">
      <main className="">
        <h1>Task Board</h1>
        
        <Suspense fallback={<Loading label="Loading Groups..."/>}>
          <GroupsGrid />
        </Suspense>
        
      </main>
    </div>
  );
}
