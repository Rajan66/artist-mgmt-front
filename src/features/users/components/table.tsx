"use client";

import DataTable from "@/components/data-table";
import { columns } from "@/features/users/components";

import { useGetUserProfiles } from "../hooks/use-queries";
import { TManager } from "../types/user-profile";

const ManagerTable = () => {
  const { data } = useGetUserProfiles();

  return (
    <DataTable<TManager, string[]>
      columns={columns}
      data={(data?.data ?? []) as TManager[]}
      searchFilter={{
        column: "first_name",
        placeholder: "Search by first name...",
      }}
    />
  );
};

export default ManagerTable;
