"use client";

import { Button } from "@chakra-ui/react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PanelLayout from "../layout/PanelLayout";
import FormPart1 from "../list-new-property/form-parts/FormPart1";
import FormPart2 from "../list-new-property/form-parts/FormPart2";
import FormPart3 from "../list-new-property/form-parts/FormPart3";
import FormPart4 from "../list-new-property/form-parts/FormPart4";
import { FormData } from "@/types/formData";
import DiscardDraftModal from "../list-new-property/modals/DiscardDraftModal";
import { generateJWTBearerForAdmin } from "@/utils/jwt";
import { useSession } from "next-auth/react";
import { uploadFileToCloudinary } from "@/utils/cloudinary";
import { fetchPostPropertyListingRequest } from "@/fetch/admin/property-listing-request.fetch";
import { PropertyData } from "@/types/property-data";

const PropertyListingForm: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [isRequestSentModalOpen, setIsRequestSentModal] =
    useState<boolean>(false);
  const [step, setStep] = useState(1);
  // const [formData, setFormData] = useState<FormData>({
  //   propertyDetails_propertyStatus_phase: "",
  //   propertyDetails_propertyStatus_status: "",
  //   propertyDetails_propertyStatus_rentalStatus: "",
  //   propertyDetails_issuerDetails_issuedBy: "",
  //   propertyDetails_issuerDetails_name: "",
  //   propertyDetails_issuerDetails_phoneNum: "",
  //   propertyDetails_issuerDetails_email: "",
  //   propertyDetails_propertySummary_title: "",
  //   propertyDetails_propertySummary_googleMapUrl: "",
  //   propertyDetails_propertySummary_country: "",
  //   propertyDetails_propertySummary_state: "",
  //   propertyDetails_propertySummary_city: "",
  //   propertyDetails_propertySummary_district: "",
  //   propertyDetails_propertySummary_address: "",
  //   propertyDetails_propertySummary_landArea: 0,
  //   propertyDetails_propertySummary_buildingArea: 0,
  //   propertyDetails_propertySummary_priceEstimation: 0,
  //   propertyDetails_propertyImages_primary: null,
  //   propertyDetails_propertyImages_others: [],
  //   propertyDetails_propertyDetails_planToSell: "",
  //   propertyDetails_propertyDetails_propertyType: "",
  //   propertyDetails_propertyDetails_ownershipStatus: "",
  //   propertyDetails_propertyDetails_propertyCondition: "",
  //   propertyDetails_propertyDetails_occupancyStatus: "",
  //   propertyDetails_propertyDetails_propertyManager: "",
  //   propertyDetails_propertyDetails_furnish: "",
  //   propertyDetails_propertyDetails_furniture: "",
  //   propertyDetails_propertyDetails_propertyIssues: [],
  //   propertyDetails_propertySpecifications_propertyCertificate: "",
  //   propertyDetails_propertySpecifications_floors: 0,
  //   propertyDetails_propertySpecifications_waterSupply: "",
  //   propertyDetails_propertySpecifications_bedrooms: 0,
  //   propertyDetails_propertySpecifications_bathrooms: 0,
  //   propertyDetails_propertySpecifications_garage: "",
  //   propertyDetails_propertySpecifications_garden: "",
  //   propertyDetails_propertySpecifications_swimPool: "",
  //   propertyDetails_description: "",

  //   financials_token_tokenPrice: 0,
  //   financials_token_tokenSupply: 0,
  //   financials_token_tokenValue: 0,
  //   financials_propertyFinancials_furnitureValueEstimation: 0,
  //   financials_propertyFinancials_legalAdminCost: 0,
  //   financials_propertyFinancials_platformListingFee: 0,
  //   financials_propertyFinancials_marketingMangementCost: 0,
  //   financials_propertyFinancials_propertyTaxes: 0,
  //   financials_propertyFinancials_rentalTaxes: 0,
  //   financials_propertyFinancials_rentalYeild: 0,

  //   documents_documents: [],

  //   markets_markets: "",

  //   errmsg: false,
  //   validEmail: false,
  //   validMap: false,
  // });

  const [formData, setFormData] = useState<FormData>({
    propertyDetails_propertyStatus_phase: "upcoming",
    propertyDetails_propertyStatus_status: "visible",
    propertyDetails_propertyStatus_rentalStatus: "",
    propertyDetails_issuerDetails_issuedBy: "Property Owner",
    propertyDetails_issuerDetails_name: "John Doe",
    propertyDetails_issuerDetails_phoneNum: "62812293329326",
    propertyDetails_issuerDetails_email: "jane_doe@gmail.com",
    propertyDetails_propertySummary_title: "99 Cokoraminoto",
    propertyDetails_propertySummary_googleMapUrl:
      "https://maps.app.goo.gl/sh7oZxN81X3qNps4A",
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
  });

  const [DiscardDraftModalOpen, setDiscardDraftModalOpen] =
    useState<boolean>(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nextStep = () => {
    console.log(formData);

    let allFieldsFilled = false;

    switch (step) {
      case 1:
        allFieldsFilled =
          !!formData.propertyDetails_propertyStatus_phase &&
          !!formData.propertyDetails_propertyStatus_status &&
          !!formData.propertyDetails_propertyStatus_rentalStatus &&
          !!formData.propertyDetails_issuerDetails_issuedBy &&
          !!formData.propertyDetails_issuerDetails_name &&
          !!formData.propertyDetails_issuerDetails_phoneNum &&
          !!formData.propertyDetails_issuerDetails_email &&
          !!formData.propertyDetails_propertySummary_title &&
          !!formData.propertyDetails_propertySummary_googleMapUrl &&
          !!formData.propertyDetails_propertySummary_country &&
          !!formData.propertyDetails_propertySummary_state &&
          !!formData.propertyDetails_propertySummary_city &&
          !!formData.propertyDetails_propertySummary_district &&
          !!formData.propertyDetails_propertySummary_address &&
          formData.propertyDetails_propertySummary_landArea > 0 &&
          formData.propertyDetails_propertySummary_buildingArea > 0 &&
          formData.propertyDetails_propertySummary_priceEstimation > 0 &&
          formData.propertyDetails_propertyImages_primary !== null &&
          formData.propertyDetails_propertyImages_others.length > 0 &&
          !!formData.propertyDetails_propertyDetails_planToSell &&
          !!formData.propertyDetails_propertyDetails_propertyType &&
          !!formData.propertyDetails_propertyDetails_ownershipStatus &&
          !!formData.propertyDetails_propertyDetails_propertyCondition &&
          !!formData.propertyDetails_propertyDetails_occupancyStatus &&
          !!formData.propertyDetails_propertyDetails_propertyManager &&
          !!formData.propertyDetails_propertyDetails_furnish &&
          formData.propertyDetails_propertyDetails_propertyIssues.length > 0 &&
          !!formData.propertyDetails_description;

        allFieldsFilled =
          allFieldsFilled && formData.validEmail && formData.validMap;
        break;

      case 2:
        allFieldsFilled =
          formData.financials_token_tokenPrice > 0 &&
          formData.financials_token_tokenSupply > 0 &&
          formData.financials_token_tokenValue > 0 &&
          formData.financials_propertyFinancials_furnitureValueEstimation > 0 &&
          formData.financials_propertyFinancials_legalAdminCost > 0 &&
          formData.financials_propertyFinancials_platformListingFee > 0 &&
          formData.financials_propertyFinancials_marketingMangementCost > 0 &&
          formData.financials_propertyFinancials_propertyTaxes > 0 &&
          formData.financials_propertyFinancials_rentalTaxes > 0 &&
          formData.financials_propertyFinancials_rentalYeild > 0;
        break;

      case 3:
        allFieldsFilled = formData.documents_documents.length > 0;
        break;

      case 4:
        allFieldsFilled = !!formData.markets_markets.trim();
        break;

      default:
        break;
    }

    if (allFieldsFilled) {
      setFormData((prevData) => ({
        ...prevData,
        errmsg: false,
      }));
      scrollToTop();
      setStep(step + 1);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        errmsg: true,
      }));
      scrollToTop();
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    scrollToTop();
  };

  const handleOnClick = async () => {
    // cloudinary max size 10485760
    try {
      const token = await generateJWTBearerForAdmin(session?.user?.email || "");
      const title = formData.propertyDetails_propertySummary_title;
      const propertyData: PropertyData = {
        propertyDetails: {
          propertyStatus: {
            phase: formData.propertyDetails_propertyStatus_phase,
            status: formData.propertyDetails_propertyStatus_status,
            rentalStatus: formData.propertyDetails_propertyStatus_rentalStatus,
          },
          issuerDetails: {
            issuedBy: formData.propertyDetails_issuerDetails_issuedBy,
            name: formData.propertyDetails_issuerDetails_name,
            phoneNum: formData.propertyDetails_issuerDetails_phoneNum,
            email: formData.propertyDetails_issuerDetails_email,
          },
          propertySummary: {
            title: formData.propertyDetails_propertySummary_title,
            googleMapUrl: formData.propertyDetails_propertySummary_googleMapUrl,
            country: formData.propertyDetails_propertySummary_country,
            state: formData.propertyDetails_propertySummary_state,
            city: formData.propertyDetails_propertySummary_city,
            district: formData.propertyDetails_propertySummary_district,
            address: formData.propertyDetails_propertySummary_address,
            landArea: formData.propertyDetails_propertySummary_landArea,
            buildingArea: formData.propertyDetails_propertySummary_buildingArea,
            priceEstimation:
              formData.propertyDetails_propertySummary_priceEstimation,
          },
          propertyImages: {
            primary:
              formData.propertyDetails_propertyImages_primary instanceof File
                ? await uploadFileToCloudinary(
                    formData.propertyDetails_propertyImages_primary,
                    `${title}/images`
                  )
                : formData.propertyDetails_propertyImages_primary,
            others: await Promise.all(
              formData.propertyDetails_propertyImages_others.map(async (item) =>
                item instanceof File
                  ? await uploadFileToCloudinary(item, `${title}/images`)
                  : item
              )
            ),
          },
          propertyDetails: {
            planToSell: formData.propertyDetails_propertyDetails_planToSell,
            propertyType: formData.propertyDetails_propertyDetails_propertyType,
            ownershipStatus:
              formData.propertyDetails_propertyDetails_ownershipStatus,
            propertyCondition:
              formData.propertyDetails_propertyDetails_propertyCondition,
            occupancyStatus:
              formData.propertyDetails_propertyDetails_occupancyStatus,
            propertyManager:
              formData.propertyDetails_propertyDetails_propertyManager,
            furnish: formData.propertyDetails_propertyDetails_furnish,
            furniture: formData.propertyDetails_propertyDetails_furniture,
            propertyIssues:
              formData.propertyDetails_propertyDetails_propertyIssues,
          },
          propertySpecifications: {
            propertyCertificate:
              formData.propertyDetails_propertySpecifications_propertyCertificate,
            floors: formData.propertyDetails_propertySpecifications_floors,
            waterSupply:
              formData.propertyDetails_propertySpecifications_waterSupply,
            bedrooms: formData.propertyDetails_propertySpecifications_bedrooms,
            bathrooms:
              formData.propertyDetails_propertySpecifications_bathrooms,
            garage: formData.propertyDetails_propertySpecifications_garage,
            garden: formData.propertyDetails_propertySpecifications_garden,
            swimPool: formData.propertyDetails_propertySpecifications_swimPool,
          },
          description: formData.propertyDetails_description,
        },
        financials: {
          token: {
            tokenPrice: formData.financials_token_tokenPrice,
            tokenSupply: formData.financials_token_tokenSupply,
            tokenValue: formData.financials_token_tokenValue,
          },
          propertyFinancials: {
            furnitureValueEstimation:
              formData.financials_propertyFinancials_furnitureValueEstimation,
            legalAdminCost:
              formData.financials_propertyFinancials_legalAdminCost,
            platformListingFee:
              formData.financials_propertyFinancials_platformListingFee,
            marketingMangementCost:
              formData.financials_propertyFinancials_marketingMangementCost,
            propertyTaxes: formData.financials_propertyFinancials_propertyTaxes,
            rentalTaxes: formData.financials_propertyFinancials_rentalTaxes,
            rentalYeild: formData.financials_propertyFinancials_rentalYeild,
          },
        },
        documents: {
          documents: await Promise.all(
            formData.documents_documents.map(async (item) =>
              item instanceof File
                ? await uploadFileToCloudinary(item, `${title}/documents`)
                : item
            )
          ),
        },
        markets: {
          markets: formData.markets_markets,
        },
        errmsg: formData.errmsg,
        validEmail: formData.validEmail,
        validMap: formData.validMap,
      };
      const params = {
        name: propertyData.propertyDetails.issuerDetails.name,
        email: propertyData.propertyDetails.issuerDetails.email,
        phone: propertyData.propertyDetails.issuerDetails.phoneNum,
        address: propertyData.propertyDetails.propertySummary.address,
        priceEstimation:
          propertyData.propertyDetails.propertySummary.priceEstimation.toString(),
        status: "pending",
        propertyData,
      };

      // Send the propertyData to the server
      const response = await fetchPostPropertyListingRequest(params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 && response.data) {
        console.log("Submission successful", response);
      } else {
        console.log("Submission failed", response);
      }
    } catch (error) {
      console.error("Error submitting property listing:", error);
    }
  };

  return (
    <div>
      <PanelLayout>
        {" "}
        <div className="w-full p-8 gap-6">
          <p className="flex items-center">
            <span className="text-lg text-neutral-500 font-medium text-left gap-4">
              Property List
            </span>
            <CaretRight weight="fill" color="#D4D4D8" />
            <span className="text-lg font-medium">List New Property</span>
          </p>
          <div className="flex flex-col items-start p-5 gap-[20px] ">
            {/* Part 1*/}
            {step === 1 && (
              <FormPart1 formData={formData} setFormData={setFormData} />
            )}
            {step === 2 && (
              <FormPart2 formData={formData} setFormData={setFormData} />
            )}
            {step === 3 && (
              <FormPart3 formData={formData} setFormData={setFormData} />
            )}
            {step === 4 && (
              <FormPart4 formData={formData} setFormData={setFormData} />
            )}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center p-4 gap-2.5 bg-white shadow rounded-lg">
            <div className="flex flex-col md:flex-row gap-2.5">
              {!(step === 1) && (
                <Button
                  leftIcon={<CaretLeft weight="fill" />}
                  width="140px"
                  height="40px"
                  padding="12px 16px"
                  bg="white"
                  boxShadow="lg"
                  borderRadius="full"
                  color="zinc.700"
                  fontSize="14px"
                  fontWeight="500"
                  _focus={{ bg: "teal.200" }}
                  _hover={{ bg: "teal.200" }}
                  onClick={prevStep}
                >
                  Back
                </Button>
              )}

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
                onClick={() => setDiscardDraftModalOpen(true)}
              >
                Discard
              </Button>

              <DiscardDraftModal
                isOpen={DiscardDraftModalOpen}
                onClose={() => {
                  setDiscardDraftModalOpen(false);
                }}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-2.5">
              <Button
                width="140px"
                height="40px"
                padding="12px 16px"
                bg="white"
                boxShadow="lg"
                borderRadius="full"
                color="teal.600"
                fontSize="14px"
                fontWeight="500"
                _focus={{ bg: "teal.100" }}
                _hover={{ bg: "teal.100" }}
                isDisabled={true}
              >
                Save as Draft
              </Button>

              {step < 4 && (
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
                  onClick={nextStep}
                >
                  Next
                </Button>
              )}
              {step === 4 && (
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
                  // onClick={() => alert("Sumbit Action Not added")}
                  onClick={handleOnClick}
                >
                  Submit
                </Button>
              )}
            </div>
          </div>
        </div>
      </PanelLayout>
    </div>
  );
};

export default PropertyListingForm;
