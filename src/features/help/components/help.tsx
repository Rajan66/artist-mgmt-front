"use client";

import { getUser } from "@/utils/get-user";

import { AdminFAQ, ArtistFAQ, HelpFAQ, HelpFooter, HelpHeader } from ".";

const Help = () => {
  const user = getUser();
  return (
    <div className="mx-auto pb-10 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">VoxCloud Help Center</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions and learn how to manage your
            artists effectively.
          </p>
        </div>
        <HelpHeader />
        {user?.role === "artist_manager" ? (
          <HelpFAQ />
        ) : user?.role === "super_admin" ? (
          <AdminFAQ />
        ) : (
          <ArtistFAQ />
        )}
        <HelpFooter />
      </div>
    </div>
  );
};
export default Help;
