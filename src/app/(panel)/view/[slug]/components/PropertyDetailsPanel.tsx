"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FormData } from "@/types/formData";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import {
  ArrowSquareOut,
  CheckCircle,
  Trash,
} from "@phosphor-icons/react/dist/ssr";
import { Box, Button } from "@chakra-ui/react";
import { Eye } from "@phosphor-icons/react";
import MediaShowModal from "@/app/(panel)/list-new-property/modals/MediaShowModal";

interface PropertyDetailsPanelProps {
  formData: FormData;
}

const PropertyDetailsPanel: React.FC<PropertyDetailsPanelProps> = ({
  formData,
}) => {
  const isLoading = false;
  const [showModal, setShowModal] = useState<number | null>(null);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    const start = text.slice(0, 10);
    const end = text.slice(-10);
    return `${start}...${end}`;
  };

  const openGoogleMap = () => {
    if (
      typeof window !== "undefined" &&
      formData.propertyDetails_propertySummary_googleMapUrl
    ) {
      window.open(
        formData.propertyDetails_propertySummary_googleMapUrl,
        "_blank"
      );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Property Status */}
      <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg">
        {/* Title */}
        <p className="text-lg font-medium text-zinc-500">Property Status</p>
        {/* Divider */}
        <div className="w-full h-px bg-zinc-200"></div>

        {/* Phase/Status */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5 w-full">
          {/* Phase */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-500">Phase</p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {formData.propertyDetails_propertyStatus_phase}
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-500">Status</p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {formData.propertyDetails_propertyStatus_status}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Issuer Details */}
      <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg">
        {/* Title */}
        <p className="text-lg font-medium text-zinc-500">Issuer Details</p>
        {/* Divider */}
        <div className="w-full h-px bg-zinc-200"></div>

        {/* Issued By/Name */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5 w-full">
          {/* Issued By */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-500">Issued By</p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {formData.propertyDetails_issuerDetails_issuedBy}
              </p>
            </div>
          </div>

          {/* Name */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-500">Name</p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {formData.propertyDetails_issuerDetails_name}
              </p>
            </div>
          </div>
        </div>

        {/* Phone/ E-Mail */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5  w-full">
          {/* Phone */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-500">Phone</p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full h-64px">
              <p className="text-base font-medium leading-[18px] text-left">
                {formData.propertyDetails_issuerDetails_phoneNum}
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-500">Email</p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {formData.propertyDetails_issuerDetails_email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Property Summary */}
      <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg">
        {/* Title */}
        <p className="text-lg font-medium text-zinc-500">Property Summary</p>
        {/* Divider */}
        <div className="w-full h-px bg-zinc-200"></div>

        {/* Title/Gmap */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5  w-full">
          {/* Title */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-500">Title</p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {formData.propertyDetails_propertySummary_title}
              </p>
            </div>
          </div>

          {/* G Map */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-500">
                Google Map Url
              </p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left text-teal-600">
                <span className="cursor-pointer" onClick={openGoogleMap}>
                  {truncateText(
                    formData.propertyDetails_propertySummary_googleMapUrl,
                    20
                  )}
                </span>
                <ArrowSquareOut
                  color="black"
                  onClick={openGoogleMap}
                  className="inline cursor-pointer"
                />
              </p>
            </div>
          </div>
        </div>

        {/* Country/State */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5  w-full">
          {/* Country */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-500">Country</p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {formData.propertyDetails_propertySummary_country}
              </p>
            </div>
          </div>

          {/* State */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-500">State</p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {formData.propertyDetails_propertySummary_state}
              </p>
            </div>
          </div>
        </div>

        {/* City/District */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5  w-full">
          {/* City */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-500">City</p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {formData.propertyDetails_propertySummary_city}
              </p>
            </div>
          </div>

          {/* District */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-500">
                District/Sub-District
              </p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {formData.propertyDetails_propertySummary_district}
              </p>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-col items-start p-0 gap-1.5 w-full">
          <div className="flex flex-row items-center p-0 gap-0.75">
            <p className="text-sm font-normal text-zinc-500">Address</p>
          </div>
          <div className="flex flex-col items-start p-0 gap-1 w-full">
            <p className="text-base font-medium leading-[18px] text-left">
              {formData.propertyDetails_propertySummary_address}
            </p>
          </div>
        </div>

        {/* Land / Building Area */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5  md:h-[66px] w-full">
          {/* Land */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2 h-[66px]">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-500">Land area</p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <div className="flex items-center  border-none rounded-full h-[40px] w-full relative">
                <p className="text-base font-medium leading-[18px] text-left">
                  {formData.propertyDetails_propertySummary_landArea} m²
                </p>
              </div>
            </div>
          </div>

          {/* Building */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2 h-[66px]">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-500">Building area</p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <div className="flex items-center border-none rounded-full h-[40px] w-full relative">
                <p className="text-base font-medium leading-[18px] text-left">
                  {formData.propertyDetails_propertySummary_buildingArea} m²
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Price Estim */}
        <div className="flex flex-row items-start p-0 gap-1.5  h-[66px] w-full">
          {/* Land */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full h-[66px]">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-500">
                Property price estimation
              </p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <div className="flex items-center  border-none rounded-full h-[40px] w-full relative">
                <p className="text-base font-medium leading-[18px] text-left">
                  {formData.propertyDetails_propertySummary_priceEstimation} USD
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Images */}
      <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg">
        {/* Title */}
        <p className="text-lg font-medium text-zinc-500">Property Images</p>
        {/* Divider */}
        <div className="w-full h-px bg-zinc-200"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {formData.propertyDetails_propertyImages_primary && (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 gap-3 bg-white shadow-md rounded-md">
              <div className="flex items-center gap-3">
                <Image
                  src={URL.createObjectURL(
                    formData.propertyDetails_propertyImages_primary
                  )}
                  alt="Primary Image"
                  width={40}
                  height={40}
                  style={{ borderRadius: "3px" }}
                />
                <span className="hidden md:block text-sm font-medium text-[#3F3F46]">
                  {truncateText(
                    formData.propertyDetails_propertyImages_primary.name,
                    18
                  )}
                </span>
                <CheckCircle weight="fill" color="#0D9488" />
                <Box
                  backgroundColor="#F0FDFA"
                  color="#0D9488"
                  padding="2px 8px"
                  borderWidth="1px"
                  borderRadius="full"
                  borderColor="#0D9488"
                  fontSize="xs"
                  zIndex={10}
                >
                  Primary
                </Box>
              </div>
              <span className="md:hidden text-sm font-medium text-[#3F3F46]">
                {truncateText(
                  formData.propertyDetails_propertyImages_primary.name,
                  18
                )}
              </span>

              <div className="md:ml-auto flex md:items-end gap-1">
                <Button
                  leftIcon={<Eye weight="fill" />}
                  height="40px"
                  padding="12px 16px"
                  bg="#F4F4F5"
                  boxShadow=""
                  borderRadius="full"
                  color="#3F3F46"
                  fontSize="14px"
                  fontWeight="500"
                  _focus={{ bg: "teal.200" }}
                  _hover={{ bg: "teal.200" }}
                  onClick={() => setShowModal(0)} // 0 for primary image
                >
                  View
                </Button>

                <MediaShowModal
                  isOpen={showModal === 0}
                  image={formData.propertyDetails_propertyImages_primary}
                  onClose={() => setShowModal(null)}
                />
              </div>
            </div>
          )}

          {formData.propertyDetails_propertyImages_others.map(
            (image, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-center md:justify-between p-4 gap-3 bg-white shadow-md rounded-md"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={URL.createObjectURL(image)}
                    alt="Other Image"
                    width={40}
                    height={40}
                    style={{ borderRadius: "3px" }}
                  />
                  <span className="hidden md:block text-sm font-medium text-[#3F3F46]">
                    {truncateText(image.name, 18)}
                  </span>
                  <CheckCircle weight="fill" color="#0D9488" />
                </div>

                <span className="md:hidden text-sm font-medium text-[#3F3F46]">
                  {truncateText(image.name, 18)}
                </span>

                <div className="md:ml-auto flex md:items-end gap-1 flex-col md:flex-row">
                  <div className="flex justify-center gap-1">
                    <Button
                      leftIcon={<Eye weight="fill" />}
                      height="40px"
                      padding="12px 16px"
                      bg="#F4F4F5"
                      boxShadow=""
                      borderRadius="full"
                      color="#3F3F46"
                      fontSize="14px"
                      fontWeight="500"
                      _focus={{ bg: "teal.200" }}
                      _hover={{ bg: "teal.200" }}
                      onClick={() => setShowModal(index + 1)} // Offset by 1 for other images
                    >
                      View
                    </Button>
                  </div>
                  <MediaShowModal
                    isOpen={showModal === index + 1}
                    image={image}
                    onClose={() => setShowModal(null)}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Property Details */}
      <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg">
        {/* Title */}
        <p className="text-lg font-medium text-zinc-500">Property Details</p>
        {/* Divider */}
        <div className="w-full h-px bg-zinc-200"></div>

        {/* Sell Plan / Property Type */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5 w-full">
          {/* Sell Plan */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-500">
                When do you plan to sell the property?
              </p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {formData.propertyDetails_propertyDetails_planToSell}
              </p>
            </div>
          </div>

          {/* Property Type */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-500">Property Type</p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {formData.propertyDetails_propertyDetails_propertyType}
              </p>
            </div>
          </div>
        </div>

        {/*Ownership*/}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5 w-full">
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-500">
                Does the property still have a loan, or is it fully owned?
              </p>
            </div>

            <div className="flex flex-col items-start p-0 gap-3"></div>
            <p className="text-base font-medium leading-[18px] text-left">
              {formData.propertyDetails_propertyDetails_ownershipStatus}
            </p>
          </div>

          {/* Property Condition */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-500">
                Property condition
              </p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {formData.propertyDetails_propertyDetails_propertyCondition}
              </p>
            </div>
          </div>
        </div>

        {/* Occupancy Status */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5 w-full">
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-500">
                Occupancy status
              </p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {formData.propertyDetails_propertyDetails_occupancyStatus}
              </p>
            </div>
          </div>
          {/* Manager */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-500">
                Is there’s a Property Manager for your property?
              </p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {formData.propertyDetails_propertyDetails_propertyManager}
              </p>
            </div>
          </div>{" "}
        </div>

        {/* Manager / Furniture */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5 md:h-[66px] w-full">
          {/* Furniture */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-500">Furniture</p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {formData.propertyDetails_propertyDetails_furnish}
              </p>
            </div>
          </div>

          {/* Property Issues */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-500">
                Does the property have any issues?
              </p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {formData.propertyDetails_propertyDetails_propertyIssues.join(
                  ", "
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Furniture sale */}
        <div className="flex flex-col items-start p-0 gap-1.5 h-[66px] w-full">
          <div className="flex flex-row items-center p-0 gap-0.75">
            <p className="text-sm font-normal text-zinc-500">
              Any furniture will be included on sale?
            </p>
          </div>
          <div className="flex flex-col items-start p-0 gap-1 w-full">
            <p className="text-base font-medium leading-[18px] text-left">
              {formData.propertyDetails_propertyDetails_furniture}
            </p>
          </div>
        </div>
      </div>

      {/* Property Specifications */}
      <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg">
        {/* Title */}
        <p className="text-lg font-medium text-zinc-500">
          Property Specifications
        </p>
        {/* Divider */}
        <div className="w-full h-px bg-zinc-200"></div>

        {/* Certificate/Floors */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5  w-full">
          {/* Certificate */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-500">
                Property Certificate
              </p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {
                  formData.propertyDetails_propertySpecifications_propertyCertificate
                }
              </p>
            </div>
          </div>

          {/* Floor */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-500">Floors</p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {formData.propertyDetails_propertySpecifications_floors}
              </p>
            </div>
          </div>
        </div>

        {/* WaterSupply/Bedrooms */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5  w-full">
          {/* Water */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-500">Water Supply</p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {formData.propertyDetails_propertySpecifications_waterSupply}
              </p>
            </div>
          </div>

          {/* Bedrooms */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-500">Bedrooms</p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {formData.propertyDetails_propertySpecifications_bedrooms}
              </p>
            </div>
          </div>
        </div>

        {/* Bathrooms/Garage */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5  w-full">
          {/* Bathrooms */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-500">Bathrooms</p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {formData.propertyDetails_propertySpecifications_bathrooms}
              </p>
            </div>
          </div>

          {/* Garage */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-500">Garage</p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {formData.propertyDetails_propertySpecifications_garage}
              </p>
            </div>
          </div>
        </div>

        {/* Garden/Swimming Pool */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5  w-full">
          {/* Garden */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-500">Garden</p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {formData.propertyDetails_propertySpecifications_garden}
              </p>
            </div>
          </div>

          {/* Swimming Pool */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-500">Swimming Pool</p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {formData.propertyDetails_propertySpecifications_swimPool}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg">
        {/* Title */}
        <p className="text-lg font-medium text-zinc-500">Description</p>
        {/* Divider */}
        <div className="w-full h-px bg-zinc-200">
          <div
            className="text-sm font-medium text-zinc-500"
            dangerouslySetInnerHTML={{
              __html: formData.propertyDetails_description,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPanel;
