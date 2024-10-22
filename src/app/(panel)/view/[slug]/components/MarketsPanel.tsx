"use client";

import React, { useState } from "react";

import { FormData } from "@/types/formData";
import "../../../styles/quill-custom-styles.css";

interface MarketPanelProps {
  formData: FormData;
}

const MarketPanel: React.FC<MarketPanelProps> = ({ formData }) => {
  const isLoading = false;
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      {/* Makets */}
      <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg">
        {/* Title */}
        <p className="text-lg font-medium text-zinc-500">Markets</p>
        {/* Divider */}
        <div className="w-full h-px bg-zinc-200"></div>

        <div
          className="quill-wrapper"
          dangerouslySetInnerHTML={{
            __html: formData.markets_markets,
          }}
        />
      </div>
    </div>
  );
};

export default MarketPanel;
