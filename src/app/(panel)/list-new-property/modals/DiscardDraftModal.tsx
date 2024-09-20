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

interface DiscardDraftModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DiscardDraftModal: React.FC<DiscardDraftModalProps> = ({
  isOpen,
  onClose,
}: DiscardDraftModalProps) => {
  const router = useRouter();

  const onDiscard = () => {
    router.push("/");
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="sm">
      <ModalOverlay />
      <ModalContent className="flex flex-col items-start p relative  bg-white border border-neutral-300 rounded-lg">
        <div>
          <ModalHeader className="flex flex-col gap-2">
            <p className="text-md font-semibold">Discard Draft</p>
            <p className="text-sm font-medium">
              All the details will not be saved
            </p>
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
              onClick={() => onDiscard()}
              colorScheme="red"
            >
              <Trash size={20} className="mr-2" />
              Discard
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

export default DiscardDraftModal;
