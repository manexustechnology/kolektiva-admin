import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Image,
} from "@chakra-ui/react";

interface MediaShowModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: File | null;
}

const MediaShowModal: React.FC<MediaShowModalProps> = ({
  isOpen,
  onClose,
  image,
}: MediaShowModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent
        bg="rgba(0,0,0,0.8)"
        color="white"
        p={0}
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
      >
        <ModalCloseButton
          color="white"
          _hover={{ color: "whiteAlpha.700" }}
          _focus={{ outline: "none" }}
        />
        <ModalBody
          p={0}
          alignItems="center"
          justifyItems="center"
          display="flex"
        >
          {image && (
            <Image
              src={URL.createObjectURL(image)}
              alt="Maximized Image"
              objectFit="contain"
              maxHeight="80vh"
              maxWidth="80vw"
              mx="auto"
              my={8}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MediaShowModal;
