"use client";

import { useState } from "react";

import DataTable from "@/components/data-table";
import { columns } from "@/features/users/components";

import { useGetUserProfiles } from "../hooks/use-queries";
import { TManager } from "../types/user-profile";

const ManagerTable = () => {
  const [pageIndex, setPageIndex] = useState(1);

  const handlePageChange = (newPageIndex: number) => {
    setPageIndex(newPageIndex);
  };

  const { data } = useGetUserProfiles(pageIndex);

  return (
    <DataTable<TManager, string[]>
      columns={columns}
      data={(data?.data ?? []) as TManager[]}
      searchFilter={{
        column: "first_name",
        placeholder: "Search by first name...",
      }}
      pageIndex={pageIndex}
      onPaginationChange={handlePageChange}
    />
  );
};

export default ManagerTable;
