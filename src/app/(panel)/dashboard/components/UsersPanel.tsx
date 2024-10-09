"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { DashboardData } from "@/types/dashboardData";
import {
  CaretCircleDoubleUp,
  ChartBar,
  CurrencyDollar,
} from "@phosphor-icons/react/dist/ssr";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

interface UsersPanelProps {
  dashboardData: DashboardData;
}

const UsersPanel: React.FC<UsersPanelProps> = ({ dashboardData }) => {
  const series = [75, 15];
  const options = {
    chart: {
      type: "donut" as const,
    },
    legend: {
      position: "bottom" as const,
    },
    labels: ["Kyc", "Non-Kyc"],
    colors: ["#F59E0B", "#0D9488"],
  };

  return (
    <div className="flex flex-col items-start p-5 gap-[20px] ">
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

      {/* Proprety Listing Request */}
      <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg">
        {/* Title */}
        <p className="text-lg font-medium text-zinc-500">
          Proprety Listing Request
        </p>
        {/* Divider */}
        <div className="w-full h-px bg-zinc-200"></div>

        <div id="chart">
          <ReactApexChart options={options} series={series} type="donut" />
        </div>
      </div>

      {/* Top 5 */}
      <div className="flex flex-col items-starT gap-5 w-full">
        <div className="flex flex-col md:flex-row w-full gap-[24px]">
          {/* Top 5 Buy */}
          <div className="flex flex-col p-4 gap-5 w-full bg-white shadow-md rounded-lg h-[444px]">
            {/* Title */}
            <p className="text-lg font-medium text-zinc-500">
              5 Latest Property Traded Buy{" "}
            </p>
            {/* Divider */}
            <div className="w-full h-px bg-zinc-200"></div>
            <div className="flex flex-col gap-5">
              {dashboardData.property_latestBuy.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center w-full"
                >
                  <div className="flex justify-between items-center w-full">
                    <div className="flex flex-row gap-4">
                      <div className="flex flex-col p-1 justify-between h-full">
                        <p className="font-bold text-sm leading-[18px] text-[#042F2E]">
                          {index + 1}.
                        </p>
                      </div>
                      <Image
                        src={item.imageUrl}
                        alt="Property Image"
                        width={52}
                        height={52}
                        layout="fixed"
                      />

                      <div className="flex flex-col p-1 justify-between">
                        <p className="font-bold text-sm text-[#042F2E]">
                          {item.address}
                        </p>
                        <p className="font-normal text-xs text-[#71717A]">
                          {item.city}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <p className="font-bold text-base text-[#0D9488]">
                        {item.price}
                        <span className="inline"> USD</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top 5 Sell */}
          <div className="flex flex-col p-4 gap-5 w-full bg-white shadow-md rounded-lg h-[444px]">
            {/* Title */}
            <p className="text-lg font-medium text-zinc-500">
              5 Latest Property Traded Sell{" "}
            </p>
            {/* Divider */}
            <div className="w-full h-px bg-zinc-200"></div>
            <div className="flex flex-col gap-5">
              {dashboardData.property_latestSell.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center w-full"
                >
                  <div className="flex justify-between items-center w-full">
                    <div className="flex flex-row gap-4">
                      <div className="flex flex-col p-1 justify-between h-full">
                        <p className="font-bold text-sm leading-[18px] text-[#042F2E]">
                          {index + 1}.
                        </p>
                      </div>
                      <Image
                        src={item.imageUrl}
                        alt="Property Image"
                        width={52}
                        height={52}
                        layout="fixed"
                      />

                      <div className="flex flex-col p-1 justify-between">
                        <p className="font-bold text-sm text-[#042F2E]">
                          {item.address}
                        </p>
                        <p className="font-normal text-xs text-[#71717A]">
                          {item.city}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <p className="font-bold text-base text-[#0D9488]">
                        {item.price}
                        <span className="inline"> USD</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPanel;
