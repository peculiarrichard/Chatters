"use client";

import { SideBar } from "@/components/navigation/Sidebar";
import { useState, useEffect } from "react";
import { MobileNav } from "@/components/navigation/Mobilenav";
import { UserProvider } from "@/context/UserContext";
import TopBar from "@/components/navigation/Topbar";
import { OnboardingModal } from "@/components/commons/OnboardingModal";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const user = JSON.parse(localStorage.getItem("chattersUser") || "{}");
  useEffect(() => {
    if (user?.hasOnboarded === false) {
      showModal();
    }
  }, [user]);

  return (
    <>
      <main>
        <UserProvider>
          <MobileNav
            onToggleSidebar={handleToggleSidebar}
            isSidebarOpen={isSidebarOpen}
          />
          <SideBar isSidebarOpen={isSidebarOpen} />
          <div className="lg:ms-[15rem] xl:ms-[17.5rem] px-4 pt-5 max-w-7xl">
            <TopBar />
            <OnboardingModal
              handleCancel={handleCancel}
              isModalOpen={isModalOpen}
            />
            {children}
          </div>
        </UserProvider>
      </main>
    </>
  );
}
