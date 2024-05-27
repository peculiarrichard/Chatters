import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { RiMenuUnfoldLine } from "react-icons/ri";

interface MobileNav {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const MobileNav: React.FC<MobileNav> = ({
  onToggleSidebar,
  isSidebarOpen,
}) => {
  return (
    <div className="mobile-nav | fixed w-full bg-white h-16 z-10 top-0 flex justify-between items-center px-4 border-b lg:hidden">
      <Link href="/dashboard">
        <Image src="/assets/logo.png" alt="logo" width={100} height={100} />
      </Link>
      <button onClick={onToggleSidebar} className="text-2xl">
        {isSidebarOpen ? (
          <AiOutlineCloseCircle size={30} />
        ) : (
          <RiMenuUnfoldLine />
        )}
      </button>
    </div>
  );
};
