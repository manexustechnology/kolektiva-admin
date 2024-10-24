"use client";

import React, { useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { FormData } from "@/types/formData";
import { Button } from "@chakra-ui/react";
import PropertyDeleteModal from "./PropertyDeleteModal";
import { Trash } from "@phosphor-icons/react/dist/ssr";
import { fetchRemoveListedProperty } from "@/fetch/admin/listed-property.fetch";
import { generateJWTBearerForAdmin } from "@/utils/jwt";
import { useParams } from "next/navigation";

interface PropertyDeletionPanelProps {
  formData: FormData;
}

const PropertyDeletionPanel: React.FC<PropertyDeletionPanelProps> = ({
  formData,
}) => {
  const { data: session } = useSession();
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [PropertyDeleteModalOpen, setPropertyDeleteModalOpen] =
    useState<boolean>(false);

  const handleDeleteProperty = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = await generateJWTBearerForAdmin(session?.user?.email || "");
      const response = await fetchRemoveListedProperty(slug as string, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log("Property deleted successfully");
        // Optionally, trigger a refresh or update of the property list here
      } else {
        console.error("Failed to delete property");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
    } finally {
      setIsLoading(false);
      setPropertyDeleteModalOpen(false);
    }
  }, [slug, session?.user?.email]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg">
        <p className="text-lg font-medium text-zinc-500">Property Deletion</p>
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
          isLoading={isLoading}
          onClick={() => setPropertyDeleteModalOpen(true)}
        >
          Delete Property
        </Button>
        <PropertyDeleteModal
          isOpen={PropertyDeleteModalOpen}
          onClose={() => setPropertyDeleteModalOpen(false)}
          onConfirm={handleDeleteProperty}
        />
      </div>
    </div>
  );
};

export default PropertyDeletionPanel;
