"use client";

import { Button } from "@chakra-ui/react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PanelLayout from "../layout/PanelLayout";
import FormPart1 from "../list-new-property/form-parts/FormPart1";
import FormPart2 from "../list-new-property/form-parts/FormPart2";
import FormPart3 from "../list-new-property/form-parts/FormPart3";
import FormPart4 from "../list-new-property/form-parts/FormPart4";
import { FormData } from "@/types/formData";

const PropertyListingForm: React.FC = () => {
  const router = useRouter();
  const [isRequestSentModalOpen, setIsRequestSentModal] =
    useState<boolean>(false);
  const [step, setStep] = useState(1);
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
    propertyDetails_propertyImages_primary: "",
    propertyDetails_propertyImages_exterior1: "",
    propertyDetails_propertyImages_exterior2: "",
    propertyDetails_propertyImages_interior1: "",
    propertyDetails_propertyImages_interior2: "",
    propertyDetails_propertyDetails_planToSell: "",
    propertyDetails_propertyDetails_propertyType: "",
    propertyDetails_propertyDetails_ownershipStatus: "",
    propertyDetails_propertyDetails_propertyCondition: "",
    propertyDetails_propertyDetails_occupancyStatus: "",
    propertyDetails_propertyDetails_propertyManager: "",
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

    markets_markets: [],

    errmsg: false,
  });

  const nextStep = () => {
    setStep(step + 1);
    // const allFieldsFilled =
    //   formData.name &&
    //   formData.contactPh &&
    //   formData.contactEm &&
    //   formData.address &&
    //   formData.mapLink &&
    //   formData.landArea > 0 &&
    //   formData.buildingArea > 0 &&
    //   formData.priceEstimation > 0;

    // const isValidEmail = formData.validEmail;
    // const isValidMap = formData.validMap;

    // if (allFieldsFilled && isValidEmail && isValidMap) {
    //   setFormData((prevData) => ({
    //     ...prevData,
    //     errmsg: false,
    //   }));
    //   window.scrollTo({ top: 0, behavior: "smooth" });
    //   setStep(step + 1);
    // } else {
    //   setFormData((prevData) => ({
    //     ...prevData,
    //     errmsg: true,
    //   }));
    //   window.scrollTo({ top: 0, behavior: "smooth" });
    // }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <PanelLayout>
        {" "}
        <div className="w-full p-8 gap-6">
          <p className="flex items-center">
            <span className="text-lg text-neutral-500 text-lg font-medium text-left gap-4">
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
                isDisabled={step === 1}
              >
                Back
              </Button>

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
              >
                Discard
              </Button>
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
                _focus={{ bg: "teal.300" }}
                _hover={{ bg: "teal.300" }}
                onClick={nextStep}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </PanelLayout>
    </div>
  );
};

export default PropertyListingForm;
