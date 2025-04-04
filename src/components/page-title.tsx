"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import { Button } from "./ui/button";

interface PageTitleProps {
  title: string;
  url?: string;
  btnTitle: string;
  Icon: React.ReactNode;
}

const PageTitle = ({ title, url, btnTitle, Icon }: PageTitleProps) => {
  const router = useRouter();
  return (
    <div className="flex justify-between w-full">
      <h2 className="font-semibold text-2xl opacity-90">{title}</h2>
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
  );
};

export default PageTitle;
