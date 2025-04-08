"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import ExportButton from "@/features/csv/components/export-button";
import ImportButton from "@/features/csv/components/import-button";

import { Button } from "./ui/button";

interface PageTitleProps {
  title: string;
  url?: string;
  btnTitle: string;
  Icon: React.ReactNode;
  isCSV?: boolean;
}

const PageTitle = ({
  title,
  url,
  btnTitle,
  Icon,
  isCSV = false,
}: PageTitleProps) => {
  const router = useRouter();
  return (
    <div className="flex justify-between w-full">
      <h2 className="font-semibold text-2xl opacity-90">{title}</h2>
      <div className="flex gap-4">
        {isCSV && (
          <>
            <ImportButton />
            <ExportButton />
          </>
        )}
        {url ? (
          <Link href={url}>
            <Button variant="outline" className="flex gap-2 cursor-pointer">
              {Icon}
              {btnTitle}
            </Button>
          </Link>
        ) : (
          <Button
            variant="outline"
            className="flex gap-2 cursor-pointer"
            onClick={() => router.back()}
          >
            {Icon}
            {btnTitle}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PageTitle;
