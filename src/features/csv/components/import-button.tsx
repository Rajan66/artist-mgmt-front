"use client";

import React, { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useGetArtistWithUser } from "@/features/artists/hooks/use-queries";
import { getUser } from "@/utils/get-user";

import { importCSV } from "../actions/csv.action";

const ImportButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const user = getUser();
  const queryClient = useQueryClient();
  const { data: artist } = useGetArtistWithUser(user?.id);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleImport = async () => {
    if (!file) {
      toast.error("Please select a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    let url = "/api/v1/songs/csv/import/admin/";

    if (user?.role === "artist_manager") {
      url = `/api/v1/songs/csv/import/manager/${user.id}/`;
    } else if (user?.role === "artist") {
      url = `/api/v1/songs/csv/import/artist/${user.id}/`;
    }

    const response = await importCSV(url, formData);
    if (response) {
      toast.success("CSV imported successfully");
      queryClient.invalidateQueries({ queryKey: ["allSongs", 1] });
      queryClient.invalidateQueries({
        queryKey: ["artistSongs", artist?.data?.id],
      });
      queryClient.invalidateQueries({ queryKey: ["songs", user?.id] });
      setIsDialogOpen(false);
    } else {
      toast.error("Failed to import songs from CSV.");
    }
  };
  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="bg-blue-500 text-black hover:bg-blue-600">
            Import CSV
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Import CSV File</DialogTitle>
          <DialogDescription>
            Please select a CSV file to import.
          </DialogDescription>
          <Input type="file" accept=".csv" onChange={handleFileChange} />
          <Button
            className="bg-blue-500 text-black hover:bg-blue-600"
            onClick={handleImport}
          >
            Import CSV
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImportButton;
