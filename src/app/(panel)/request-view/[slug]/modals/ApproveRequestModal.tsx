import React, { useState } from "react";

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
import { Check } from "@phosphor-icons/react/dist/ssr";

interface ApproveRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApproveRequestModal: React.FC<ApproveRequestModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="rgba(4, 47, 46, 0.5)" />
      <ModalContent
        bg="white"
        boxShadow="0px 1px 2px rgba(16, 24, 40, 0.06), 0px 1px 3px rgba(16, 24, 40, 0.1)"
        borderRadius="10px"
        position="absolute"
        padding="16px"
        gap={5}
      >
        <Flex direction="row" justify="flex-end">
          <CloseButton onClick={onClose} size="md" color="#71717A" />
        </Flex>

        <div className="flex items-center justify-center">
          {/* Ellipse 7 Outer */}
          <div className="flex items-center justify-center w-[156px] h-[156px] bg-teal-50 rounded-full">
            {/* Ellipse 7 Inner */}
            <div className="flex items-center justify-center w-[94px] h-[94px] bg-teal-100 rounded-full">
              <Check size={36} />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-2 ">
          <p className="font-bold text-2xl leading-[28px] text-center text-zinc-700">
            Ready to Approve?
          </p>
          <p className="font-normal text-sm leading-[18px] text-center text-zinc-700 w-[302px]">
            Once approved, the listing will appear in the property list. Ensure
            all required fields (e.g., photos) are complete before proceeding.
          </p>
        </div>

        <Flex direction="column" gap="6px">
          <Flex direction="column" gap="4px" width="100%"></Flex>
        </Flex>

        <ModalFooter padding="0px" mt="20px">
          <Flex justify="center" width="100%" gap="10px">
            <Button
              bg="white"
              boxShadow="0px 1px 2px rgba(16, 24, 40, 0.06), 0px 1px 3px rgba(16, 24, 40, 0.1)"
              borderRadius="100px"
              color="#0D9488"
              padding="12px 16px"
              fontSize="14px"
              fontWeight="500"
              width="140px"
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
              width="140px"
              _focus={{ bg: "teal.700" }}
              _hover={{ bg: "teal.700" }}
            >
              Apporve
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ApproveRequestModal;
