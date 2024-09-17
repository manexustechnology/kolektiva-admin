"use client";

import Navbar from "@/components/Navbar";
import SidebarPanel from "@/components/SidebarPanel";
import { useState, PropsWithChildren } from "react";

interface PanelLayoutProps {
  pageTitle?: string;
}

const PanelLayout = ({
  pageTitle,
  children,
}: PropsWithChildren<PanelLayoutProps>) => {
  const [showSidebarMenu, setShowSidebarMenu] = useState(
    window.innerWidth >= 768 ? true : false
  );

  return (
    <div className="w-full flex">
      <SidebarPanel isShowed={showSidebarMenu} onShow={setShowSidebarMenu} />
      <main className="w-full flex flex-col min-h-screen">
        <Navbar
          pageTitle={pageTitle}
          isSidebarShowed={showSidebarMenu}
          setSidebarShow={setShowSidebarMenu}
        />
        {children}
      </main>
    </div>
  );
};

export default PanelLayout;
