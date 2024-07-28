'use client'
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {};

function AssetDetails({}: Props) {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const assetType = searchParams.get("assetType");

  const [assetDetails, setAssetDetails] = useState<any[]>([]);

  useEffect(() => {
    const fetchAssetDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASEURL}/api/v1/get-asset-detail`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              deptId: id,
              asset_type: assetType,
            }),
          }
        );

        const result = await response.json();

        if (result.success) {
          toast.success(`${result.msg}`, {
            duration: 5000,
          });
          setAssetDetails(result.data);
        } else {
          toast.error(`${result.msg}`, {
            duration: 5000,
          });
        }
      } catch (error: any) {
        console.error(error.message);
      }
    };

    fetchAssetDetails();
  }, []);

  const tableRows = assetDetails?.map((data: any, index: number) => (
      <TableRow key={index} className="h-20 text-gray-700 font-semibold border">
        <TableCell className="h-20 border font-semibold text-base sm:text-lg text-center">
          {data.type}
        </TableCell>
        <TableCell className="h-20 border font-semibold text-base sm:text-lg text-center">
          {data.uniqueId}
        </TableCell>
        <TableCell className="h-20 border font-semibold text-base sm:text-lg text-center">
          {data.createdAt}
        </TableCell>
        <TableCell className={`h-20 border font-semibold ${data.vacant ? 'bg-green-100' : 'bg-red-100'} text-base sm:text-lg text-center`}>
          {data.vacant? 'available' : 'unavailable'}
        </TableCell>
        <TableCell className="h-20 border font-semibold text-base sm:text-lg text-center">
          {data.assignedToDept}
        </TableCell>
      </TableRow>
    ));

  return (
    <section className="font-poppins p-4">
      <Table>
        <TableCaption>Asset Data</TableCaption>
        <TableHeader>
          <TableRow className="h-20 sm:text-lg border-gray-700">
            <TableHead className="sm:w-[100px] md:w-[150px] border text-center">
              Type
            </TableHead>
            <TableHead className="sm:w-[150px] md:w-[200px] border text-center">
              UniqueId
            </TableHead>
            <TableHead className="sm:w-[150px] md:w-[200px] border md:text-center">
              CreatedAt
            </TableHead>
            <TableHead className="sm:w-[150px] md:w-[200px] border md:text-center">
              Vacant
            </TableHead>
            <TableHead className="sm:w-[150px] md:w-[200px] border md:text-center">
              Department
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{tableRows}</TableBody>
      </Table>
    </section>
  );
}

export default AssetDetails;
