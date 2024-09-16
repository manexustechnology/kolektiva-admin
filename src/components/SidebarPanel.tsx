"use client";

import { Sidebar, SidebarItem } from "./Sidebar";
import { ClockCounterClockwise, FileText } from "@phosphor-icons/react";
import Link from "next/link";
import {
  Bell,
  GearSix,
  PresentationChart,
  User,
  Users,
} from "@phosphor-icons/react/dist/ssr";

interface SidebarPanel {
  isShowed?: boolean;
  onShow?: (isShowed: boolean) => void;
}

const SidebarPanel: React.FC<SidebarPanel> = ({ isShowed, onShow }) => {
  return (
    <Sidebar isShowed={isShowed} onShow={onShow}>
      <div className="flex flex-col h-full">
        {/* Sidebar items */}
        <div className="flex flex-col flex-grow">
          <Link href="/">
            <SidebarItem
              text="Dashboard"
              icon={<PresentationChart size={20} weight="fill" />}
            />
          </Link>
          <Link href="/">
            <SidebarItem text="Listed Property" />
          </Link>
          <div className="flex flex-col items-start px-2.5 gap-2.5 w-full h-px">
            <div className="w-full h-px bg-zinc-200 flex-none order-0 self-stretch flex-grow-0"></div>
          </div>
          <Link href="/">
            <SidebarItem
              text="Admin Management"
              icon={<Users size={20} weight="fill" />}
            />
          </Link>
          <Link href="/">
            <SidebarItem
              text="Activity Log"
              icon={<ClockCounterClockwise size={20} weight="fill" />}
            />
          </Link>
        </div>

        {/* Bottom items */}
        <div className="flex flex-col gap-2.5 px-2.5">
          <SidebarItem
            text="Notifications"
            icon={<Bell size={20} weight="fill" />}
          />
          <SidebarItem
            text="Settings"
            icon={<GearSix size={20} weight="fill" />}
          />
          <div className="flex flex-col items-start px-2.5 gap-2.5 w-full h-px">
            <div className="w-full h-px bg-zinc-200 flex-none order-0 self-stretch flex-grow-0"></div>
          </div>
          <SidebarItem
            text="Super Admin"
            icon={<User size={20} weight="fill" />}
          />
        </div>
      </div>
    </Sidebar>
  );
};

export default SidebarPanel;
