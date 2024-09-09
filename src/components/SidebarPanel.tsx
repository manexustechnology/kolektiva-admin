'use client';

import { Sidebar, SidebarItem } from "./Sidebar";
import { FileText } from "@phosphor-icons/react";
import Link from "next/link";

interface SidebarPanel {
  isShowed?: boolean;
  onShow?: (isShowed: boolean) => void;
}

const SidebarPanel: React.FC<SidebarPanel> = ({ isShowed, onShow }) => {
  return (
    <Sidebar isShowed={isShowed} onShow={onShow}>
      <Link href='/property-listing-request'>
        <SidebarItem text="Property Listing Request" icon={<FileText size={20} weight="fill" />} />
      </Link>
    </Sidebar>
  )
}

export default SidebarPanel;
