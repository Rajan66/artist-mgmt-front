import React from "react";

import { HelpCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Header = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5" />
          Getting Started
        </CardTitle>
        <CardDescription>
          Essential information for artist managers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>Welcome to the VoxCloud! As an artist manager, you can:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Create and manage artist profiles with detailed information</li>
          <li>Upload, organize, and manage albums and individual tracks</li>
          <li>
            View analytics including total counts, recent uploads, and monthly
            trends
          </li>
          <li>Quickly import or export songs using CSV for bulk management</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default Header;
