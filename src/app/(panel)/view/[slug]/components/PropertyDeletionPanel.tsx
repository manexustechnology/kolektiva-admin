"use client";

import React, { useState } from "react";

import { FormData } from "@/types/formData";
import { Button } from "@chakra-ui/react";
import PropertyDeleteModal from "./PropertyDeleteModal";
import { Trash } from "@phosphor-icons/react/dist/ssr";

interface PropertyDeletionPanelProps {
  formData: FormData;
}

const PropertyDeletionPanel: React.FC<PropertyDeletionPanelProps> = ({
  formData,
}) => {
  const isLoading = false;
  const [PropertyDeleteModalOpen, setPropertyDeleteModalOpen] =
    useState<boolean>(false);

  return (
    <div className="flex flex-col gap-6">
      {" "}
      {/* Makets */}
      <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg">
        {/* Title */}
        <p className="text-lg font-medium text-zinc-500">Markets</p>
        {/* Divider */}
        <div className="w-full h-px bg-zinc-200"></div>
        <p className="font-normal text-sm text-zinc-500">
          In most cases, deleting a listed property is a rare occurrence. To
          avoid losing important data, it is recommended to make the listed
          property status hidden instead of deleting it.
        </p>
        <Button
          leftIcon={<Trash color="red.600" />}
          width="140px"
          height="40px"
          padding="12px 16px"
          bg="white"
          boxShadow="lg"
          borderRadius="full"
          color="red.600"
          fontSize="14px"
          fontWeight="500"
          _focus={{ bg: "red.100" }}
          _hover={{ bg: "red.100" }}
          onClick={() => setPropertyDeleteModalOpen(true)}
        >
          Delete Property
        </Button>
        <PropertyDeleteModal
          isOpen={PropertyDeleteModalOpen}
          onClose={() => {
            setPropertyDeleteModalOpen(false);
          }}
        />
      </div>
    </div>
  );
};

export default PropertyDeletionPanel;
