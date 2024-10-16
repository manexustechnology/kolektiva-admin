"use client";

import React, { useState } from "react";
import { FormData } from "@/types/formData";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface FormPart4Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const FormPart4: React.FC<FormPart4Props> = ({ formData, setFormData }) => {
  const handleDescriptionChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      markets_markets: value,
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
          <div className="text-sm md:text-base  font-normal text-zinc-400">
            2. Financials
          </div>
        </div>

        {/* 3 */}
        <div className="flex flex-col items-start p-0 gap-2.5 w-1/4 flex-grow">
          <div className="w-full h-[6px] bg-teal-600 rounded-full" />
          <div className="text-sm md:text-base  font-normal text-zinc-400">
            3. Documents
          </div>
        </div>

        {/* 4 */}
        <div className="flex flex-col items-start p-0 gap-2.5 w-1/4 flex-grow">
          <div className="w-full h-[6px] bg-teal-600 rounded-full" />
          <div className="text-sm md:text-base  font-medium text-zinc-700">
            4. Markets
          </div>
        </div>
      </div>

      {/* Makets */}
      <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg md:h-[240px]">
        {/* Title */}
        <p className="text-lg font-medium text-zinc-500">
          Markets{" "}
          {formData.errmsg && formData.markets_markets === "" && (
            <span className="text-red-500 text-xs">Required Field</span>
          )}
        </p>
        {/* Divider */}
        <div className="w-full h-px bg-zinc-200"></div>

        <ReactQuill
          className="w-full"
          value={formData.markets_markets}
          onChange={handleDescriptionChange}
        />
      </div>
    </>
  );
};

export default FormPart4;
