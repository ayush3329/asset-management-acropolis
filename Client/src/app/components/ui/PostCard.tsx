import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgeCheck } from "lucide-react";

type Props = {
    imgLink: string;
    resolved: boolean;
};

function PostCard({imgLink, resolved}: Props) {
  return (
    <div className="font-poppins text-gray-700 w-full rounded-md border shadow-md h-fit">
      <div className="p-3 flex items-center justify-between gap-1">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h2 className="font-semibold">Ankit</h2>
        </div>
        <BadgeCheck className="text-blue-500" />
      </div>

      <div className="w-full h-[200px] relative">
        <img src={imgLink} alt="issue" className="w-full h-full object-cover" />
        <span className={`absolute top-2 right-2 ${resolved ? 'bg-green-200' : 'bg-red-200'} px-2 py-1 rounded-sm`}>{resolved? 'Resolved': 'Pending'}</span>
      </div>
      <p className="p-4 font-semibold text-gray-500">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut, quis
        perspiciatis sint doloremque modi fugiat atque ipsam? Ducimus non,
        doloribus nesciunt saepe sapiente illo beatae, unde id inventore dolores
        eligendi.
      </p>
    </div>
  );
}

export default PostCard;
