"use client";

import { useSession } from "next-auth/react";
import PanelLayout from "../layout/PanelLayout";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Table,
  Dropdown,
  Menu,
  GetProp,
  TablePaginationConfig,
  TableProps,
} from "antd";
import { IMarketFilter } from "@/types/filter";
import {
  CaretDown,
  MagnifyingGlass,
  PencilSimpleLine,
  Plus,
} from "@phosphor-icons/react/dist/ssr";
import { Eye } from "@phosphor-icons/react";
import { SorterResult } from "antd/es/table/interface";
import { Box, Input, Select } from "@chakra-ui/react";
import { generateJWTBearerForAdmin } from "@/utils/jwt";
import { fetchGetAdminListedProperty } from "@/fetch/admin/listed-property.fetch";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import {
  fetchChangePropertyListingRequestStatus,
  fetchGetAdminPropertyListingRequest,
  fetchGetAdminPropertyListingRequestDetail,
} from "@/fetch/admin/property-listing-request.fetch";
import { AdminPropertyListingRequestResponse } from "@/types/admin/property-listing-request";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>["field"];
  sortOrder?: SorterResult<any>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

const statusFilterOptions: string[] = [
  "pending",
  "oncheck",
  "approved",
  "rejected",
  "archived",
];

const PropertyListingRequestPage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // State to control the current page
  const [domLoaded, setDomLoaded] = useState(false);
  const [firstCheckLoggedIn, setFirstCheckLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      showQuickJumper: true,
      pageSizeOptions: ["10", "20", "30", "50", "100"],
      position: ["bottomCenter"],
    },
  });
  const [searchFilter, setSearchFilter] = useState({
    search: "",
    status: "",
  });

  interface FilterBarProps {
    locations: string[];
    propertyTypes: string[];
    sortOptions: string[];
    onFilterApply: (newFilters: any) => void;
    onFilterReset: () => void;
    filters: IMarketFilter;
  }

  const handleMenuClick = async (key: string, record: any) => {
    const token = await generateJWTBearerForAdmin(session?.user?.email || "");
    if (key === "view") {
      // router.push(`/linkA/${record.id}`);
      const response = await fetchGetAdminPropertyListingRequestDetail(
        record.id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("view listing", response);
    } else if (key === "edit") {
      // router.push(`/linkB/${record.id}`);
      try {
        const response = await fetchChangePropertyListingRequestStatus(
          record.id,
          {
            status: "approved",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200 && response.data) {
          console.log("Submission successful", response);
        } else {
          console.log("Submission failed", response);
        }
      } catch (error) {
        // Handle the error if necessary
      }
    }
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "updatedAt",
      key: "updatedAt",
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
          <a href="#">{dayjs(text).format("YYYY-MM-DD HH:mm")} WIB</a>
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
      title: "Name",
      dataIndex: "name",
      key: "name",
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
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
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
      title: "Email",
      dataIndex: "email",
      key: "email",
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
      title: "Price Estimation",
      dataIndex: "priceEstimation",
      key: "priceEstimation",
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
          <a href="#">USD ${Number(text).toLocaleString()}</a>
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
  ];

  useEffect(() => {
    setDomLoaded(true);
    setInterval(() => {
      setFirstCheckLoggedIn(true);
    }, 3000);
  }, []);

  useEffect(() => {
    if (router) {
      if (domLoaded && !session && firstCheckLoggedIn) {
        router.push("/signin");
      }
    }
  }, [router, session, domLoaded, firstCheckLoggedIn]);

  const fetchData = async (): Promise<
    AdminPropertyListingRequestResponse[] | undefined
  > => {
    if (domLoaded) {
      let result: AdminPropertyListingRequestResponse[] = [];
      setLoading(true);
      try {
        const token = await generateJWTBearerForAdmin(
          session?.user?.email || ""
        );
        const response = await fetchGetAdminPropertyListingRequest(
          {
            page: Number(tableParams.pagination?.current),
            perPage: Number(tableParams.pagination?.pageSize),
            search: searchFilter.search,
            status: searchFilter.status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200 && response.data?.data?.data) {
          // setDataSource(response.data.data.data);
          setTableParams((prev) => ({
            ...prev,
            total: response.data.data.meta.total,
          }));
          result = response.data.data.data;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
      return result;
    }
  };

  const { data: dataSource } = useQuery<
    AdminPropertyListingRequestResponse[] | undefined
  >({
    queryKey: [
      "listedProperty",
      tableParams.pagination?.current,
      tableParams.pagination?.pageSize,
      tableParams?.sortOrder,
      tableParams?.sortField,
      domLoaded,
      session,
      searchFilter.search,
      searchFilter.status,
    ],
    queryFn: fetchData,
  });

  const handleTableChange: TableProps<any>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });
  };

  if (!domLoaded || !session) return <></>;

  return (
    <div className="">
      <PanelLayout>
        <div className="w-full p-8 gap-6">
          <h2 className="text-2xl font-bold">Property Listing Request</h2>
          <div className="flex flex-col md:flex-row pt-4 pb-4 relative bg-white rounded-md gap-2">
            <div className="items-center justify-center">
              <div className="flex my-1 justify-center items-center px-3 py-4 w-full h-10 bg-[#F4F4F5] rounded-full gap-2">
                {/* Magnifying Glass Icon */}
                <Box as={MagnifyingGlass} size="16px" color="#3F3F46" />
                {/* Input Field */}
                <Input
                  id="searchquery"
                  type="text"
                  placeholder="Search"
                  variant="unstyled"
                  fontSize="sm"
                  fontWeight="medium"
                  color="#71717A"
                  border="none"
                  _placeholder={{ color: "#71717A" }}
                  _focus={{ border: "none" }}
                  onChange={(e) =>
                    setSearchFilter((prev) => ({
                      ...prev,
                      search: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="flex mt-1 mb-1 gap-4">
              <Select
                id="filterStatus"
                placeholder="All Property Type"
                backgroundColor="#F4F4F5"
                _hover={{
                  backgroundColor: "#CCFBF1",
                }}
                _focus={{
                  backgroundColor: "#CCFBF1",
                }}
                icon={<CaretDown weight="fill" />}
                width="200px"
                rounded={100}
                marginRight={5}
                value={searchFilter.status}
                className="!py-0"
                onChange={(e) =>
                  setSearchFilter((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
              >
                {statusFilterOptions.map((value) => {
                  return (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  );
                })}
              </Select>
            </div>
          </div>
          <Table
            className="overflow-x-auto "
            rowKey={(record) => record.id || ""}
            dataSource={dataSource}
            columns={columns}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
          />
        </div>
      </PanelLayout>
    </div>
  );
};

export default PropertyListingRequestPage;
