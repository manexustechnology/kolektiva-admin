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
  Funnel,
  MagnifyingGlass,
  PencilSimpleLine,
  Plus,
} from "@phosphor-icons/react/dist/ssr";
import { Eye } from "@phosphor-icons/react";
import { SorterResult } from "antd/es/table/interface";
import { Box, Input, Button } from "@chakra-ui/react";
import { generateJWTBearerForAdmin } from "@/utils/jwt";
import {
  fetchChangeListedPropertyStatus,
  fetchGetAdminListedProperty,
  fetchGetAdminListedPropertyDetail,
} from "@/fetch/admin/listed-property.fetch";
import dayjs from "dayjs";
import { AdminListedPropertyResponse } from "@/types/admin/listed-property";
import { useQuery } from "@tanstack/react-query";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>["field"];
  sortOrder?: SorterResult<any>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

const ListedPropertyPage: React.FC = () => {
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
      // router.push(`/view/${record.id}`);
      const response = await fetchGetAdminListedPropertyDetail(record.id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("view listing", response);
    } else if (key === "edit") {
      // router.push(`/edit/${record.id}`);
      try {
        const response = await fetchChangeListedPropertyStatus(
          record.id,
          {
            status: "initialOffering",
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
      dataIndex: ["isUpcoming", "isAftermarket"],
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
          <a href="#">
            {record.isUpcoming
              ? "Upcoming"
              : record.isAftermarket
              ? "Aftermarket"
              : "Initial Offering"}
          </a>
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

  const searchParams = useSearchParams();

  const fetchData = async (): Promise<
    AdminListedPropertyResponse[] | undefined
  > => {
    if (domLoaded) {
      let result: AdminListedPropertyResponse[] = [];
      setLoading(true);
      try {
        const token = await generateJWTBearerForAdmin(
          session?.user?.email || ""
        );
        const response = await fetchGetAdminListedProperty(
          {
            page: Number(tableParams.pagination?.current),
            perPage: Number(tableParams.pagination?.pageSize),
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
    AdminListedPropertyResponse[] | undefined
  >({
    queryKey: [
      "listedProperty",
      tableParams.pagination?.current,
      tableParams.pagination?.pageSize,
      tableParams?.sortOrder,
      tableParams?.sortField,
      domLoaded,
      session,
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
          <h2 className="text-2xl font-bold">Listed Property</h2>
          <div className="flex flex-col md:flex-row pt-4 pb-4 relative bg-white rounded-md gap-2">
            <div className="items-center justify-center">
              <div className="flex my-1 justify-center items-center px-3 py-4 w-full h-10 bg-[#F4F4F5] rounded-full">
                {/* Magnifying Glass Icon */}
                <Box as={MagnifyingGlass} size="16px" color="#3F3F46" />

                {/* Input Field */}
                <Input
                  id="searchquery"
                  placeholder="Search"
                  variant="unstyled"
                  fontSize="sm"
                  fontWeight="medium"
                  color="#71717A"
                  border="none"
                  _placeholder={{ color: "#71717A" }}
                />
              </div>
            </div>
            <div className="flex mt-1 mb-1 gap-4">
              <Button
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                p="12px 16px"
                gap="6px"
                m="0 auto"
                h="40px"
                bg="#CCFBF1"
                borderRadius="100px"
                _focus={{ boxShadow: "none" }}
                _hover={{ bg: "teal.500" }}
                position="relative"
                overflow="hidden"
                color="#0F766E"
              >
                <Funnel weight="fill" size={16} color="#0F766E" />
                Filter
              </Button>
            </div>
            <div>
              <div className="flex mx-1 md:absolute md:right-0 gap-4">
                <Button
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                  p="12px 16px"
                  gap="6px"
                  m="0 auto"
                  w="171px"
                  h="40px"
                  bg="#0D9488"
                  borderRadius="100px"
                  _focus={{ boxShadow: "none" }}
                  _hover={{ bg: "teal.400" }}
                  position="relative"
                  overflow="hidden"
                  onClick={() => {
                    router.push("/list-new-property");
                  }}
                >
                  <Plus size={16} color="#FFFFFF" />
                  List Property
                </Button>
              </div>
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

export default ListedPropertyPage;
