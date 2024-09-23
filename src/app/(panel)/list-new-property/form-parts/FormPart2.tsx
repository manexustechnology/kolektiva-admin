"use client";

import React, { useState } from "react";
import { FormData } from "@/types/formData";

interface FormPart2Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const FormPart2: React.FC<FormPart2Props> = ({ formData, setFormData }) => {
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value === "" ? 0 : Number(value);

    setFormData((prevData) => ({
      ...prevData,
      [name]: numericValue,
    }));
  };

  return (
    <>
      {/* ProgressBar */}
      <div className="flex flex-row items-start p-4 gap-2.5 w-full bg-white shadow-md rounded-lg">
        {/* 1 */}
        <div className="flex flex-col items-start p-0 gap-2.5 w-1/4 flex-grow">
          <div className="w-full h-[6px] bg-teal-600 rounded-full" />
          <div className="text-sm md:text-base  font-medium text-zinc-700">
            1. Property Details
          </div>
        </div>

        {/* 2 */}
        <div className="flex flex-col items-start p-0 gap-2.5 w-1/4 flex-grow">
          <div className="w-full h-[6px] bg-teal-600 rounded-full" />
          <div className="text-sm md:text-base  font-medium text-zinc-700">
            2. Financials
          </div>
        </div>

        {/* 3 */}
        <div className="flex flex-col items-start p-0 gap-2.5 w-1/4 flex-grow">
          <div className="w-full h-[6px] bg-zinc-200 rounded-full" />
          <div className="text-sm md:text-base font-normal text-zinc-400">
            3. Documents
          </div>
        </div>

        {/* 4 */}
        <div className="flex flex-col items-start p-0 gap-2.5 w-1/4 flex-grow">
          <div className="w-full h-[6px] bg-zinc-200 rounded-full" />
          <div className="text-sm md:text-base  font-normal text-zinc-400">
            4. Markets
          </div>
        </div>
      </div>

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
              <p className="text-sm font-normal text-zinc-700">
                Token Price <span className="text-zinc-400">*</span>
              </p>
              {formData.errmsg &&
                formData.financials_token_tokenPrice === 0 && (
                  <span className="text-red-500 text-xs">Required Field</span>
                )}
              {formData.financials_token_tokenPrice < 0 && (
                <span className="text-red-500 text-xs">
                  Enter a number Greater than 0
                </span>
              )}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <div className="flex items-center bg-[#F4F4F5] border-none rounded-full h-[40px] w-full relative">
                <input
                  type="number"
                  name="financials_token_tokenPrice"
                  value={formData.financials_token_tokenPrice}
                  onChange={handleNumberChange}
                  className="flex-grow h-full bg-transparent border-none rounded-full pl-3 md:pr-10 focus:outline-none focus:ring-0 focus:border-none"
                />
                <span className="text-sm text-[#3F3F46] pr-3">USD</span>
              </div>
            </div>
          </div>

          {/* Token Supply  */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2 h-[66px]">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Token Supply <span className="text-zinc-400">*</span>
              </p>
              {formData.errmsg &&
                formData.financials_token_tokenSupply === 0 && (
                  <span className="text-red-500 text-xs">Required Field</span>
                )}
              {formData.financials_token_tokenSupply < 0 && (
                <span className="text-red-500 text-xs">
                  Enter a number Greater than 0
                </span>
              )}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <div className="flex items-center bg-[#F4F4F5] border-none rounded-full h-[40px] w-full relative">
                <input
                  type="number"
                  name="financials_token_tokenSupply"
                  value={formData.financials_token_tokenSupply}
                  onChange={handleNumberChange}
                  className="flex-grow h-full bg-transparent border-none rounded-full pl-3 md:pr-10 focus:outline-none focus:ring-0 focus:border-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Token Value */}
        <div className="flex flex-row items-start p-0 gap-1.5  h-[66px] w-1/2">
          {/* Token Value */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full h-[66px]">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Token Value <span className="text-zinc-400">*</span>
              </p>
              {formData.errmsg &&
                (formData.financials_token_tokenValue === 0 ||
                  isNaN(formData.financials_token_tokenValue)) && (
                  <span className="text-red-500 text-xs">Required Field</span>
                )}
              {formData.financials_token_tokenValue < 0 && (
                <span className="text-red-500 text-xs">
                  Enter a number Greater than 0
                </span>
              )}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <div className="flex items-center bg-[#F4F4F5] border-none rounded-full h-[40px] w-full relative">
                <input
                  type="number"
                  name="financials_token_tokenValue"
                  value={formData.financials_token_tokenValue}
                  onChange={handleNumberChange}
                  className="flex-grow h-full bg-transparent border-none rounded-full pl-3 md:pr-10 focus:outline-none focus:ring-0 focus:border-none"
                />
                <span className="text-sm text-[#3F3F46] pr-3">USD</span>
              </div>
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
                Furniture value Estimation{" "}
                <span className="text-zinc-400">*</span>
              </p>
              {formData.errmsg &&
                formData.financials_propertyFinancials_furnitureValueEstimation ===
                  0 && (
                  <span className="text-red-500 text-xs">Required Field</span>
                )}
              {formData.financials_propertyFinancials_furnitureValueEstimation <
                0 && (
                <span className="text-red-500 text-xs">
                  Enter a number Greater than 0
                </span>
              )}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <div className="flex items-center bg-[#F4F4F5] border-none rounded-full h-[40px] w-full relative">
                <input
                  type="number"
                  name="financials_propertyFinancials_furnitureValueEstimation"
                  value={
                    formData.financials_propertyFinancials_furnitureValueEstimation
                  }
                  onChange={handleNumberChange}
                  className="flex-grow h-full bg-transparent border-none rounded-full pl-3 md:pr-10 focus:outline-none focus:ring-0 focus:border-none"
                />
                <span className="text-sm text-[#3F3F46] pr-3">USD</span>
              </div>
            </div>
          </div>

          {/* Legal & administration costs  */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2 h-[66px]">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Legal & administration costs{" "}
                <span className="text-zinc-400">*</span>
              </p>
              {formData.errmsg &&
                formData.financials_propertyFinancials_legalAdminCost === 0 && (
                  <span className="text-red-500 text-xs">Required Field</span>
                )}
              {formData.financials_propertyFinancials_legalAdminCost < 0 && (
                <span className="text-red-500 text-xs">
                  Enter a number Greater than 0
                </span>
              )}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <div className="flex items-center bg-[#F4F4F5] border-none rounded-full h-[40px] w-full relative">
                <input
                  type="number"
                  name="financials_propertyFinancials_legalAdminCost"
                  value={formData.financials_propertyFinancials_legalAdminCost}
                  onChange={handleNumberChange}
                  className="flex-grow h-full bg-transparent border-none rounded-full pl-3 md:pr-10 focus:outline-none focus:ring-0 focus:border-none"
                />
                <span className="text-sm text-[#3F3F46] pr-3">USD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Listing Fee / Property marketing & management costs  */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5  md:h-[66px] w-full">
          {/* Platform Listing Fee  */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2 h-[66px]">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Platform Listing Fee <span className="text-zinc-400">*</span>
              </p>
              {formData.errmsg &&
                formData.financials_propertyFinancials_platformListingFee ===
                  0 && (
                  <span className="text-red-500 text-xs">Required Field</span>
                )}
              {formData.financials_propertyFinancials_platformListingFee <
                0 && (
                <span className="text-red-500 text-xs">
                  Enter a number Greater than 0
                </span>
              )}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <div className="flex items-center bg-[#F4F4F5] border-none rounded-full h-[40px] w-full relative">
                <input
                  type="number"
                  name="financials_propertyFinancials_platformListingFee"
                  value={
                    formData.financials_propertyFinancials_platformListingFee
                  }
                  onChange={handleNumberChange}
                  className="flex-grow h-full bg-transparent border-none rounded-full pl-3 md:pr-10 focus:outline-none focus:ring-0 focus:border-none"
                />
                <span className="text-sm text-[#3F3F46] pr-3">USD</span>
              </div>
            </div>
          </div>

          {/* Property marketing & management costs  */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2 h-[66px]">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Property marketing & management costs{" "}
                <span className="text-zinc-400">*</span>
              </p>
              {formData.errmsg &&
                formData.financials_propertyFinancials_marketingMangementCost ===
                  0 && (
                  <span className="text-red-500 text-xs">Required Field</span>
                )}
              {formData.financials_propertyFinancials_marketingMangementCost <
                0 && (
                <span className="text-red-500 text-xs">
                  Enter a number Greater than 0
                </span>
              )}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <div className="flex items-center bg-[#F4F4F5] border-none rounded-full h-[40px] w-full relative">
                <input
                  type="number"
                  name="financials_propertyFinancials_marketingMangementCost"
                  value={
                    formData.financials_propertyFinancials_marketingMangementCost
                  }
                  onChange={handleNumberChange}
                  className="flex-grow h-full bg-transparent border-none rounded-full pl-3 md:pr-10 focus:outline-none focus:ring-0 focus:border-none"
                />
                <span className="text-sm text-[#3F3F46] pr-3">USD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Taxes  */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5  md:h-[66px] w-full">
          {/* Property Taxes  */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2 h-[66px]">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Property Taxes <span className="text-zinc-400">*</span>
              </p>
              {formData.errmsg &&
                formData.financials_propertyFinancials_propertyTaxes === 0 && (
                  <span className="text-red-500 text-xs">Required Field</span>
                )}
              {formData.financials_propertyFinancials_propertyTaxes < 0 && (
                <span className="text-red-500 text-xs">
                  Enter a number Greater than 0
                </span>
              )}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <div className="flex items-center bg-[#F4F4F5] border-none rounded-full h-[40px] w-full relative">
                <input
                  type="number"
                  name="financials_propertyFinancials_propertyTaxes"
                  value={formData.financials_propertyFinancials_propertyTaxes}
                  onChange={handleNumberChange}
                  className="flex-grow h-full bg-transparent border-none rounded-full pl-3 md:pr-10 focus:outline-none focus:ring-0 focus:border-none"
                />
                <span className="text-sm text-[#3F3F46] pr-3">USD</span>
              </div>
            </div>
          </div>

          {/* Rental Taxes */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2 h-[66px]">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Rental Taxes <span className="text-zinc-400">*</span>
              </p>
              {formData.errmsg &&
                formData.financials_propertyFinancials_rentalTaxes === 0 && (
                  <span className="text-red-500 text-xs">Required Field</span>
                )}
              {formData.financials_propertyFinancials_rentalTaxes < 0 && (
                <span className="text-red-500 text-xs">
                  Enter a number Greater than 0
                </span>
              )}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <div className="flex items-center bg-[#F4F4F5] border-none rounded-full h-[40px] w-full relative">
                <input
                  type="number"
                  name="financials_propertyFinancials_rentalTaxes"
                  value={formData.financials_propertyFinancials_rentalTaxes}
                  onChange={handleNumberChange}
                  className="flex-grow h-full bg-transparent border-none rounded-full pl-3 md:pr-10 focus:outline-none focus:ring-0 focus:border-none"
                />
                <span className="text-sm text-[#3F3F46] pr-3">USD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rental Yield */}
        <div className="flex flex-row items-start p-0 gap-1.5  h-[66px] w-1/2">
          {/* Rental Yield */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full h-[66px]">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Rental Yield <span className="text-zinc-400">*</span>
              </p>
              {formData.errmsg &&
                (formData.financials_propertyFinancials_rentalYeild === 0 ||
                  isNaN(
                    formData.financials_propertyFinancials_rentalYeild
                  )) && (
                  <span className="text-red-500 text-xs">Required Field</span>
                )}
              {formData.financials_propertyFinancials_rentalYeild < 0 && (
                <span className="text-red-500 text-xs">
                  Enter a number Greater than 0
                </span>
              )}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <div className="flex items-center bg-[#F4F4F5] border-none rounded-full h-[40px] w-full relative">
                <input
                  type="number"
                  name="financials_propertyFinancials_rentalYeild"
                  value={formData.financials_propertyFinancials_rentalYeild}
                  onChange={handleNumberChange}
                  className="flex-grow h-full bg-transparent border-none rounded-full pl-3 md:pr-10 focus:outline-none focus:ring-0 focus:border-none"
                />
                <span className="text-sm text-[#3F3F46] pr-3">%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormPart2;
