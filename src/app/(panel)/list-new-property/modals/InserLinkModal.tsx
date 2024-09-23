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

interface InserLinkModalProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  isOpen: boolean;
  onClose: () => void;
}

const InserLinkModal: React.FC<InserLinkModalProps> = ({
  isOpen,
  onClose,
  formData,
  setFormData,
}) => {
  const [linkValue, setLinkValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const isValidUrl = (url: string): boolean => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*" +
        "(\\?[;&a-zA-Z\\d%_.~+=-]*)?" +
        "(\\#[-a-zA-Z\\d_]*)?$",
      "i"
    );
    return !!urlPattern.test(url);
  };

  const handleSave = () => {
    if (!linkValue.trim()) {
      setErrorMessage("Please enter a URL.");
      return;
    }

    if (!isValidUrl(linkValue)) {
      setErrorMessage("Invalid URL. Please enter a valid link.");
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      documents_documents: [...prevFormData.documents_documents, linkValue],
    }));
    setLinkValue("");
    setErrorMessage("");
    onClose();
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
          <p className="font-medium text-zinc-500">Insert Link</p>
          <CloseButton onClick={onClose} size="md" color="#71717A" />
        </Flex>

        <Box width="100%" height="1px" bg="#E4E4E7" my="20px" />

        <Flex direction="column" gap="6px">
          <Flex direction="column" gap="4px" width="100%">
            <Input
              placeholder="https://"
              bg="#F4F4F5"
              borderRadius="100px"
              padding="10px 12px"
              width="100%"
              fontSize="14px"
              color="#71717A"
              value={linkValue}
              onChange={(e) => setLinkValue(e.target.value)}
            />
            {errorMessage && (
              <Text color="red.500" fontSize="12px">
                {errorMessage}
              </Text>
            )}
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
              onClick={handleSave}
              _focus={{ bg: "teal.700" }}
              _hover={{ bg: "teal.700" }}
            >
              Save
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InserLinkModal;
