"use client";

import PanelLayout from "@/app/(panel)/layout/PanelLayout";
import { DashboardData } from "@/types/dashboardData";
import {
  Button,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import {
  ArrowSquareOut,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react/dist/ssr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PropertyPanel from "./PropertyPanel";
import UsersPanel from "./UsersPanel";

const DashboardMain: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [domLoaded, setDomLoaded] = useState(false);
  const [firstCheckLoggedIn, setFirstCheckLoggedIn] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
    setInterval(() => {
      setFirstCheckLoggedIn(true);
    }, 3000);
  }, []);

  useEffect(() => {
    if (router) {
      if (domLoaded && !session && firstCheckLoggedIn) {
        router.push("/signin");
      }
    }
  }, [router, session, domLoaded, firstCheckLoggedIn]);

  const [tabIndex, setTabIndex] = useState(0);

  const dashboardData: DashboardData = {
    property_propertyListed_upcomming: 100,
    property_propertyListed_ipo: 25,
    property_propertyListed_aftermarket: 45,

    property_listingRequest_chart: "",

    property_latestBuy: [
      {
        address: "1234 Elm Street",
        city: "Springfield",
        price: "30,000",
        imageUrl: "/images/test-dashboard-property.png",
      },
      {
        address: "5678 Oak Avenue",
        city: "Dallas",
        price: "25,000",
        imageUrl: "/images/test-dashboard-property.png",
      },
      {
        address: "9101 Pine Road",
        city: "Miami",
        price: "35,000",
        imageUrl: "/images/test-dashboard-property.png",
      },
      {
        address: "2345 Maple Lane",
        city: "Seattle",
        price: "40,000",
        imageUrl: "/images/test-dashboard-property.png",
      },
      {
        address: "6789 Birch Street",
        city: "Boston",
        price: "45,000",
        imageUrl: "/images/test-dashboard-property.png",
      },
    ],

    property_latestSell: [
      {
        address: "1234 Elm Street",
        city: "Springfield",
        price: "30,000",
        imageUrl: "/images/test-dashboard-property.png",
      },
      {
        address: "5678 Oak Avenue",
        city: "Dallas",
        price: "25,000",
        imageUrl: "/images/test-dashboard-property.png",
      },
      {
        address: "9101 Pine Road",
        city: "Miami",
        price: "35,000",
        imageUrl: "/images/test-dashboard-property.png",
      },
      {
        address: "2345 Maple Lane",
        city: "Seattle",
        price: "40,000",
        imageUrl: "/images/test-dashboard-property.png",
      },
      {
        address: "6789 Birch Street",
        city: "Boston",
        price: "45,000",
        imageUrl: "/images/test-dashboard-property.png",
      },
    ],
  };

  return (
    <div>
      <PanelLayout>
        {" "}
        <div className="w-full p-8 gap-6">
          <span className="text-lg font-medium flex items-center mb-8">
            {" "}
            Dashoard
          </span>
          <div className="w-[1130px] h-px bg-zinc-200 mb-8"></div>

          <Tabs
            colorScheme="teal"
            index={tabIndex}
            onChange={(index: number) => setTabIndex(index)}
          >
            <TabList className="flex overflow-x-auto gap-2 scrollbar-hidden">
              <Tab fontSize="sm">Property</Tab>
              <Tab fontSize="sm">Users</Tab>
              <Tab fontSize="sm">Financials</Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="1px"
              bg="teal.400"
              borderRadius="1px"
            />

            <TabPanels>
              <TabPanel px={0} py={4}>
                <PropertyPanel dashboardData={dashboardData} />
              </TabPanel>
              <TabPanel px={0} py={4}>
                {" "}
                <UsersPanel dashboardData={dashboardData} />
              </TabPanel>
              <TabPanel px={0} py={4}></TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </PanelLayout>
    </div>
  );
};

export default DashboardMain;
