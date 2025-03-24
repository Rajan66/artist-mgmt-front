import React from "react";
import Link from "next/link";
import { LuPlus } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { UserTable } from "@/features/users/components";

const page = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Users</h2>
        <Link href={"/users/add"}>
          <Button className="flex items-center justify-center gap-3">
            <LuPlus />
            <span>Add users</span>
          </Button>
        </Link>
      </div>
      <div className="mt-6">
        <UserTable />
      </div>
    </div>
  );
};

export default page;
