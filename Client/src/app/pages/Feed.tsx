"use client";
import React, { useRef } from "react";
import Dock from "../components/ui/Dock";
import { Button } from "@/components/ui/button";
import { Image, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import PostCard from "../components/ui/PostCard";

type Props = {};

function Feed({}: Props) {
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex justify-end">
      <Dock triggerRef={triggerRef} />
      <div className="w-[40%] bg-white z-10 md:w-[30%] lg:w-[20%] flex flex-col h-screen fixed left-0 border-r-[3px] border-dashed font-poppins font-semibold">
        <div className="p-2">
          <Button
            variant="ghost"
            onClick={() => triggerRef.current?.click()}
            className="sm:w-full flex items-center gap-2 py-7 rounded-sm text-lg bg-gray-200 hover:text-white hover:bg-[rgb(104,143,250)]"
          >
            Create Post
            <Image />
          </Button>
        </div>
      </div>

      <div className="p-4 w-[60%] h-navMinus md:w-[70%] lg:w-[80%] grid grid-cols-2 lg:grid-cols-3 gap-4">
        {/* <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.5}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[30%] h-[100%] skew-y-0"
          )}
        /> */}

        <PostCard imgLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXiQy-gHu2DtM9v6RMdUXogD0yYZ7B11uuqw&s" resolved={true}/>
        <PostCard imgLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsnGLjNclc_0GG5nI_pevSdFVVAr-_xc4iBA&s" resolved={false}/>
        <PostCard imgLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwx8-gSZlncNQOtZtMIZ_0usrQXp7tv2GpNA&s" resolved={true}/>
        <PostCard imgLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc-o-VWnrH0Yq5j5wUpThOv4BEz8-X86v7BQ&s" resolved={false}/>
        <PostCard imgLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsnGLjNclc_0GG5nI_pevSdFVVAr-_xc4iBA&s" resolved={true}/>
      </div>
    </div>
  );
}

export default Feed;
