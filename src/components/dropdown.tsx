"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal } from "lucide-react";
import { toast } from "react-toastify";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteSong } from "@/features/songs/actions/song.action";
import { TSong } from "@/features/songs/types/song.type";
import { getUser } from "@/utils/get-user";
import { cn } from "@/utils/response";

interface CustomDropdownProps {
  song: TSong;
  artistId?: string;
}
const CustomDropdown = ({ song, artistId }: CustomDropdownProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const manager = getUser();

  const { mutate, isPending: Deleting } = useMutation({
    mutationFn: deleteSong,
    onSuccess: () => {
      toast.success("Song deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["artistSongs", artistId] });
      queryClient.invalidateQueries({
        //@ts-ignore
        queryKey: ["albumSongs", song.album_id],
      });
      queryClient.invalidateQueries({ queryKey: ["songs", manager.id] });
      queryClient.invalidateQueries({ queryKey: ["artistAlbums"] });
    },
  });
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => router.push(`/songs/${song?.id}`)}>
            Edit song
          </DropdownMenuItem>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                {Deleting ? "Deleting..." : "Delete Song"}
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete song?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this song?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => mutate(song?.id)}
                  disabled={Deleting}
                  className={cn(buttonVariants({ variant: "destructive" }))}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CustomDropdown;
