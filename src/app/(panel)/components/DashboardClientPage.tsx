'use client';

import { useSession } from "next-auth/react";
import PanelLayout from "../layout/PanelLayout";
import { useRouter } from "next/navigation";

const DashboardClientPage = () => {
  const { data } = useSession();
  const router = useRouter();

  if (!data) {
    router.push('/');
    return (<></>);
  }

  return (
    <div className="max-w-screen">
      <PanelLayout pageTitle="Dashboard" />
    </div>
  )
}

export default DashboardClientPage;