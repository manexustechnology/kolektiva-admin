"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { DashboardData } from "@/types/dashboardData";
import { ApexOptions } from "apexcharts";
import { User, UserCheck } from "@phosphor-icons/react";

// Dynamically import the chart component with SSR disabled
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface FinancialsPanelProps {
  dashboardData: DashboardData;
}

const FinancialsPanel: React.FC<FinancialsPanelProps> = ({ dashboardData }) => {
  const [revenueChartSeries] = useState<ApexOptions["series"]>([
    {
      name: "From IPO",
      data: Array.from({ length: 30 }, (_, i) => i + 4),
    },
    {
      name: "From Transactions",
      data: Array.from({ length: 30 }, (_, i) => i + 4),
    },
  ]);

  const [revenueChartOptions] = useState<ApexOptions>({
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: false,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 2,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
      },
    },
    xaxis: {
      title: {
        text: "Year",
        style: {
          fontWeight: 400,
        },
      },
      categories: Array.from({ length: 30 }, (_, i) => (i + 1).toString()),
    },
    colors: ["#0D9488", "#F59E0B", "#65A30D"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "bottom",
      markers: {
        shape: "circle",
      },
    },
    fill: {
      opacity: 1,
    },
  });
  return (
    <div className="flex flex-col items-start p-5 gap-[20px] ">
      {/* Revenue Generated */}
      <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg">
        {/* Title */}
        <p className="text-lg font-medium text-zinc-500">Revenue Generated</p>
        {/* Divider */}
        <div className="w-full h-px bg-zinc-200"></div>

        <div className="w-full rounded-2xl shadow-md p-4">
          <div id="chart">
            {ReactApexChart && (
              <ReactApexChart
                options={revenueChartOptions}
                series={revenueChartSeries}
                type="bar"
                height={350}
              />
            )}
          </div>
        </div>
      </div>

      {/* Total Registered */}
      <div className="flex flex-col items-start gap-5 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-[24px]">
          {/* Active User */}
          <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg h-[348px]">
            {/* Title */}
            <p className="text-lg font-medium text-zinc-500">Active User</p>
            {/* Divider */}
            <div className="w-full h-px bg-zinc-200"></div>
            <div className="flex flex-col justify-center items-center p-4 gap-5 w-full bg-white shadow-md rounded-lg h-full w-full">
              <div className="w-[68px] h-[68px] bg-zinc-100 rounded-full">
                <div className="flex w-[68px] h-[68px] bg-zinc-100 rounded-full justify-center items-center">
                  <UserCheck color="#3F3F46" size={30} />
                </div>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <p className="text-sm font-medium text-neutral-700">
                  Active User Now
                </p>
                <p className="text-xl font-bold text-teal-600">
                  {dashboardData.users_activeUsers} User
                </p>
              </div>
            </div>
          </div>

          {/* New User */}
          <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg h-[348px]">
            {/* Title */}
            <p className="text-lg font-medium text-zinc-500">New User</p>
            {/* Divider */}
            <div className="w-full h-px bg-zinc-200"></div>
            <div className="flex flex-col justify-center items-center p-4 gap-5 w-full bg-white shadow-md rounded-lg h-full w-full">
              <div className="w-[68px] h-[68px] bg-zinc-100 rounded-full">
                <div className="flex w-[68px] h-[68px] bg-zinc-100 rounded-full justify-center items-center">
                  <User color="#3F3F46" size={30} />
                </div>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <p className="text-sm font-medium text-neutral-700">
                  Total New User
                </p>
                <p className="text-xl font-bold text-teal-600">
                  {dashboardData.users_activeUsers} User
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialsPanel;
