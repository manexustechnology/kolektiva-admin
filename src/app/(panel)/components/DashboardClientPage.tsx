'use client';

import { useSession } from "next-auth/react";
import PanelLayout from "../layout/PanelLayout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardClientPage = () => {
  const { data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!data) {
      router.push('/');
    }
  }, [router, data]);

  if (!data) return <></>

  return (
    <div className="max-w-screen">
      <PanelLayout pageTitle="Dashboard" />
    </div>
  )
}

export default DashboardClientPage;