import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpenText, Building, Clock, Plus } from "lucide-react";
import Link from "next/link";

type Props = {
  id: string;
  deptName: string;
  email: string;
  name: string;
  total_asset: number;
  assigned: number;
};

function Asset({ id, deptName, email, name, total_asset, assigned }: Props) {
  return (
    <div className="font-poppins flex p-3 bg-gray-100 rounded-md items-start gap-3 justify-between">
      <div className="w-full relative flex flex-col justify-center gap-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Building className="bg-white text-gray-600 p-2.5 w-[58px] h-[58px] rounded-lg border-[3px]" />
          <div>
            <p className="text-xl font-semibold">{deptName}</p>
            <p className="text-sm font-semibold">{email}</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold capitalize">{name}</h2>

        <div className="flex items-center gap-4 text-sm">
          <div className="bg-green-200 w-1/2 p-1 px-2 rounded-sm">
            <h1 className="text-3xl font-semibold">{total_asset}</h1>
            <p className="text-base font-semibold">Total</p>
          </div>

          <div className="bg-red-200 w-1/2 p-1 px-2 rounded-sm">
            <h1 className="text-3xl font-semibold">{assigned}</h1>
            <p className="text-base font-semibold">Assigned</p>
          </div>
        </div>

        <Link href={`/assetDetails?id=${encodeURIComponent(id)}&assetType=${encodeURIComponent(name)}`} className="w-full">
          <Button className="hover:bg-blue-400 w-full">Detailed Info</Button>
        </Link>
      </div>
    </div>
  );
}

export default Asset;
