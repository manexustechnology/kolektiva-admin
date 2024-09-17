"use client";

import { cn } from "@/utils/cn";
import {
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { CaretDown, CaretRight } from "@phosphor-icons/react/dist/ssr";
import { signOut, useSession } from "next-auth/react";

interface NavbarProps {
  pageTitle?: string;
  withSidebarButton?: boolean;
  isSidebarShowed?: boolean;
  setSidebarShow?: (show: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  pageTitle = "",
  withSidebarButton = true,
  isSidebarShowed,
  setSidebarShow,
}) => {
  const { data: session } = useSession();
  const handleSidebarButtonClick = () => {
    if (setSidebarShow) setSidebarShow(true);
  };

  return (
    <div className="w-full flex justify-between items-center bg-white py-3 px-2 md:px-6">
      <div className="flex gap-2 items-center">
        {withSidebarButton && (
          <button
            onClick={handleSidebarButtonClick}
            className={cn(
              "p-1.5 h-fit rounded-lg bg-gray-50 hover:bg-gray-100 md:hidden",
              isSidebarShowed ? "hidden" : "block"
            )}
          >
            <CaretDown />
          </button>
        )}
        <div className="flex flex-col">
          {/* <p className="text-md text-black">
            <Breadcrumb spacing='8px' separator={<CaretRight size="16" />}>
              <BreadcrumbItem>
                <BreadcrumbLink href='/' color='gray.500'>Home</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>{pageTitle}</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </p> */}
          <h2 className="text-lg font-bold">{pageTitle}</h2>
        </div>
      </div>
      <Menu>
        <MenuButton as={Button} variant="white">
          <div className="flex gap-4 items-center">
            <div className="hidden md:flex md:flex-col items-end">
              <p className="text-md font-bold">{session?.user?.name || ""}</p>
              <p className="text-sm">{session?.user?.email || ""}</p>
            </div>
            <Avatar
              size="md"
              src="https://bit.ly/ryan-florence"
              cursor="pointer"
            />
          </div>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => signOut()}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default Navbar;
