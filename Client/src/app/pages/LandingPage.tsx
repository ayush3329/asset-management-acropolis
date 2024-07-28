"use client";
import React from "react";
import { BorderBeam } from "@/components/magicui/border-beam";
import { cn } from "@/lib/utils";
import GridPattern from "@/components/magicui/grid-pattern";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {};

function LandingPage({}: Props) {
  return (
    <div className="font-poppins">
      <section className="relative w-full overflow-x-hidden h-navMinus flex flex-col justify-center items-center">
        <GridPattern
          width={28}
          height={29}
          x={-1}
          y={-1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom,white,white,transparent,transparent)] "
          )}
        />
        <div className="relative p-5 flex h-[400px] w-full max-w-[900px] flex-col items-center justify-center overflow-hidden border bg-background md:shadow-xl">
          <div className="max-w-[800px] flex flex-col items-center gap-4">
            <h1 className="text-5xl font-semibold">
              Asset Management eased out !!!
            </h1>
            <p className="text-gray-500 font-normal text-center text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
              aperiam aspernatur eum, deleniti illum, cumque quam, veritatis
              doloribus quisquam rem ratione quis id! Numquam libero et dolore
              magni non sapiente!
            </p>
            <Link href="/dashboard">
              <Button className="p-8 cursor-pointer text-xl font-semibold bg-blue-500 rounded-md text-white">
                Get started
              </Button>
            </Link>
          </div>
          <BorderBeam size={250} borderWidth={3} duration={12} delay={9} />
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
