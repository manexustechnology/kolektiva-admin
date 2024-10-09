"use client";

import { Suspense } from "react";
import DashboardMain from "./components/DashboardMain";

export default function Dashboard() {
  return (
    <>
      <Suspense>
        <DashboardMain />
      </Suspense>
    </>
  );
}
