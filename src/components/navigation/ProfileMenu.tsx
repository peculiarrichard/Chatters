import React from "react";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import Image from "next/image";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <Link href="/dashboard/profile">View Profile</Link>,
  },
  {
    key: "2",
    label: <Link href="/dashboard/bookmarks">Bookmarks</Link>,
  },
  {
    key: "3",
    label: <Link href="/dashboard/settings">Settings</Link>,
  },
];

export const ProfileMenu = () => {
  const user = useUser();
  return (
    <Dropdown menu={{ items }}>
      <Image
        src={user?.profilePhotoUrl || "/assets/useravatar.png"}
        alt={user?.fullName || "user"}
        width={50}
        height={50}
        className="cursor-pointer"></Image>
    </Dropdown>
  );
};
