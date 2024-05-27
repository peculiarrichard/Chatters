import React from "react";
import { sidebarList } from "@/data/sidebarList";
import Link from "next/link";
import Image from "next/image";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { usePathname, useRouter } from "next/navigation";
import { FaRegUserCircle } from "react-icons/fa";
import { signoutUser } from "@/services/auth/signout-service";
import { CiSettings } from "react-icons/ci";

export const SideBar = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <aside
      className={`sidebar | fixed w-4/5 md:w-2/5 lg:w-[15rem] xl:w-[17.5rem] bg-white h-screen z-10 top-0 lg:left-0 pt-6 border-r-2 lg:flex flex-col gap-6 items-start px-2 ${
        isSidebarOpen ? "flex" : "hidden"
      }`}>
      <Link href="/dashboard" className="px-4">
        <Image src="/assets/logo.png" alt="logo" width={100} height={100} />
      </Link>

      <ul className="flex flex-col justify-between gap-y-3 mt-1 mb-12 w-[90%]">
        {sidebarList.map((item) => (
          <li key={item.id}>
            <Link
              href={item.path}
              className={`${
                pathname === item.path
                  ? "rounded-[0.375rem] border border-[#1E5ED4] text-[#1E5ED4] font-[800]"
                  : "text-[#586179]"
              } flex gap-x-3 items-center text-sm leading-[1.5rem] px-4 py-2`}
              data-testid={`sidebar-item-${item.id}`}>
              {" "}
              {React.createElement(item.icon, { size: 25 })}{" "}
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex flex-col justify-between gap-y-4 w-[90%]">
        <Link
          href="/dashboard/settings"
          className={`${
            pathname === "/dashboard/settings"
              ? "rounded-[0.375rem] border border-[#1E5ED4] text-[#1E5ED4] font-[800]"
              : "text-[#586179]"
          } flex gap-x-3 items-center text-sm leading-[1.5rem] px-4 py-2`}
          data-testid="support-link">
          {" "}
          <CiSettings size={25} /> <span>Settings</span>
        </Link>
        <button
          className="flex gap-x-3 items-center text-sm text-[#586179] leading-[1.5rem] px-4"
          onClick={() => signoutUser(router)}>
          <RiLogoutCircleRLine size={25} /> Logout
        </button>
      </div>

      <div className="w-full flex gap-x-3 text-[#586179] text-ss px-2 border-t pt-1 justify-self-end">
        <FaRegUserCircle size={25} />
        <div>
          <p className="font-semibold text-paragraph-300">Be yourself</p>
          <p className=" ">© {new Date().getFullYear()}</p>
        </div>
      </div>
    </aside>
  );
};
