"use client";

import SidebarPanel from "@/components/SidebarPanel";
import { useState, PropsWithChildren } from "react";

const PanelLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [showSidebarMenu, setShowSidebarMenu] = useState(
    window?.innerWidth >= 768 ? true : false
  );

  return (
    <div className="w-full flex">
      <SidebarPanel isShowed={showSidebarMenu} onShow={setShowSidebarMenu} />
      <main className="w-full flex flex-col min-h-screen">{children}</main>
    </div>
  );
};

export default PanelLayout;
