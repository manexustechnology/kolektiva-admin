"use client";

import React, { useState } from "react";
import { DashboardData } from "@/types/dashboardData";
import {
  CaretCircleDoubleUp,
  ChartBar,
  CurrencyDollar,
} from "@phosphor-icons/react/dist/ssr";

interface PropertyPanelProps {
  dashboardData: DashboardData;
}

const PropertyPanel: React.FC<PropertyPanelProps> = ({ dashboardData }) => {
  return (
    <>
      {/* Property Listed */}
      <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg">
        {/* Title */}
        <p className="text-lg font-medium text-zinc-500">Property Listed</p>
        {/* Divider */}
        <div className="w-full h-px bg-zinc-200"></div>

        <div className="flex flex-col md:flex-row w-full gap-[24px]">
          {/* Upcomming */}
          <div className="flex flex-col justify-center items-center p-4 gap-5 w-full bg-white shadow-md rounded-lg h-[246px]">
            <div className="w-[68px] h-[68px] bg-zinc-100 rounded-full">
              <div className="flex w-[68px] h-[68px] bg-zinc-100 rounded-full justify-center items-center">
                <CaretCircleDoubleUp color="#3F3F46" size={30} />
              </div>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <p className="text-sm font-medium text-neutral-700">Upcomming</p>
              <p className="text-xl font-bold text-teal-600">
                {dashboardData.property_propertyListed_upcomming} Property
              </p>
            </div>
          </div>

          {/* IPO */}
          <div className="flex flex-col justify-center items-center p-4 gap-5 w-full bg-white shadow-md rounded-lg h-[246px]">
            <div className="w-[68px] h-[68px] bg-zinc-100 rounded-full">
              <div className="flex w-[68px] h-[68px] bg-zinc-100 rounded-full justify-center items-center">
                <CurrencyDollar color="#3F3F46" size={30} />
              </div>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <p className="text-sm font-medium text-neutral-700">IPO</p>
              <p className="text-xl font-bold text-teal-600">
                {dashboardData.property_propertyListed_ipo} Property
              </p>
            </div>
          </div>

          {/* Aftermarket */}
          <div className="flex flex-col justify-center items-center p-4 gap-5 w-full bg-white shadow-md rounded-lg h-[246px]">
            <div className="flex w-[68px] h-[68px] bg-zinc-100 rounded-full justify-center items-center">
              <ChartBar color="#3F3F46" size={30} />
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <p className="text-sm font-medium text-neutral-700">
                Aftermarket
              </p>
              <p className="text-xl font-bold text-teal-600">
                {dashboardData.property_propertyListed_aftermarket} Property
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyPanel;
