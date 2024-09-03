'use client';

import { Sidebar, SidebarItem } from "./Sidebar";
import { House } from "@phosphor-icons/react";
import Link from "next/link";

interface SidebarPanel {
  isShowed?: boolean;
  onShow?: (isShowed: boolean) => void;
}

const SidebarPanel: React.FC<SidebarPanel> = ({ isShowed, onShow }) => {
  return (
    <Sidebar isShowed={isShowed} onShow={onShow}>
      <Link href='/dashboard'>
        <SidebarItem text="Dashboard" icon={<House size={20} weight="fill" />} />
      </Link>
    </Sidebar>
  )
}

export default SidebarPanel;
