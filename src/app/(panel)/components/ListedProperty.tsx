"use client";

import { useSession } from "next-auth/react";
import PanelLayout from "../layout/PanelLayout";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Table, Dropdown, Menu, Button } from "antd";
import { TablePaginationConfig } from "antd/es/table/interface";
import FilterBar from "./FilterBar";
import { IMarketFilter } from "@/types/filter";
import { CaretDown, PencilSimpleLine } from "@phosphor-icons/react/dist/ssr";
import { Eye } from "@phosphor-icons/react";

const ListedPropertyPage: React.FC = () => {
  const { data } = useSession();
  const router = useRouter();

  // State to control the current page
  const [current, setCurrent] = useState(1);

  interface FilterBarProps {
    locations: string[];
    propertyTypes: string[];
    sortOptions: string[];
    onFilterApply: (newFilters: any) => void;
    onFilterReset: () => void;
    filters: IMarketFilter;

    //   initialSliderValue1?: number;
    //   initialSliderValue2?: number;
  }

  const dataSource = [
    {
      key: "1",
      date: "2024-09-01",
      status: "Visible",
      address: "84 Cathedral Road, Manchester, Greater Manchester, M3 6FD",
      state: "London",
      type: "Residential",
      phase: "Initial",
    },
    {
      key: "2",
      date: "2024-09-02",
      status: "Hidden",
      address: "85 Oak Street, Manchester, Greater Manchester, M3 6FD",
      state: "London",
      type: "Residential",
      phase: "Final",
    },
    {
      key: "3",
      date: "2024-09-03",
      status: "Hidden",
      address: "86 Elm Avenue, Manchester, Greater Manchester, M3 6FD",
      state: "London",
      type: "Commercial",
      phase: "Development",
    },
    {
      key: "4",
      date: "2024-09-04",
      status: "Visible",
      address: "87 Maple Lane, Manchester, Greater Manchester, M3 6FD",
      state: "Springfield",
      type: "Residential",
      phase: "Planning",
    },
    {
      key: "5",
      date: "2024-09-05",
      status: "Hidden",
      address: "88 Birch Drive, Manchester, Greater Manchester, M3 6FD",
      state: "Springfield",
      type: "Commercial",
      phase: "Final",
    },
    {
      key: "6",
      date: "2024-09-06",
      status: "Visible",
      address: "89 Cedar Street, Manchester, Greater Manchester, M3 6FD",
      state: "London",
      type: "Residential",
      phase: "Initial",
    },
    {
      key: "7",
      date: "2024-09-07",
      status: "Hidden",
      address: "90 Pine Road, Manchester, Greater Manchester, M3 6FD",
      state: "Springfield",
      type: "Commercial",
      phase: "Development",
    },
    {
      key: "8",
      date: "2024-09-08",
      status: "Visible",
      address: "91 Fir Avenue, Manchester, Greater Manchester, M3 6FD",
      state: "London",
      type: "Residential",
      phase: "Planning",
    },
    {
      key: "9",
      date: "2024-09-09",
      status: "Hidden",
      address: "92 Oak Street, Manchester, Greater Manchester, M3 6FD",
      state: "London",
      type: "Commercial",
      phase: "Initial",
    },
    {
      key: "10",
      date: "2024-09-10",
      status: "Visible",
      address: "93 Elm Avenue, Manchester, Greater Manchester, M3 6FD",
      state: "Springfield",
      type: "Residential",
      phase: "Final",
    },
    {
      key: "11",
      date: "2024-09-11",
      status: "Hidden",
      address: "94 Maple Lane, Manchester, Greater Manchester, M3 6FD",
      state: "London",
      type: "Commercial",
      phase: "Planning",
    },
    {
      key: "12",
      date: "2024-09-12",
      status: "Visible",
      address: "95 Birch Drive, Manchester, Greater Manchester, M3 6FD",
      state: "Springfield",
      type: "Residential",
      phase: "Development",
    },
    {
      key: "13",
      date: "2024-09-13",
      status: "Hidden",
      address: "96 Cedar Street, Manchester, Greater Manchester, M3 6FD",
      state: "London",
      type: "Commercial",
      phase: "Final",
    },
    {
      key: "14",
      date: "2024-09-14",
      status: "Visible",
      address: "97 Pine Road, Manchester, Greater Manchester, M3 6FD",
      state: "Springfield",
      type: "Residential",
      phase: "Initial",
    },
    {
      key: "15",
      date: "2024-09-15",
      status: "Hidden",
      address: "98 Fir Avenue, Manchester, Greater Manchester, M3 6FD",
      state: "London",
      type: "Commercial",
      phase: "Development",
    },
    {
      key: "16",
      date: "2024-09-16",
      status: "Visible",
      address: "99 Oak Street, Manchester, Greater Manchester, M3 6FD",
      state: "Springfield",
      type: "Residential",
      phase: "Planning",
    },
    {
      key: "17",
      date: "2024-09-17",
      status: "Hidden",
      address: "100 Elm Avenue, Manchester, Greater Manchester, M3 6FD",
      state: "London",
      type: "Commercial",
      phase: "Final",
    },
    {
      key: "18",
      date: "2024-09-18",
      status: "Visible",
      address: "101 Maple Lane, Manchester, Greater Manchester, M3 6FD",
      state: "Springfield",
      type: "Residential",
      phase: "Initial",
    },
    {
      key: "19",
      date: "2024-09-19",
      status: "Hidden",
      address: "102 Birch Drive, Manchester, Greater Manchester, M3 6FD",
      state: "London",
      type: "Commercial",
      phase: "Development",
    },
    {
      key: "20",
      date: "2024-09-20",
      status: "Visible",
      address: "103 Cedar Street, Manchester, Greater Manchester, M3 6FD",
      state: "Springfield",
      type: "Residential",
      phase: "Planning",
    },
  ];

  const handleMenuClick = (key: string, record: any) => {
    if (key === "view") {
      router.push(`/linkA/${record.id}`);
    } else if (key === "edit") {
      router.push(`/linkB/${record.id}`);
    }
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text: string, record: any) => (
        <Dropdown
          overlay={
            <Menu
              onClick={({ key }) => handleMenuClick(key, record)}
              style={{ width: "140px" }}
            >
              <Menu.Item key="view">
                <div className="flex flex-row items-center">
                  <Eye weight="fill" style={{ marginRight: "8px" }} />
                  View
                </div>
              </Menu.Item>
              <Menu.Item key="edit">
                <div className="flex flex-row items-center">
                  <PencilSimpleLine
                    weight="fill"
                    style={{ marginRight: "8px" }}
                  />
                  Edit
                </div>
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <a href="#">{text}</a>
        </Dropdown>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: string, record: any) => (
        <Dropdown
          overlay={
            <Menu
              onClick={({ key }) => handleMenuClick(key, record)}
              style={{ width: "140px" }}
            >
              <Menu.Item key="view">
                <div className="flex flex-row items-center">
                  <Eye weight="fill" style={{ marginRight: "8px" }} />
                  View
                </div>
              </Menu.Item>
              <Menu.Item key="edit">
                <div className="flex flex-row items-center">
                  <PencilSimpleLine
                    weight="fill"
                    style={{ marginRight: "8px" }}
                  />
                  Edit
                </div>
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <a href="#">{text}</a>
        </Dropdown>
      ),
    },
    {
      title: "Property Address",
      dataIndex: "address",
      key: "address",
      render: (text: string, record: any) => (
        <Dropdown
          overlay={
            <Menu
              onClick={({ key }) => handleMenuClick(key, record)}
              style={{ width: "140px" }}
            >
              <Menu.Item key="view">
                <div className="flex flex-row items-center">
                  <Eye weight="fill" style={{ marginRight: "8px" }} />
                  View
                </div>
              </Menu.Item>
              <Menu.Item key="edit">
                <div className="flex flex-row items-center">
                  <PencilSimpleLine
                    weight="fill"
                    style={{ marginRight: "8px" }}
                  />
                  Edit
                </div>
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <a href="#">{text}</a>
        </Dropdown>
      ),
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      render: (text: string, record: any) => (
        <Dropdown
          overlay={
            <Menu
              onClick={({ key }) => handleMenuClick(key, record)}
              style={{ width: "140px" }}
            >
              <Menu.Item key="view">
                <div className="flex flex-row items-center">
                  <Eye weight="fill" style={{ marginRight: "8px" }} />
                  View
                </div>
              </Menu.Item>
              <Menu.Item key="edit">
                <div className="flex flex-row items-center">
                  <PencilSimpleLine
                    weight="fill"
                    style={{ marginRight: "8px" }}
                  />
                  Edit
                </div>
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <a href="#">{text}</a>
        </Dropdown>
      ),
    },
    {
      title: "Property Type",
      dataIndex: "type",
      key: "type",
      render: (text: string, record: any) => (
        <Dropdown
          overlay={
            <Menu
              onClick={({ key }) => handleMenuClick(key, record)}
              style={{ width: "140px" }}
            >
              <Menu.Item key="view">
                <div className="flex flex-row items-center">
                  <Eye weight="fill" style={{ marginRight: "8px" }} />
                  View
                </div>
              </Menu.Item>
              <Menu.Item key="edit">
                <div className="flex flex-row items-center">
                  <PencilSimpleLine
                    weight="fill"
                    style={{ marginRight: "8px" }}
                  />
                  Edit
                </div>
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <a href="#">{text}</a>
        </Dropdown>
      ),
    },
    {
      title: "Phase",
      dataIndex: "phase",
      key: "phase",
      render: (text: string, record: any) => (
        <Dropdown
          overlay={
            <Menu
              onClick={({ key }) => handleMenuClick(key, record)}
              style={{ width: "140px" }}
            >
              <Menu.Item key="view">
                <div className="flex flex-row items-center">
                  <Eye weight="fill" style={{ marginRight: "8px" }} />
                  View
                </div>
              </Menu.Item>
              <Menu.Item key="edit">
                <div className="flex flex-row items-center">
                  <PencilSimpleLine
                    weight="fill"
                    style={{ marginRight: "8px" }}
                  />
                  Edit
                </div>
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <a href="#">{text}</a>
        </Dropdown>
      ),
    },
  ];

  useEffect(() => {
    if (!data) {
      router.push("/");
    }
  }, [router, data]);

  if (!data) return <></>;

  const pageSize = 2;
  const totalPages = Math.ceil(dataSource.length / pageSize);

  useEffect(() => {
    if (current > totalPages) {
      setCurrent(Math.max(totalPages, 1));
    }
  }, [dataSource, totalPages]);

  const pageMenu = (
    <Menu>
      {Array.from({ length: totalPages }, (_, index) => (
        <Menu.Item key={index + 1} onClick={() => setCurrent(index + 1)}>
          Page {index + 1}
        </Menu.Item>
      ))}
    </Menu>
  );

  const [filters, setFilters] = useState<IMarketFilter>({
    location: "",
    propertyType: "",
    status: "",
    sort: "",
    priceRange: [0, 1000],
  });

  const searchParams = useSearchParams();

  useEffect(() => {
    const filterLocation = searchParams.get("location") || "";
    const filterPropertyType = searchParams.get("propertyType") || "";
    const filterStatus = searchParams.get("status") || "";

    setFilters((prev) => ({
      ...prev,
      location: filterLocation,
      propertyType: filterPropertyType,
      status: filterStatus,
    }));
  }, []);

  const handleFilterApply = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleFilterReset = () => {
    setFilters({
      location: "",
      propertyType: "",
      status: "",
      sort: "",
      priceRange: [0, 1000],
    });
  };

  const filterBarProps: FilterBarProps = {
    locations: ["DKI Jakarta", "Surabaya", "Denpasar", "Bandung"],
    propertyTypes: ["House", "Apartment"],
    sortOptions: ["Featured", "Newest", "Oldest"],
    onFilterApply: handleFilterApply,
    onFilterReset: handleFilterReset,
    filters,
  };

  return (
    <div className="">
      <PanelLayout pageTitle="Listed Property">
        <div className="w-full p-8 gap-6">
          <FilterBar {...filterBarProps} />
          <Table
            className="overflow-x-auto "
            dataSource={dataSource.slice(
              (current - 1) * pageSize,
              current * pageSize
            )}
            pagination={false}
            columns={columns}
          />

          <div className="flex flex-col md:flex-row justify-between mt-4 gap-4">
            <div className="flex flex-row items-center gap-1">
              <p className="text-sm font-normal text-zinc-500">Show</p>
              <Dropdown overlay={pageMenu} trigger={["click"]}>
                <Button
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "10px 12px",
                    gap: "8px",
                    width: "auto",
                    backgroundColor: "#F4F4F5",
                    borderRadius: "100px",
                    display: "flex",
                  }}
                >
                  {current}
                  <CaretDown weight="fill" size={20} color="#A1A1AA" />
                </Button>
              </Dropdown>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setCurrent(1)}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  current === 1
                    ? "bg-zinc-100 text-zinc-700"
                    : "bg-teal-600 text-white"
                }`}
                disabled={current === 1}
                style={{ cursor: current === 1 ? "not-allowed" : "pointer" }}
              >
                {"<<"}
              </button>

              <button
                onClick={() => setCurrent(Math.max(current - 1, 1))}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  current === 1
                    ? "bg-zinc-100 text-zinc-700"
                    : "bg-teal-600 text-white"
                }`}
                disabled={current === 1}
                style={{ cursor: current === 1 ? "not-allowed" : "pointer" }}
              >
                {"<"}
              </button>

              {current > 3 && (
                <>
                  <button
                    onClick={() => setCurrent(1)}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200"
                  >
                    1
                  </button>

                  <span className="flex items-center">...</span>
                </>
              )}

              {Array.from({ length: 2 })
                .map((_, idx) => current - 2 + idx)
                .filter((page) => page > 0)
                .map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrent(page)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      current === page
                        ? "bg-teal-600 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                ))}

              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-teal-600 text-white">
                {current}
              </button>

              {Array.from({ length: 2 })
                .map((_, idx) => current + idx + 1)
                .filter((page) => page <= totalPages)
                .map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrent(page)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      current === page
                        ? "bg-teal-600 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                ))}

              {current < totalPages - 2 && (
                <>
                  <span className="flex items-center">...</span>

                  <button
                    onClick={() => setCurrent(totalPages)}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200"
                  >
                    {totalPages}
                  </button>
                </>
              )}

              <button
                onClick={() => setCurrent(Math.min(current + 1, totalPages))}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  current === totalPages
                    ? "bg-zinc-100 text-zinc-700"
                    : "bg-teal-600 text-white"
                }`}
                disabled={current === totalPages}
                style={{
                  cursor: current === totalPages ? "not-allowed" : "pointer",
                }}
              >
                {">"}
              </button>

              <button
                onClick={() => setCurrent(totalPages)}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  current === totalPages
                    ? "bg-zinc-100 text-zinc-700"
                    : "bg-teal-600 text-white"
                }`}
                disabled={current === totalPages}
                style={{
                  cursor: current === totalPages ? "not-allowed" : "pointer",
                }}
              >
                {">>"}
              </button>
            </div>
          </div>
        </div>
      </PanelLayout>
    </div>
  );
};

export default ListedPropertyPage;
