"use client";

import React, { useState } from "react";
import { FormData } from "@/types/formData";

interface FormPart2Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const FormPart2: React.FC<FormPart2Props> = ({ formData, setFormData }) => {
  return (
    <>
      {/* ProgressBar */}
      <div className="flex flex-row items-start p-4 gap-2.5 w-full bg-white shadow-md rounded-lg">
        {/* 1 */}
        <div className="flex flex-col items-start p-0 gap-2.5 w-1/4 flex-grow">
          <div className="w-full h-[6px] bg-teal-600 rounded-full" />
          <div className="text-base font-medium text-zinc-700">
            1. Property Details
          </div>
        </div>

        {/* 2 */}
        <div className="flex flex-col items-start p-0 gap-2.5 w-1/4 flex-grow">
          <div className="w-full h-[6px] bg-teal-600 rounded-full" />
          <div className="text-base font-medium text-zinc-700">
            2. Financials
          </div>
        </div>

        {/* 3 */}
        <div className="flex flex-col items-start p-0 gap-2.5 w-1/4 flex-grow">
          <div className="w-full h-[6px] bg-zinc-200 rounded-full" />
          <div className="text-base font-normal text-zinc-400">
            3. Documents
          </div>
        </div>

        {/* 4 */}
        <div className="flex flex-col items-start p-0 gap-2.5 w-1/4 flex-grow">
          <div className="w-full h-[6px] bg-zinc-200 rounded-full" />
          <div className="text-base font-normal text-zinc-400">4. Markets</div>
        </div>
      </div>
    </>
  );
};

export default FormPart2;
