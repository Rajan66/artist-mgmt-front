"use client";

import React from "react";

import moment from "moment";

import Avatar from "@/components/avatar";
import { useGetUserProfile } from "@/features/users/hooks/use-queries";

const ManagerDetail = ({ manager_id }: { manager_id: string }) => {
  const { data: manager } = useGetUserProfile(manager_id);

  const dob = manager?.data?.dob ? moment(manager?.data?.dob).format("ll") : "";
  return (
    <div className="flex flex-col md:flex-row gap-10">
      <div className="mb-4 md:mb-0">
        <Avatar profileImage={""} avatar={false} />
      </div>
      <div className="flex flex-col space-y-4">
        <div className="grid grid-cols-2">
          <span className="font-semibold opacity-90 col-span-1">Email:</span>
          <span className="col-span-1">{manager?.data?.user.email}</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="font-semibold opacity-90 col-span-1">
            Full Name:
          </span>
          <span className="col-span-1">
            {manager?.data?.first_name} {manager?.data?.last_name}
          </span>
        </div>
        <div className="grid grid-cols-2">
          <span className="font-semibold opacity-90 col-span-1">Gender:</span>
          <span className="col-span-1">{manager?.data?.gender}</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="font-semibold opacity-90 col-span-1">DOB: </span>
          <span>{dob}</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="font-semibold opacity-90 col-span-1">Phone:</span>
          <span className="col-span-1">{manager?.data?.phone}</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="font-semibold opacity-90 col-span-1">Address:</span>
          <span className="col-span-1">{manager?.data?.address}</span>
        </div>
      </div>
    </div>
  );
};

export default ManagerDetail;
