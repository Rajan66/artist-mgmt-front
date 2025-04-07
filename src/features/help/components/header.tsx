"use client";

import React from "react";

import { HelpCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUser } from "@/utils/get-user";

const Header = () => {
  const user = getUser();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5" />
          Getting Started
        </CardTitle>
        <CardDescription>Essential informations </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {user?.role === "artist" && (
          <>
            <p>Welcome to VoxCloud! As an Artist, you can:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Create and update your artist profile</li>
              <li>Upload, organize, and manage your own albums and songs</li>
              <li>Track your personal analytics and trends</li>
              <li>Bulk import/export your songs using CSV</li>
            </ul>
          </>
        )}

        {(user?.role === "artist_manager" || user?.role === "super_admin") && (
          <>
            <p>
              Welcome to VoxCloud! As a{" "}
              {user?.role === "super_admin" ? "Super Admin" : "Artist Manager"},
              you can:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Create and manage artist profiles</li>
              <li>Upload, organize, and manage albums and tracks</li>
              <li>View analytics across artists</li>
              <li>Import/export content in bulk via CSV</li>
              {user.role === "super_admin" && (
                <>
                  <li>Ban, edit, or delete any artist or manager</li>
                  <li>Manage platform-wide data and activity</li>
                </>
              )}
            </ul>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Header;
