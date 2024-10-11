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

interface PersonalDetailPanelProps {
  formData: FormData;
}

const PersonalDetailPanel: React.FC<PersonalDetailPanelProps> = ({
  formData,
}) => {
  const isLoading = false;
  const [showModal, setShowModal] = useState(false);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    const start = text.slice(0, 10);
    const end = text.slice(-10);
    return `${start}...${end}`;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Personal Details */}
      <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg">
        {/* Title */}
        <p className="text-lg font-medium text-zinc-500">Personal Details</p>
        {/* Divider */}
        <div className="w-full h-px bg-zinc-200"></div>

        {/* Issued By/Name */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5 w-full">
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

        {/* Gmap */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5  w-full">
          {/* G Map */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-500">
                Google Map Url
              </p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left text-teal-600">
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    if (
                      typeof window !== "undefined" &&
                      formData.propertyDetails_propertySummary_googleMapUrl
                    ) {
                      window.open(
                        formData.propertyDetails_propertySummary_googleMapUrl,
                        "_blank"
                      );
                    }
                  }}
                >
                  {truncateText(
                    formData.propertyDetails_propertySummary_googleMapUrl,
                    20
                  )}
                </span>

                <ArrowSquareOut
                  color="black"
                  onClick={() => {
                    if (
                      typeof window !== "undefined" &&
                      formData.propertyDetails_propertySummary_googleMapUrl
                    ) {
                      window.open(
                        formData.propertyDetails_propertySummary_googleMapUrl,
                        "_blank"
                      );
                    }
                  }}
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
                  {formData.propertyDetails_propertySummary_landArea} m³
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
                  {formData.propertyDetails_propertySummary_buildingArea} m³
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
    </div>
  );
};

export default PersonalDetailPanel;
