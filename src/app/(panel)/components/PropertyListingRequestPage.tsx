"use client";

import { useSession } from "next-auth/react";
import PanelLayout from "../layout/PanelLayout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Table } from "antd";

const PropertyListingRequestPage = () => {
  const { data } = useSession();
  const router = useRouter();

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  useEffect(() => {
    if (!data) {
      router.push("/");
    }
  }, [router, data]);

  if (!data) return <></>;

  return (
    <div className="max-w-screen">
      <PanelLayout pageTitle="Listed Property">
        <div className="w-full p-8">
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </PanelLayout>
    </div>
  );
};

export default PropertyListingRequestPage;
