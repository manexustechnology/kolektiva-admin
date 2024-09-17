"use client";

import { useState } from "react";
import {
  CaretDown,
  Funnel,
  MagnifyingGlass,
  Plus,
  SortDescending,
} from "@phosphor-icons/react/dist/ssr";
import { Box, Button, Flex, Input, Select } from "@chakra-ui/react";
import { IMarketFilter } from "@/types/filter";

interface FilterBarProps {
  locations: string[];
  propertyTypes: string[];
  sortOptions: string[];
  onFilterApply: (newFilters: any) => void;
  onFilterReset: () => void;
  filters: IMarketFilter;
  // initialSliderValue1?: number;
  // initialSliderValue2?: number;
}

const FilterBar: React.FC<FilterBarProps> = ({
  locations,
  propertyTypes,
  sortOptions,
  onFilterApply,
  onFilterReset,
  filters,
  // initialSliderValue1 = 50,
  // initialSliderValue2 = 50,
}) => {
  const handleFilterChange = (key: string, value: any) => {
    const updatedFilters = { ...filters, [key]: value };
    onFilterApply(updatedFilters);
  };

  return (
    <div className="flex flex-col md:flex-row pt-4 pb-4 relative bg-white rounded-md mb-[40px]">
      {/* Search Bar */}
      <div className="items-center justify-center">
        <Flex
          marginTop={1}
          marginBottom={1}
          direction="row"
          alignItems="center"
          justifyContent="center"
          p="12px 16px"
          gap="6px"
          w="100%"
          h="40px"
          bg="#F4F4F5"
          borderRadius="full"
          _hover={{
            backgroundColor: "#CCFBF1",
          }}
          _focus={{
            backgroundColor: "#CCFBF1",
          }}
        >
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
        </Flex>
      </div>
      <div>
        <Flex marginTop={1} marginBottom={1} direction="row" className=" gap-4">
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
        </Flex>
      </div>
      <div>
        <Flex
          marginTop={1}
          marginBottom={1}
          direction="row"
          className="md:absolute md:right-0 gap-4"
        >
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
          >
            <Plus size={16} color="#FFFFFF" />
            List Property
          </Button>
        </Flex>
      </div>
    </div>
  );
};

export default FilterBar;
