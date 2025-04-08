import React from "react";

import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { getUser } from "@/utils/get-user";

import { exportCSV } from "../actions/csv.action";

const ExportButton = () => {
  const user = getUser();

  const handleExport = async () => {
    let response = false;

    if (user?.role === "artist_manager") {
      response = await exportCSV("artist_manager", user?.id);
    } else if (user?.role === "artist") {
      response = await exportCSV("artist", user?.id);
    } else {
      response = await exportCSV("admin");
    }

    if (response) {
      toast.success("CSV exported successfully");
    } else {
      toast.error("Failed to export songs to CSV.");
    }
  };

  return (
    <div>
      <Button className="bg-green-500 text-black" onClick={handleExport}>
        Export CSV
      </Button>
    </div>
  );
};

export default ExportButton;
