"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddEducation from "../components/models/AddDetails";
import AddDepartment from "../components/models/AddDepartment";
import { useDeptStore } from "@/store/deptStore";
import { toast } from "react-hot-toast";
import Asset from "../components/ui/Asset";

type Props = {};

function HomePage({}: Props) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const triggerRef2 = useRef<HTMLButtonElement>(null);

  const { deptDetails, setDeptData } = useDeptStore((state) => state);
  const [currOption, setCurrOption] = useState<string>("pwd");
  const [deptNames, setDeptNames] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  const [otherDetails, setOtherDetails] = useState<any>({
    deptName: "",
    email: "",
    id: ""
  });

  useEffect(() => {
    console.log(assets);
  }, [assets]);

  useEffect(() => {
    const fetchAllAssets = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASEURL}/api/v1/getallAsset`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              name: currOption,
            }),
          }
        );

        const result = await response.json();

        if (result.success) {
          setOtherDetails((prev: any) => ({
            ...prev,
            deptName: result.data.name,
            email: result.data.email,
            id: result.data._id
          }));
          setAssets(result.data?.assetMetaData);
        } else {
          toast.error(`${result.msg}`, {
            duration: 5000,
          });
        }

        console.log("result =>", result);
      } catch (error: any) {
        console.error(error.message);
      }
    };

    fetchAllAssets();
  }, [currOption]);

  useEffect(() => {
    const fetchDepartmentNames = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASEURL}/api/v1/get-department-name`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (result.success) {
          setDeptNames(result.data);
        } else {
          toast.error(`${result.msg}`, {
            duration: 5000,
          });
        }

        console.log("result =>", result);
      } catch (error: any) {
        console.error(error.message);
      }
    };

    fetchDepartmentNames();
  }, []);

  const renderDepts = deptNames?.map((item, number) => (
    <Button
      key={number}
      variant="ghost"
      onClick={() => {
        setCurrOption(item.name);
      }}
      className="dept py-7 rounded-none text-lg group hover:bg-[rgb(205,207,207)]"
    >
      {item.name}
    </Button>
  ));

  const renderAssets = assets?.map((item, index) => (
    <Asset
      key={index}
      id={otherDetails.id}
      deptName={otherDetails.deptName}
      email={otherDetails.email}
      name={item.name}
      total_asset={item.total}
      assigned={item.assigned}
    />
  ));

  const changeTab = (tab: string) => {
    console.log("hi");
  };

  return (
    <div className="w-full flex justify-end">
      <AddEducation isUpdate={false} triggerRef={triggerRef} />
      <AddDepartment triggerRef={triggerRef2} />

      <div className="w-[40%] md:w-[30%] lg:w-[20%] flex flex-col h-screen fixed left-0 border-r-[3px] border-dashed font-poppins font-semibold">
        <div className="p-4 text-lg border-b-[3px] border-dashed">
          Departments
        </div>

        <div className="p-2">
          <Button
            variant="ghost"
            onClick={() => {
              triggerRef2.current?.click();
            }}
            className="dept py-7 rounded-sm text-lg group bg-gray-200 hover:text-white hover:bg-[rgb(104,143,250)]"
          >
            Add Dept.
          </Button>
        </div>

        {renderDepts}
      </div>

      <div className="w-[60%] md:w-[70%] lg:w-[80%]">
        <section className="w-full">
          <Tabs
            onValueChange={changeTab}
            defaultValue="assets"
            className="w-full"
          >
            <TabsList
              defaultValue="assets"
              className="font-poppins bg-transparent p-0 relative"
            >
              <div className="absolute -z-10 left-0 bottom-0 h-[3px] w-full bg-gray-200"></div>
              <TabsTrigger value="assets">Assets</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>

            <div className="m-3">
              <Button
                onClick={() => triggerRef.current?.click()}
                className="bg-blue-500 px-7 py-[26px] text-lg"
              >
                Add
              </Button>
            </div>

            <div className="p-3 pt-0">
              <TabsContent value="assets">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {renderAssets}
                </div>
              </TabsContent>
              <TabsContent value="projects">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
              </TabsContent>
            </div>
          </Tabs>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
