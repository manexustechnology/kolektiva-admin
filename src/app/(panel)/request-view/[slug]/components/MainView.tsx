"use client";

import PanelLayout from "@/app/(panel)/layout/PanelLayout";
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
import { FormData } from "@/types/formData";
import PersonalDetailPanel from "./PersonalDetailPanel";
import PropertyDetailPanel from "./PropertyDetailPanel";
import RejectRequestModal from "../modals/RejectRequestModal";
import ApproveRequestModal from "../modals/ApproveRequestModal";

const MainView: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [domLoaded, setDomLoaded] = useState(false);
  const [firstCheckLoggedIn, setFirstCheckLoggedIn] = useState(false);

  const formData: FormData = {
    propertyDetails_propertyStatus_phase: "Initial Offering",
    propertyDetails_propertyStatus_status: "Visible",
    propertyDetails_propertyStatus_rentalStatus: "",
    propertyDetails_issuerDetails_issuedBy: "Property Owner",
    propertyDetails_issuerDetails_name: "John Doe",
    propertyDetails_issuerDetails_phoneNum: "62812293329326",
    propertyDetails_issuerDetails_email: "jj@Doe.com",
    propertyDetails_propertySummary_title: "99 Cokoraminoto",
    propertyDetails_propertySummary_googleMapUrl:
      "https://maps.app.goo.gl/mW6Z7H4HbzzHRC41A",
    propertyDetails_propertySummary_country: "USA",
    propertyDetails_propertySummary_state: "New York",
    propertyDetails_propertySummary_city: "New York City",
    propertyDetails_propertySummary_district: "Manhattan",
    propertyDetails_propertySummary_address: "1234 5th Ave, New York, NY 10001",
    propertyDetails_propertySummary_landArea: 102,
    propertyDetails_propertySummary_buildingArea: 72,
    propertyDetails_propertySummary_priceEstimation: 23443,
    propertyDetails_propertyImages_primary: null,
    propertyDetails_propertyImages_others: [],
    propertyDetails_propertyDetails_planToSell: "ASAP",
    propertyDetails_propertyDetails_propertyType: "House",
    propertyDetails_propertyDetails_ownershipStatus:
      "100% of property ownership",
    propertyDetails_propertyDetails_propertyCondition: "Well Maintained",
    propertyDetails_propertyDetails_occupancyStatus: "Vacant",
    propertyDetails_propertyDetails_propertyManager: "No",
    propertyDetails_propertyDetails_furnish: "Half Furnished",
    propertyDetails_propertyDetails_furniture: "Stove, dishwasher, furnace",
    propertyDetails_propertyDetails_propertyIssues: [
      "Roof",
      "Plumbing",
      "Fire Damage",
    ],
    propertyDetails_propertySpecifications_propertyCertificate: "immediately",
    propertyDetails_propertySpecifications_floors: 2,
    propertyDetails_propertySpecifications_waterSupply: "PDAM Water Supply",
    propertyDetails_propertySpecifications_bedrooms: 3,
    propertyDetails_propertySpecifications_bathrooms: 2,
    propertyDetails_propertySpecifications_garage: "1",
    propertyDetails_propertySpecifications_garden: "1",
    propertyDetails_propertySpecifications_swimPool: "1",
    propertyDetails_description: "",

    financials_token_tokenPrice: 100,
    financials_token_tokenSupply: 100,
    financials_token_tokenValue: 10000,
    financials_propertyFinancials_furnitureValueEstimation: 100,
    financials_propertyFinancials_legalAdminCost: 100,
    financials_propertyFinancials_platformListingFee: 100,
    financials_propertyFinancials_marketingMangementCost: 100,
    financials_propertyFinancials_propertyTaxes: 100,
    financials_propertyFinancials_rentalTaxes: 100,
    financials_propertyFinancials_rentalYeild: 1,

    documents_documents: [],

    markets_markets: "",

    errmsg: false,
    validEmail: false,
    validMap: false,
  };

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
  const [rejectRequestModalOpen, RejectRequestModalOpen] =
    useState<boolean>(false);
  const [approveRequestModalOpen, ApproveRequestModalOpen] =
    useState<boolean>(false);
  return (
    <div>
      <PanelLayout>
        {" "}
        <div className="w-full p-8 gap-6">
          <p className="flex items-center mb-8">
            <span className="text-lg text-neutral-500 font-medium text-left gap-4">
              Property Listing Request
            </span>
            <CaretRight weight="fill" color="#D4D4D8" />
            <span className="text-lg font-medium">Detail Property</span>
          </p>

          <Tabs
            colorScheme="teal"
            index={tabIndex}
            onChange={(index: number) => setTabIndex(index)}
          >
            <TabList className="flex overflow-x-auto gap-2 scrollbar-hidden">
              <Tab fontSize="sm">Personal Detail & Property Summary</Tab>
              <Tab fontSize="sm">Property Details</Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="1px"
              bg="teal.400"
              borderRadius="1px"
            />

            <TabPanels>
              <TabPanel px={0} py={4}>
                <PersonalDetailPanel formData={formData} />
              </TabPanel>
              <TabPanel px={0} py={4}>
                {" "}
                <PropertyDetailPanel formData={formData} />
              </TabPanel>
            </TabPanels>
          </Tabs>

          <div className="flex flex-col md:flex-row items-end p-4 gap-2.5 bg-white shadow rounded-lg">
            <div className="ml-auto flex gap-2.5">
              <Button
                width="140px"
                height="40px"
                padding="12px 16px"
                bg="white"
                boxShadow="lg"
                borderRadius="full"
                color="red.600"
                fontSize="14px"
                fontWeight="500"
                _focus={{ bg: "red.100" }}
                _hover={{ bg: "red.100" }}
                onClick={() => RejectRequestModalOpen(true)}
              >
                Reject
              </Button>
              <RejectRequestModal
                isOpen={rejectRequestModalOpen}
                onClose={() => {
                  RejectRequestModalOpen(false);
                }}
              />

              <Button
                width="140px"
                height="40px"
                padding="12px 16px"
                bg="teal.600"
                boxShadow="lg"
                borderRadius="full"
                color="white"
                fontSize="14px"
                fontWeight="500"
                _focus={{ bg: "teal.700" }}
                _hover={{ bg: "teal.700" }}
                onClick={() => ApproveRequestModalOpen(true)}
              >
                Approve
              </Button>
              <ApproveRequestModal
                isOpen={approveRequestModalOpen}
                onClose={() => {
                  ApproveRequestModalOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      </PanelLayout>
    </div>
  );
};

export default MainView;
