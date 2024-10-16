"use client";

import { Sidebar, SidebarItem } from "./Sidebar";
import Link from "next/link";
import {
  ClockCounterClockwise,
  Bell,
  GearSix,
  PresentationChart,
  User,
  Users,
  Buildings,
  SignOut,
} from "@phosphor-icons/react/dist/ssr";
import { signOut, useSession } from "next-auth/react";

interface SidebarPanel {
  isShowed?: boolean;
  onShow?: (isShowed: boolean) => void;
}

const SidebarPanel: React.FC<SidebarPanel> = ({ isShowed, onShow }) => {
  const { data: session } = useSession();

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
            <SidebarItem
              text="Property Management"
              icon={<Buildings size={20} weight="fill" />}
            />
          </Link>
          <Link href="/listed-property">
            <SidebarItem text="Property List" />
          </Link>
          <Link href="/property-listing-request">
            <SidebarItem text="Property Listing Request" />
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
            text={session?.user?.email || ""}
            icon={<User size={20} weight="fill" />}
          />
          <SidebarItem
            text="Logout"
            icon={<SignOut size={20} weight="fill" />}
            onClick={() => signOut()}
          />
        </div>
      </div>
    </Sidebar>
  );
};

export default SidebarPanel;
