"use client";

import SidebarPanel from "@/components/SidebarPanel";
import { useState, useEffect, PropsWithChildren } from "react";

const PanelLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [showSidebarMenu, setShowSidebarMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setShowSidebarMenu(window.innerWidth >= 768);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full flex">
      <SidebarPanel isShowed={showSidebarMenu} onShow={setShowSidebarMenu} />
      <main className="w-full flex flex-col min-h-screen">{children}</main>
    </div>
  );
};

export default PanelLayout;
