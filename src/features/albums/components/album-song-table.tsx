import React from "react";

import CustomDropdown from "@/components/dropdown";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { TSong } from "@/features/songs/types/song.type";

interface AlbumSongTableProps {
  songs: TSong[];
}

const AlbumSongTable = ({ songs }: AlbumSongTableProps) => {
  return (
    <Table>
      <thead>
        <TableRow className="opacity-80 hover:bg-background">
          <TableHead className="w-12 text-left">#</TableHead>
          <TableHead className="text-left">Title</TableHead>
          <TableHead className="text-center">Genre</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </thead>
      <TableBody>
        {songs?.map((song, index) => (
          <TableRow key={song?.id} className="border-b-0 rounded-full">
            <TableCell className="w-12 text-left py-4">{index + 1}</TableCell>
            <TableCell className="text-left py-4">{song?.title}</TableCell>
            <TableCell className="text-center py-4">{song?.genre}</TableCell>
            <TableCell className="text-right py-4">
              <CustomDropdown song={song} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AlbumSongTable;
