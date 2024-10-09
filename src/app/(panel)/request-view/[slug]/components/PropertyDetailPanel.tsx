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

interface PropertyDetailPanelProps {
  formData: FormData;
}

const PropertyDetailPanel: React.FC<PropertyDetailPanelProps> = ({
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
        </div>
      </div>

      {/* Property Details */}
      <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg">
        {/* Title */}
        <p className="text-lg font-medium text-zinc-500">Property Details</p>
        {/* Divider */}
        <div className="w-full h-px bg-zinc-200"></div>

        {/*Ownership*/}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5 w-full">
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
    </div>
  );
};

export default PropertyDetailPanel;
