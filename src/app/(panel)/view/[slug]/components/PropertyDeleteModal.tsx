import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

import { useRouter } from "next/navigation";
import { Trash } from "@phosphor-icons/react/dist/ssr";

interface PropertyDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

const PropertyDeleteModal: React.FC<PropertyDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}: PropertyDeleteModalProps) => {
  const router = useRouter();

  const handleConfirm = async () => {
    await onConfirm();
    router.push("/");
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="sm">
      <ModalOverlay />
      <ModalContent className="flex flex-col items-start p relative  bg-white border border-neutral-300 rounded-lg">
        <div>
          <ModalHeader className="flex flex-col gap-2">
            <p className="text-md font-semibold">Delete Property</p>
            <p className="text-sm font-medium">This Action is irreversibile</p>
          </ModalHeader>
          <ModalCloseButton />
        </div>
        <ModalBody className="flex flex-col gap-4">
          <div className="flex flex-row items-start space-x-4">
            <Button
              size="sm"
              width={200}
              variant="outline"
              fontSize="medium"
              border="1px"
              borderRadius="full"
              flex="1"
              onClick={handleConfirm}
              colorScheme="red"
            >
              <Trash size={20} className="mr-2" />
              Delete
            </Button>

            <Button
              size="sm"
              color="white"
              bgColor="black"
              variant="outline"
              fontSize="medium"
              border="1px"
              borderRadius="full"
              flex="1"
              onClick={() => onClose()}
            >
              Cancel
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PropertyDeleteModal;
