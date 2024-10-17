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
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormData } from "@/types/formData";
import PersonalDetailPanel from "./PersonalDetailPanel";
import PropertyDetailPanel from "./PropertyDetailPanel";
import RejectRequestModal from "../modals/RejectRequestModal";
import ApproveRequestModal from "../modals/ApproveRequestModal";
import { generateJWTBearerForAdmin } from "@/utils/jwt";
import { fetchGetAdminPropertyListingRequestDetail } from "@/fetch/admin/property-listing-request.fetch";
import { PropertyData } from "@/types/property-data";
import { urlsToFiles, urlToFile } from "@/utils/helper";

const MainView: React.FC = () => {
	const router = useRouter();
	const { slug } = useParams();
	const { data: session } = useSession();
	const [domLoaded, setDomLoaded] = useState(false);
	const [firstCheckLoggedIn, setFirstCheckLoggedIn] = useState(false);
	const [formData, setFormData] = useState<FormData>({
		propertyDetails_propertyStatus_phase: "",
		propertyDetails_propertyStatus_status: "",
		propertyDetails_propertyStatus_rentalStatus: "",
		propertyDetails_issuerDetails_issuedBy: "",
		propertyDetails_issuerDetails_name: "",
		propertyDetails_issuerDetails_phoneNum: "",
		propertyDetails_issuerDetails_email: "",
		propertyDetails_propertySummary_title: "",
		propertyDetails_propertySummary_googleMapUrl: "",
		propertyDetails_propertySummary_country: "",
		propertyDetails_propertySummary_state: "",
		propertyDetails_propertySummary_city: "",
		propertyDetails_propertySummary_district: "",
		propertyDetails_propertySummary_address: "",
		propertyDetails_propertySummary_landArea: 0,
		propertyDetails_propertySummary_buildingArea: 0,
		propertyDetails_propertySummary_priceEstimation: 0,
		propertyDetails_propertyImages_primary: null,
		propertyDetails_propertyImages_others: [],
		propertyDetails_propertyDetails_planToSell: "",
		propertyDetails_propertyDetails_propertyType: "",
		propertyDetails_propertyDetails_ownershipStatus: "",
		propertyDetails_propertyDetails_propertyCondition: "",
		propertyDetails_propertyDetails_occupancyStatus: "",
		propertyDetails_propertyDetails_propertyManager: "",
		propertyDetails_propertyDetails_furnish: "",
		propertyDetails_propertyDetails_furniture: "",
		propertyDetails_propertyDetails_propertyIssues: [],
		propertyDetails_propertySpecifications_propertyCertificate: "",
		propertyDetails_propertySpecifications_floors: 0,
		propertyDetails_propertySpecifications_waterSupply: "",
		propertyDetails_propertySpecifications_bedrooms: 0,
		propertyDetails_propertySpecifications_bathrooms: 0,
		propertyDetails_propertySpecifications_garage: "",
		propertyDetails_propertySpecifications_garden: "",
		propertyDetails_propertySpecifications_swimPool: "",
		propertyDetails_description: "",

		financials_token_tokenPrice: 0,
		financials_token_tokenSupply: 0,
		financials_token_tokenValue: 0,
		financials_propertyFinancials_furnitureValueEstimation: 0,
		financials_propertyFinancials_legalAdminCost: 0,
		financials_propertyFinancials_platformListingFee: 0,
		financials_propertyFinancials_marketingMangementCost: 0,
		financials_propertyFinancials_propertyTaxes: 0,
		financials_propertyFinancials_rentalTaxes: 0,
		financials_propertyFinancials_rentalYeild: 0,

		documents_documents: [],

		markets_markets: "",

		errmsg: false,
		validEmail: false,
		validMap: false,
	});

	// const formData: FormData = {
	//   propertyDetails_propertyStatus_phase: "Initial Offering",
	//   propertyDetails_propertyStatus_status: "Visible",
	//   propertyDetails_propertyStatus_rentalStatus: "",
	//   propertyDetails_issuerDetails_issuedBy: "Property Owner",
	//   propertyDetails_issuerDetails_name: "John Doe",
	//   propertyDetails_issuerDetails_phoneNum: "62812293329326",
	//   propertyDetails_issuerDetails_email: "jj@Doe.com",
	//   propertyDetails_propertySummary_title: "99 Cokoraminoto",
	//   propertyDetails_propertySummary_googleMapUrl:
	//     "https://maps.app.goo.gl/mW6Z7H4HbzzHRC41A",
	//   propertyDetails_propertySummary_country: "USA",
	//   propertyDetails_propertySummary_state: "New York",
	//   propertyDetails_propertySummary_city: "New York City",
	//   propertyDetails_propertySummary_district: "Manhattan",
	//   propertyDetails_propertySummary_address: "1234 5th Ave, New York, NY 10001",
	//   propertyDetails_propertySummary_landArea: 102,
	//   propertyDetails_propertySummary_buildingArea: 72,
	//   propertyDetails_propertySummary_priceEstimation: 23443,
	//   propertyDetails_propertyImages_primary: null,
	//   propertyDetails_propertyImages_others: [],
	//   propertyDetails_propertyDetails_planToSell: "ASAP",
	//   propertyDetails_propertyDetails_propertyType: "House",
	//   propertyDetails_propertyDetails_ownershipStatus:
	//     "100% of property ownership",
	//   propertyDetails_propertyDetails_propertyCondition: "Well Maintained",
	//   propertyDetails_propertyDetails_occupancyStatus: "Vacant",
	//   propertyDetails_propertyDetails_propertyManager: "No",
	//   propertyDetails_propertyDetails_furnish: "Half Furnished",
	//   propertyDetails_propertyDetails_furniture: "Stove, dishwasher, furnace",
	//   propertyDetails_propertyDetails_propertyIssues: [
	//     "Roof",
	//     "Plumbing",
	//     "Fire Damage",
	//   ],
	//   propertyDetails_propertySpecifications_propertyCertificate: "immediately",
	//   propertyDetails_propertySpecifications_floors: 2,
	//   propertyDetails_propertySpecifications_waterSupply: "PDAM Water Supply",
	//   propertyDetails_propertySpecifications_bedrooms: 3,
	//   propertyDetails_propertySpecifications_bathrooms: 2,
	//   propertyDetails_propertySpecifications_garage: "1",
	//   propertyDetails_propertySpecifications_garden: "1",
	//   propertyDetails_propertySpecifications_swimPool: "1",
	//   propertyDetails_description: "",

	//   financials_token_tokenPrice: 100,
	//   financials_token_tokenSupply: 100,
	//   financials_token_tokenValue: 10000,
	//   financials_propertyFinancials_furnitureValueEstimation: 100,
	//   financials_propertyFinancials_legalAdminCost: 100,
	//   financials_propertyFinancials_platformListingFee: 100,
	//   financials_propertyFinancials_marketingMangementCost: 100,
	//   financials_propertyFinancials_propertyTaxes: 100,
	//   financials_propertyFinancials_rentalTaxes: 100,
	//   financials_propertyFinancials_rentalYeild: 1,

	//   documents_documents: [],

	//   markets_markets: "",

	//   errmsg: false,
	//   validEmail: false,
	//   validMap: false,
	// };

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetchGetAdminPropertyListingRequestDetail(
					slug as string,
					{
						headers: {
							Authorization: `Bearer ${await generateJWTBearerForAdmin(
								session?.user?.email || ""
							)}`,
						},
					}
				);

				if (response.status === 200 && response.data) {
					const propertyData: PropertyData = response.data.data
						.propertyData as any;
					const propertyImages = propertyData.propertyDetails.propertyImages;

					// Convert image URL to File object for 'primary'
					const imageFilePrimary = propertyImages.primary
						? await urlToFile(propertyImages.primary)
						: null;
					// Convert image URLs to File objects for 'others'
					const imageFilesOthers = propertyImages.others
						? await urlsToFiles(
								propertyData.propertyDetails.propertyImages.others
						  )
						: [];

					setFormData({
						propertyDetails_propertyStatus_phase:
							propertyData.propertyDetails.propertyStatus.phase,
						propertyDetails_propertyStatus_status:
							propertyData.propertyDetails.propertyStatus.status,
						propertyDetails_propertyStatus_rentalStatus:
							propertyData.propertyDetails.propertyStatus.rentalStatus,
						propertyDetails_issuerDetails_issuedBy:
							propertyData.propertyDetails.issuerDetails.issuedBy,
						propertyDetails_issuerDetails_name:
							propertyData.propertyDetails.issuerDetails.name,
						propertyDetails_issuerDetails_phoneNum:
							propertyData.propertyDetails.issuerDetails.phoneNum,
						propertyDetails_issuerDetails_email:
							propertyData.propertyDetails.issuerDetails.email,
						propertyDetails_propertySummary_title:
							propertyData.propertyDetails.propertySummary.title,
						propertyDetails_propertySummary_googleMapUrl:
							propertyData.propertyDetails.propertySummary.googleMapUrl,
						propertyDetails_propertySummary_country:
							propertyData.propertyDetails.propertySummary.country,
						propertyDetails_propertySummary_state:
							propertyData.propertyDetails.propertySummary.state,
						propertyDetails_propertySummary_city:
							propertyData.propertyDetails.propertySummary.city,
						propertyDetails_propertySummary_district:
							propertyData.propertyDetails.propertySummary.district,
						propertyDetails_propertySummary_address:
							propertyData.propertyDetails.propertySummary.address,
						propertyDetails_propertySummary_landArea:
							propertyData.propertyDetails.propertySummary.landArea,
						propertyDetails_propertySummary_buildingArea:
							propertyData.propertyDetails.propertySummary.buildingArea,
						propertyDetails_propertySummary_priceEstimation:
							propertyData.propertyDetails.propertySummary.priceEstimation,
						propertyDetails_propertyImages_primary: imageFilePrimary,
						propertyDetails_propertyImages_others: imageFilesOthers,
						propertyDetails_propertyDetails_planToSell:
							propertyData.propertyDetails.propertyDetails.planToSell,
						propertyDetails_propertyDetails_propertyType:
							propertyData.propertyDetails.propertyDetails.propertyType,
						propertyDetails_propertyDetails_ownershipStatus:
							propertyData.propertyDetails.propertyDetails.ownershipStatus,
						propertyDetails_propertyDetails_propertyCondition:
							propertyData.propertyDetails.propertyDetails.propertyCondition,
						propertyDetails_propertyDetails_occupancyStatus:
							propertyData.propertyDetails.propertyDetails.occupancyStatus,
						propertyDetails_propertyDetails_propertyManager:
							propertyData.propertyDetails.propertyDetails.propertyManager,
						propertyDetails_propertyDetails_furnish:
							propertyData.propertyDetails.propertyDetails.furnish,
						propertyDetails_propertyDetails_furniture:
							propertyData.propertyDetails.propertyDetails.furniture,
						propertyDetails_propertyDetails_propertyIssues:
							propertyData.propertyDetails.propertyDetails.propertyIssues,
						propertyDetails_propertySpecifications_propertyCertificate:
							propertyData.propertyDetails.propertySpecifications
								.propertyCertificate,
						propertyDetails_propertySpecifications_floors:
							propertyData.propertyDetails.propertySpecifications.floors,
						propertyDetails_propertySpecifications_waterSupply:
							propertyData.propertyDetails.propertySpecifications.waterSupply,
						propertyDetails_propertySpecifications_bedrooms:
							propertyData.propertyDetails.propertySpecifications.bedrooms,
						propertyDetails_propertySpecifications_bathrooms:
							propertyData.propertyDetails.propertySpecifications.bathrooms,
						propertyDetails_propertySpecifications_garage:
							propertyData.propertyDetails.propertySpecifications.garage,
						propertyDetails_propertySpecifications_garden:
							propertyData.propertyDetails.propertySpecifications.garden,
						propertyDetails_propertySpecifications_swimPool:
							propertyData.propertyDetails.propertySpecifications.swimPool,
						propertyDetails_description:
							propertyData.propertyDetails.description,
						financials_token_tokenPrice:
							propertyData.financials.token.tokenPrice,
						financials_token_tokenSupply:
							propertyData.financials.token.tokenSupply,
						financials_token_tokenValue:
							propertyData.financials.token.tokenValue,
						financials_propertyFinancials_furnitureValueEstimation:
							propertyData.financials.propertyFinancials
								.furnitureValueEstimation,
						financials_propertyFinancials_legalAdminCost:
							propertyData.financials.propertyFinancials.legalAdminCost,
						financials_propertyFinancials_platformListingFee:
							propertyData.financials.propertyFinancials.platformListingFee,
						financials_propertyFinancials_marketingMangementCost:
							propertyData.financials.propertyFinancials.marketingMangementCost,
						financials_propertyFinancials_propertyTaxes:
							propertyData.financials.propertyFinancials.propertyTaxes,
						financials_propertyFinancials_rentalTaxes:
							propertyData.financials.propertyFinancials.rentalTaxes,
						financials_propertyFinancials_rentalYeild:
							propertyData.financials.propertyFinancials.rentalYeild,
						documents_documents: propertyData.documents.documents,
						markets_markets: propertyData.markets.markets,
						errmsg: propertyData.errmsg,
						validEmail: propertyData.validEmail,
						validMap: propertyData.validMap,
					});
				} else {
					console.error("Failed to fetch property data");
				}
			} catch (error) {
				console.error("An error occurred while fetching property data:", error);
			}
		};

		if (slug) {
			fetchData();
		}
	}, [slug, session?.user?.email]);

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
