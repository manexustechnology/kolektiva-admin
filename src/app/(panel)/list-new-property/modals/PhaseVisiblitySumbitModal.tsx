import React, { useState } from "react";
import { FormData } from "@/types/formData";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Flex,
  CloseButton,
  Box,
  Input,
  Text,
} from "@chakra-ui/react";

interface PhaseVisiblitySumbitModalProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: () => void;
}

const PhaseVisiblitySumbitModal: React.FC<PhaseVisiblitySumbitModalProps> = ({
  isOpen,
  onClose,
  handleSubmit,
  formData,
  setFormData,
}) => {
  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "chain_selector") {
      // Split value into chainName and chainId
      const [chainName, chainId] = value.split("|");
      setFormData({
        ...formData,
        chain_chainName: chainName,
        chain_chainId: Number(chainId),
      });
    } else {
      // Handle other dropdowns
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="rgba(4, 47, 46, 0.5)" />
      <ModalContent
        bg="white"
        boxShadow="0px 1px 2px rgba(16, 24, 40, 0.06), 0px 1px 3px rgba(16, 24, 40, 0.1)"
        borderRadius="10px"
        position="absolute"
        padding="16px"
      >
        <Flex direction="row" justify="space-between" align="start">
          <p className="font-medium text-zinc-500">
            Choose phase and visibility
          </p>
          <CloseButton onClick={onClose} size="md" color="#71717A" />
        </Flex>

        <Box width="100%" height="1px" bg="#E4E4E7" my="20px" />

        <Flex direction="column" gap="6px">
          <Flex direction="column" gap="4px" width="100%">
            {/* Phase/Status */}
            <div className="flex flex-col md:flex-col items-start p-0 gap-1.5 w-full">
              {/* Phase */}
              <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-full">
                <div className="flex flex-row items-center p-0 gap-0.75">
                  <p className="text-sm font-normal text-zinc-700">
                    Phase <span className="text-zinc-400">*</span>
                  </p>
                  {formData.errmsg &&
                    formData.propertyDetails_propertyStatus_phase === "" && (
                      <span className="text-red-500 text-xs">
                        Select an option
                      </span>
                    )}
                </div>
                <div className="flex flex-col items-start p-0 gap-1 w-full">
                  <div className="relative w-full">
                    <select
                      name="propertyDetails_propertyStatus_phase"
                      value={formData.propertyDetails_propertyStatus_phase}
                      onChange={handleDropdownChange}
                      className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full pl-4 pr-4"
                    >
                      <option value="" disabled>
                        Select Property Phase
                      </option>
                      <option value="upcoming">Upcoming</option>
                      <option value="initial-offering">Initial Offering</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="flex flex-col items-start p-0 gap-1.5 w-full md:full">
                <div className="flex flex-row items-center p-0 gap-0.75">
                  <p className="text-sm font-normal text-zinc-700">
                    Status
                    <span className="text-zinc-400">*</span>
                  </p>
                  {formData.errmsg &&
                    formData.propertyDetails_propertyStatus_status === "" && (
                      <span className="text-red-500 text-xs">
                        Select an option
                      </span>
                    )}
                </div>
                <div className="flex flex-col items-start p-0 gap-1 w-full">
                  <div className="relative w-full">
                    <select
                      name="propertyDetails_propertyStatus_status"
                      value={formData.propertyDetails_propertyStatus_status}
                      onChange={handleDropdownChange}
                      className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full pl-4 pr-4"
                    >
                      <option value="" disabled>
                        Select Property Status
                      </option>
                      <option value="hidden">Hidden</option>
                      <option value="visible">Visible</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </Flex>
        </Flex>

        <ModalFooter padding="0px" mt="20px">
          <Flex justify="flex-end" width="100%" gap="10px">
            <Button
              bg="white"
              boxShadow="0px 1px 2px rgba(16, 24, 40, 0.06), 0px 1px 3px rgba(16, 24, 40, 0.1)"
              borderRadius="100px"
              color="#0D9488"
              padding="12px 16px"
              fontSize="14px"
              fontWeight="500"
              onClick={onClose}
              _focus={{ bg: "teal.100" }}
              _hover={{ bg: "teal.100" }}
            >
              Cancel
            </Button>
            <Button
              bg="teal.600"
              borderRadius="100px"
              color="white"
              padding="12px 16px"
              fontSize="14px"
              fontWeight="500"
              onClick={handleSubmit}
              _focus={{ bg: "teal.700" }}
              _hover={{ bg: "teal.700" }}
            >
              Submit
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PhaseVisiblitySumbitModal;
