import { SidebarItems } from "@/models/props/navigation/SidebarProps";
import { RiAiGenerate } from "react-icons/ri";
import { IoChatbubblesOutline } from "react-icons/io5";
import { TfiWrite } from "react-icons/tfi";
import { IoHomeOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";

export const sidebarList: SidebarItems[] = [
  {
    id: 1,
    path: "/dashboard",
    icon: IoHomeOutline,
    label: "Feed",
  },
  {
    id: 2,
    path: "/dashboard/write",
    icon: TfiWrite,
    label: "Write",
  },
  {
    id: 3,
    path: "/dashboard/challenges",
    icon: RiAiGenerate,
    label: "Challenges",
  },
  {
    id: 4,
    path: "/dashboard/find-users",
    icon: LuUsers,
    label: "Find Users",
  },
  {
    id: 5,
    path: "/dashboard/chat",
    icon: IoChatbubblesOutline,
    label: "Chat",
  },
];
