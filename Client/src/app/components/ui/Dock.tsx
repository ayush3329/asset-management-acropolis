import react, { RefObject } from "react";
import { Image, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  triggerRef: RefObject<any>;
};

function Dock({ triggerRef }: Props) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button ref={triggerRef} variant="ghost" className="hidden">
          Open Drawer
        </Button>
      </DrawerTrigger>
      <DrawerContent className="font-poppins">
        <div className="mx-auto w-full flex flex-col justify-center items-center">
          <DrawerHeader className="w-[418px]">
            <DrawerTitle className="text-xl">Add Post</DrawerTitle>
            <DrawerDescription>Raise issues around you</DrawerDescription>
          </DrawerHeader>

          <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
            <Label htmlFor="picture" className="text-lg flex items-center gap-2">
              Picture
              <Image />
            </Label>
            <Input id="picture" type="file" className="h-[100px] border-[3px] border-dashed border-gray-400"/>
          </div>

          <DrawerFooter className="w-[418px]">
            <div className="flex w-full gap-4">
              <Button className="w-full text-lg bg-gray-200 text-black hover:bg-indigo-400 hover:text-white">
                Post
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" className="w-full text-lg">
                  Cancel
                </Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default Dock;
