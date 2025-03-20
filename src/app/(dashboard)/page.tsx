"use client";
import { getSongs } from "@/features/songs/actions/get";
import React, { useEffect } from "react";

const page = () => {
  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await getSongs();
    } catch (error) {
      console.error(error);
    }
  };
  return <div className="text-primary-foreground">Dashboard overview page</div>;
};

export default page;
