import React from "react";
import GroupsGrid from "../../components/tasks/groups-grid";

export default function Home() {
  return (
    <div className="grid grid-flow-row h-dvh font-[family-name:var(--font-geist-sans)] p-6 md:p-10 ">
      <main className="">
        <h1>Hello World</h1>
        <GroupsGrid />
      </main>
    </div>
  );
}
