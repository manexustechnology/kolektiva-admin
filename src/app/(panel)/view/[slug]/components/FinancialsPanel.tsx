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

interface FinancialsPanelProps {
  formData: FormData;
}

const FinancialsPanel: React.FC<FinancialsPanelProps> = ({ formData }) => {
  const isLoading = false;
  const [showModal, setShowModal] = useState(false);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    const start = text.slice(0, 6);
    const end = text.slice(-6);
    return `${start}...${end}`;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Token */}
      <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg">
        {/* Title */}
        <p className="text-lg font-medium text-zinc-500">Token</p>
        {/* Divider */}
        <div className="w-full h-px bg-zinc-200"></div>

        {/* Token Price / Token Supply */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5  md:h-[66px] w-full">
          {/* Token Price */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2 h-[66px]">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">Token Price</p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {formData.financials_token_tokenPrice} USD
              </p>
            </div>
          </div>

          {/* Token Supply  */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2 h-[66px]">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">Token Supply</p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {formData.financials_token_tokenSupply}
              </p>
            </div>
          </div>
        </div>

        {/* Token Value */}
        <div className="flex flex-row items-start p-0 gap-1.5  h-[66px] w-1/2">
          {/* Token Value */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full h-[66px]">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">Token Value</p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {formData.financials_token_tokenValue} USD
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Property Financials */}
      <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg">
        {/* Title */}
        <p className="text-lg font-medium text-zinc-500">Property Financials</p>
        {/* Divider */}
        <div className="w-full h-px bg-zinc-200"></div>

        {/* Furniture value Estimation / Legal & administration costs  */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5  md:h-[66px] w-full">
          {/* Furniture value Estimation  */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2 h-[66px]">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Furniture value Estimation
              </p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {
                  formData.financials_propertyFinancials_furnitureValueEstimation
                }{" "}
                USD
              </p>
            </div>
          </div>

          {/* Legal & administration costs  */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2 h-[66px]">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Legal & administration costs
              </p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {formData.financials_propertyFinancials_legalAdminCost} USD
              </p>
            </div>
          </div>
        </div>

        {/* Platform Listing Fee / Property marketing & management costs  */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5  md:h-[66px] w-full">
          {/* Platform Listing Fee  */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2 h-[66px]">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Platform Listing Fee
              </p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {formData.financials_propertyFinancials_platformListingFee} USD
              </p>
            </div>
          </div>

          {/* Property marketing & management costs  */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2 h-[66px]">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Property marketing & management costs
              </p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {formData.financials_propertyFinancials_marketingMangementCost}{" "}
                USD
              </p>
            </div>
          </div>
        </div>

        {/* Taxes  */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5  md:h-[66px] w-full">
          {/* Property Taxes  */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2 h-[66px]">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Property Taxes
              </p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {formData.financials_propertyFinancials_propertyTaxes} USD
              </p>
            </div>
          </div>

          {/* Rental Taxes */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2 h-[66px]">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">Rental Taxes</p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {formData.financials_propertyFinancials_rentalTaxes} USD
              </p>{" "}
            </div>
          </div>
        </div>

        {/* Rental Yield */}
        <div className="flex flex-row items-start p-0 gap-1.5  h-[66px] w-1/2">
          {/* Rental Yield */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full h-[66px]">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">Rental Yield</p>
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className="text-base font-medium leading-[18px] text-left">
                {" "}
                {formData.financials_propertyFinancials_rentalYeild} %
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialsPanel;
