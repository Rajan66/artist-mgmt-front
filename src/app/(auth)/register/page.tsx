import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="hidden p-6 md:block md:w-1/2">
        <Image
          src="/images/login.jpg"
          alt="Login illustration"
          width="1920"
          height="1080"
          className="h-full w-full rounded-xl object-cover"
        />
      </div>
    </div>
  );
};

export default page;
