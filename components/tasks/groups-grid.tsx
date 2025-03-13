import React, { Suspense } from "react";
import Group from "./group";
import { GROUPS } from "../../db/group";
import LoadingSpinner from "../../layouts/loading";
import { GroupType } from "../../types/types";
/**
 * Container for many groups.
 *
 *
 */
async function Groups() {
  const groups: GroupType[] = await GROUPS;
  if (groups.length === 0) {
    return <p>No groups to show.</p>;
  } else if (groups.length > 0) {
    return groups.map((group) => {
      return <Group key={group.id} group={group} />;
    });
  } else {
    return <p>Groups are unable to show at this time.</p>;
  }
}

const GroupsGrid: React.FC = () => {
  return (
    <>
      <section className="mt-6 p-6 border border-zinc-700 rounded-md">
        <div className="grid md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4 xl:gap-4 size-auto">
          <Suspense fallback={<LoadingSpinner label="Loading Groups..." />}>
            <Groups />
          </Suspense>
        </div>
      </section>
    </>
  );
};
export default GroupsGrid;
