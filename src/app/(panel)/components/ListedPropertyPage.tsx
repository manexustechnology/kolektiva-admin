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
  CaretUp,
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
  fetchChangeListedPropertyPhase,
  fetchChangeListedPropertyStatus,
  fetchGetAdminListedProperty,
  fetchGetAdminListedPropertyDetail,
} from "@/fetch/admin/listed-property.fetch";
import dayjs from "dayjs";
import {
  AdminListedPropertyResponse,
  ListedPropertyPhase,
} from "@/types/admin/listed-property";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import ChangePhaseConfirmModal from "../modals/ChangePhaseConfirmModal";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>["field"];
  sortOrder?: SorterResult<any>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

const ListedPropertyPage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [phaseChangeConfirmModalOpen, setPhaseChangeConfirmModalOpen] =
    useState<boolean>(false);
  const [recordId, setRecordId] = useState<string>("");
  const [newPhase, setNewPhase] = useState<string>("");

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
  const handlePhaseChange = (record: any) => {
    setRecordId(record.id);
    if (record.phase === "upcoming") {
      setNewPhase("initial-offering");
    } else if (record.phase === "initial-offering") {
      setNewPhase("settlement");
    } else if (record.phase === "settlement") {
      setNewPhase("aftermarket");
    }
    setPhaseChangeConfirmModalOpen(true);
  };
  const handleMenuClick = async (key: string, record: any) => {
    const token = await generateJWTBearerForAdmin(session?.user?.email || "");

    if (key === "view") {
      router.push(`/view/${record.id}`);
    } else if (key === "edit") {
      router.push(`/edit/${record.id}`);
      try {
        // CHange status
        // const response = await fetchChangeListedPropertyStatus(
        //   record.id,
        //   {
        //     status: "visible",
        //   },
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // );

        // edit
        // const response = await fetchUpdateListedProperty(
        //   record.id,
        //   {
        //     propertyData
        //   },
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // );

        // delete
        // const response = await fetchRemoveListedProperty(
        //   record.id,
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // );

        const response = await fetchChangeListedPropertyPhase(
          record.id,
          {
            phase: "initial-offering",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);

        if (response.status === 200 && response.data) {
          console.log("Submission successful", response);
        } else {
          console.log("Submission failed", response);
        }
      } catch (error) {
        // Handle the error if necessary
      }
    } else if (key === "changeStatus") {
      if (record.status === "visible") {
        try {
          // Change status
          const response = await fetchChangeListedPropertyStatus(
            record.id,
            {
              status: "hidden",
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log(response);

          if (response.status === 200 && response.data) {
            toast.success("Status Successfully Changed to Hidden.");
            console.log("Submission successful", response);
          } else {
            toast.error("Status Change Failed.");
            console.log("Submission failed", response);
          }
        } catch (error) {
          // Handle the error if necessary
        }
      } else if (record.status === "hidden") {
        try {
          // Change status
          const response = await fetchChangeListedPropertyStatus(
            record.id,
            {
              status: "visible",
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log(response);

          if (response.status === 200 && response.data) {
            toast.success("Status Successfully Changed to Visible.");
            console.log("Submission successful", response);
          } else {
            toast.error("Status Change Failed.");
            console.log("Submission failed", response);
          }
        } catch (error) {
          // Handle the error if necessary
        }
      } else {
        toast.error("Draft status can't be updated");
      }
    } else if (key === "phaseChange") {
      handlePhaseChange(record);
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
          <span className="flex cursor-pointer">
            {dayjs(text).format("YYYY-MM-DD HH:mm")} WIB
          </span>
        </Dropdown>
      ),
    },
    {
      title: "Visiblity",
      dataIndex: "status",
      key: "status",
      render: (text: string, record: any) => (
        <div style={{ position: "relative" }}>
          <Dropdown
            overlay={
              <Menu onClick={({ key }) => handleMenuClick(key, record)}>
                {text === "hidden" && (
                  <Menu.Item key="changeStatus">
                    <div className="flex flex-row items-center">
                      <PencilSimpleLine
                        weight="fill"
                        style={{ marginRight: "8px" }}
                      />
                      Change Status Visible
                    </div>
                  </Menu.Item>
                )}
                {text === "visible" && (
                  <Menu.Item key="changeStatus">
                    <div className="flex flex-row items-center">
                      <PencilSimpleLine
                        weight="fill"
                        style={{ marginRight: "8px" }}
                      />
                      Change Status Hidden
                    </div>
                  </Menu.Item>
                )}
              </Menu>
            }
            trigger={["click"]}
          >
            <span className="flex cursor-pointer">
              {text === "hidden" && (
                <Box
                  backgroundColor="#F4F4F5"
                  color="#3F3F46"
                  padding="2px 8px"
                  borderWidth="1px"
                  borderRadius="full"
                  borderColor="#E4E4E7"
                  fontSize="md"
                  zIndex={10}
                >
                  Hidden
                </Box>
              )}
              {text === "visible" && (
                <Box
                  backgroundColor="#CCFBF1"
                  color="#0F766E"
                  padding="2px 8px"
                  borderWidth="1px"
                  borderRadius="full"
                  borderColor="#99F6E4"
                  fontSize="md"
                  zIndex={10}
                >
                  Visible
                </Box>
              )}
              {text === "draft" && (
                <Box
                  backgroundColor="#F4F4F5"
                  opacity={0.4}
                  color="#3F3F46"
                  padding="2px 8px"
                  borderWidth="1px"
                  borderRadius="full"
                  borderColor="#E4E4E7"
                  fontSize="md"
                  zIndex={10}
                >
                  Hidden
                </Box>
              )}
            </span>
          </Dropdown>
        </div>
      ),
    },
    {
      title: "Property Title",
      dataIndex: "tokenName",
      key: "tokenName",
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
          <span className="flex cursor-pointer">{text}</span>
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
          <span className="flex cursor-pointer">{text}</span>
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
          <span className="flex cursor-pointer">{text}</span>
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
          <span className="flex cursor-pointer">{text}</span>
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
            <Menu onClick={({ key }) => handleMenuClick(key, record)}>
              {record.phase === "upcoming" && (
                <Menu.Item key="phaseChange">
                  <div className="flex flex-row items-center">
                    <PencilSimpleLine
                      weight="fill"
                      style={{ marginRight: "8px" }}
                    />
                    Change Phase to Initial Offering
                  </div>
                </Menu.Item>
              )}
              {record.phase === "initial-offering" && (
                <Menu.Item key="phaseChange">
                  <div className="flex flex-row items-center">
                    <PencilSimpleLine
                      weight="fill"
                      style={{ marginRight: "8px" }}
                    />
                    Change Phase to Settlement
                  </div>
                </Menu.Item>
              )}
              {record.phase === "settlement" && (
                <Menu.Item key="phaseChange">
                  <div className="flex flex-row items-center">
                    <PencilSimpleLine
                      weight="fill"
                      style={{ marginRight: "8px" }}
                    />
                    Change Phase to Aftermarket
                  </div>
                </Menu.Item>
              )}
            </Menu>
          }
          trigger={["click"]}
        >
          <span className="flex cursor-pointer">
            {record.phase === "draft" && (
              <Box
                backgroundColor="#F4F4F5"
                color="#3F3F46"
                padding="2px 8px"
                borderWidth="1px"
                borderRadius="full"
                borderColor="#E4E4E7"
                fontSize="md"
                zIndex={10}
              >
                Draft
              </Box>
            )}
            {record.phase === "upcoming" && (
              <Box
                backgroundColor="#FEF3C7"
                color="#B45309"
                padding="2px 8px"
                borderWidth="1px"
                borderRadius="full"
                borderColor="#FDE68A"
                fontSize="md"
                zIndex={10}
              >
                Upcoming
              </Box>
            )}
            {record.phase === "initial-offering" && (
              <Box
                backgroundColor="#ECFCCB"
                color="#4D7C0F"
                padding="2px 8px"
                borderWidth="1px"
                borderRadius="full"
                borderColor="#D9F99D"
                fontSize="md"
                zIndex={10}
              >
                Initial Offering
              </Box>
            )}
            {record.phase === "settlement" && (
              <Box
                backgroundColor="#EDE9FE"
                color="#6D28D9"
                padding="2px 8px"
                borderWidth="1px"
                borderRadius="full"
                borderColor="#DDD6FE"
                fontSize="md"
                zIndex={10}
              >
                Settlement
              </Box>
            )}

            {record.phase === "aftermarket" && (
              <Box
                backgroundColor="#CCFBF1"
                color="#0F766E"
                padding="2px 8px"
                borderWidth="1px"
                borderRadius="full"
                borderColor="#99F6E4"
                fontSize="md"
                zIndex={10}
              >
                Aftermarket
              </Box>
            )}
          </span>
        </Dropdown>
      ),
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "actions",
      render: (_: any, record: { id: string }) => (
        <div className="flex gap-2">
          <Eye
            size={24}
            className="cursor-pointer"
            onClick={() => router.push(`/view/${record.id}`)}
          />
          <PencilSimpleLine
            size={24}
            className="cursor-pointer"
            onClick={() => router.push(`/edit/${record.id}`)}
          />
        </div>
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
  const testData = [
    {
      id: "1",
      date: "2024-10-01",
      status: "visible",
      tokenName: "Luxury Apartment",
      address: "123 Main St, Springfield",
      state: "IL",
      propertyType: "Apartment",
      phase: "initial-offering",
      isUpcoming: false,
      isAftermarket: false,
    },
    {
      id: "2",
      date: "2024-09-15",
      status: "draft",
      tokenName: "Cozy Cottage",
      address: "456 Oak Ave, Riverside",
      state: "CA",
      propertyType: "Cottage",
      phase: "draft",
      isUpcoming: false,
      isAftermarket: true,
    },
    {
      id: "3",
      date: "2024-08-20",
      status: "hidden",
      tokenName: "Modern Villa",
      address: "789 Maple Rd, Greenfield",
      state: "NY",
      propertyType: "Villa",
      phase: "upcoming",
      isUpcoming: true,
      isAftermarket: false,
    },
    {
      id: "4",
      date: "2024-07-10",
      status: "visible",
      tokenName: "Urban Loft",
      address: "321 Pine St, Metropolis",
      state: "TX",
      propertyType: "Loft",
      phase: "aftermarket",
      isUpcoming: false,
      isAftermarket: true,
    },
    {
      id: "5",
      date: "2024-06-05",
      status: "draft",
      tokenName: "Beach House",
      address: "654 Sea Dr, Oceanside",
      state: "FL",
      propertyType: "House",
      phase: "draft",
      isUpcoming: false,
      isAftermarket: false,
    },
    {
      id: "6",
      date: "2024-05-12",
      status: "visible",
      tokenName: "Ranch Style Home",
      address: "987 Ranch Rd, Hilltop",
      state: "NV",
      propertyType: "House",
      phase: "settlement",
      isUpcoming: false,
      isAftermarket: true,
    },
    {
      id: "7",
      date: "2024-04-15",
      status: "hidden",
      tokenName: "Downtown Condo",
      address: "159 Central Blvd, Capital City",
      state: "WA",
      propertyType: "Condo",
      phase: "upcoming",
      isUpcoming: true,
      isAftermarket: false,
    },
    {
      id: "8",
      date: "2024-03-30",
      status: "visible",
      tokenName: "Suburban Bungalow",
      address: "753 North St, Suburbia",
      state: "OH",
      propertyType: "Bungalow",
      phase: "aftermarket",
      isUpcoming: false,
      isAftermarket: true,
    },
  ];

  if (!domLoaded || !session) return <></>;

  return (
    <div className="">
      <PanelLayout>
        <div className="w-full p-8 gap-6">
          <h2 className="text-2xl font-bold">Property List</h2>
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
            className="overflow-x-auto"
            rowKey={(record) => record.id || ""}
            dataSource={dataSource}
            columns={columns}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
          />
        </div>
        <ChangePhaseConfirmModal
          recordId={recordId}
          newPhase={newPhase}
          isOpen={phaseChangeConfirmModalOpen}
          onClose={() => setPhaseChangeConfirmModalOpen(false)}
        />
      </PanelLayout>
    </div>
  );
};

export default ListedPropertyPage;
