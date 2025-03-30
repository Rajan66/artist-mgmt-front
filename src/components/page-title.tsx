import Link from "next/link";

import { IconType } from "react-icons/lib";

import { Button } from "./ui/button";

interface PageTitleProps {
  title: string;
  url: string;
  btnTitle: string;
  Icon: IconType;
}

const PageTitle = ({ title, url, btnTitle, Icon }: PageTitleProps) => {
  return (
    <div className="flex justify-between w-full">
      <div>
        <h2 className="font-semibold text-2xl opacity-90">{title}</h2>
      </div>
      <Link href={url}>
        <Button variant="outline" className="flex gap-2 cursor-pointer">
          <Icon />
          {btnTitle}
        </Button>
      </Link>
    </div>
  );
};

export default PageTitle;
