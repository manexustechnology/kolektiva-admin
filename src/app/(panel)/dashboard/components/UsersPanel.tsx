"use client";

import Image from "next/image";
import React from "react";
import dynamic from "next/dynamic";
import { DashboardData } from "@/types/dashboardData";
import { HandCoins, User, UserCheck } from "@phosphor-icons/react/dist/ssr";

// Dynamically import ReactApexChart to disable SSR for this component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface UsersPanelProps {
  dashboardData: DashboardData;
}

const UsersPanel: React.FC<UsersPanelProps> = ({ dashboardData }) => {
  const series = [dashboardData.users_kyc, dashboardData.users_nonKyc];
  const labels = [
    `Kyc (${dashboardData.users_kyc})`,
    `Non-Kyc (${dashboardData.users_nonKyc})`,
  ];

  const options = {
    chart: {
      type: "donut" as const,
    },
    legend: {
      position: "bottom" as const,
      formatter: function (
        seriesName: string,
        opts: { seriesIndex: number; w: { globals: { series: number[] } } }
      ) {
        const value = opts.w.globals.series[opts.seriesIndex];
        return `${seriesName} = ${value} Users`;
      },
    },
    labels,
    colors: ["#F59E0B", "#0D9488"],
  };

  return (
    <div className="flex flex-col items-start p-5 gap-[20px] ">
      {/* Total Registered */}
      <div className="flex flex-col items-start gap-5 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-[24px]">
          {/* Chart */}
          <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg h-[348px]">
            {/* Title */}
            <p className="text-lg font-medium text-zinc-500">
              Total Registered
            </p>
            {/* Divider */}
            <div className="w-full h-px bg-zinc-200"></div>
            <div className="flex flex-col justify-center items-center p-4 gap-5 w-full bg-white shadow-md rounded-lg h-full w-full">
              <div id="chart">
                <ReactApexChart
                  options={options}
                  series={series}
                  type="donut"
                  height={200}
                />
              </div>
            </div>
          </div>

          {/* Total Investor */}
          <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg h-[348px]">
            {/* Title */}
            <p className="text-lg font-medium text-zinc-500">Total Investor</p>
            {/* Divider */}
            <div className="w-full h-px bg-zinc-200"></div>
            <div className="flex flex-col justify-center items-center p-4 gap-5 w-full bg-white shadow-md rounded-lg h-full w-full">
              <div className="w-[68px] h-[68px] bg-zinc-100 rounded-full">
                <div className="flex w-[68px] h-[68px] bg-zinc-100 rounded-full justify-center items-center">
                  <HandCoins color="#3F3F46" size={30} />
                </div>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <p className="text-sm font-medium text-neutral-700">
                  User Bought Property Token
                </p>
                <p className="text-xl font-bold text-teal-600">
                  {dashboardData.users_investersNum} User
                </p>
              </div>
            </div>
          </div>

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

      {/* Top 10 */}
      <div className="flex flex-col items-starT gap-5 w-full">
        <div className="flex flex-col md:flex-row w-full gap-[24px]">
          <div className="flex flex-col p-4 gap-5 w-full bg-white shadow-md rounded-lg h-[444px]">
            {/* Title */}
            <p className="text-lg font-medium text-zinc-500">
              5 Latest Property Traded Buy{" "}
            </p>
            {/* Divider */}
            <div className="w-full h-px bg-zinc-200"></div>
            <div className="flex flex-row gap-[59px]">
              {/* Top 5 */}
              <div className="flex flex-col gap-5 w-full">
                {dashboardData.users_topInverstors
                  .slice(0, 5)
                  .map((item, index) => (
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
                            alt="User Image"
                            width={52}
                            height={52}
                            layout="fixed"
                          />

                          <div className="flex items-center justify-center">
                            <p className="font-bold text-sm text-[#042F2E]">
                              {item.name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <p className="font-bold text-base text-[#0D9488]">
                            {item.amount}
                            <span className="inline"> USD</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              {/* Top 5(2) */}
              <div className="flex flex-col gap-5 w-full">
                {dashboardData.users_topInverstors
                  .slice(6, 11)
                  .map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-center items-center w-full"
                    >
                      <div className="flex justify-between items-center w-full">
                        <div className="flex flex-row gap-4">
                          <div className="flex flex-col p-1 justify-between h-full">
                            <p className="font-bold text-sm leading-[18px] text-[#042F2E]">
                              {index + 6}.
                            </p>
                          </div>
                          <Image
                            src={item.imageUrl}
                            alt="User Image"
                            width={52}
                            height={52}
                            layout="fixed"
                          />

                          <div className="flex items-center justify-center">
                            <p className="font-bold text-sm text-[#042F2E]">
                              {item.name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <p className="font-bold text-base text-[#0D9488]">
                            {item.amount}
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
    </div>
  );
};

export default UsersPanel;
