"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  Bell,
  UserCircle,
  LogOut,
  Home,
  ChevronDownIcon,
  LineChart,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
type Props = {};

function Navbar({}: Props) {
  const router = useRouter();
  const [modal, setModal] = useState<boolean>(false);

  const toggleModel = () => {
    setModal((prev) => !prev);
  };

  const handleLogout = () => {
    router.push("/login");
  };

  const notificationRef = useRef<HTMLButtonElement>(null);

  return (
    <nav className="font-poppins z-20 bg-white sticky top-0 left-0 border-b-[3px]">
      <div className="h-[60px] px-5 py-10 flex justify-between items-center z-20">
        <Link href="/">
          <h1 className="font-bold text-3xl">My Gov</h1>
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button className="py-[22px] px-5 text-base rounded-md bg-blue-400 hover:bg-blue-500 hover:shadow-lg transition-shadow duration-300">
              Log in
            </Button>
          </Link>

          <Link href="/signup">
            <Button
              variant="outline"
              className="py-[22px] px-5 text-base rounded-md hover:bg-gray-50 hover:shadow-lg transition-shadow duration-300"
            >
              Join Free
            </Button>
          </Link>
        </div>

        {modal && (
          <div
            className="absolute flex flex-col top-full right-1 p-2 rounded-xl shadow-lg bg-gray-50 border gap-1.5 sm:gap-2 z-20 transition-all duration-500 ease-in-out"
          >
            <Link href="/">
              <button className="navButton rounded-lg">
                <Home className="text-indigo-500" /> Home
              </button>
            </Link>
            <Link href="/manufacturer/dashboard">
              <button className="navButton rounded-lg">
                <LineChart className="text-green-500" />
                Dashboard
              </button>
            </Link>
            <Link href="/user/account">
              <button className="navButton rounded-lg">
                <UserCircle className="text-blue-500" /> My Profile
              </button>
            </Link>
            <button onClick={handleLogout} className="navButton rounded-lg">
              <LogOut className="text-red-500" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
