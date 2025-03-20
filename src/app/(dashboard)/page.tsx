"use client";
import React, { useEffect } from "react";

import { getSongs } from "@/features/songs/actions/get";

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
