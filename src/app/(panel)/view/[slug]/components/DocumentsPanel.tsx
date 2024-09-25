"use client";

import React, { useState } from "react";

import { FormData } from "@/types/formData";

import "react-phone-input-2/lib/style.css";

import "react-quill/dist/quill.snow.css";
import {
  ArrowSquareOut,
  CheckCircle,
  FilePdf,
  LinkSimple,
  Trash,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "@chakra-ui/react";

interface DocumentsPanelProps {
  formData: FormData;
}

const DocumentsPanel: React.FC<DocumentsPanelProps> = ({ formData }) => {
  const isLoading = false;
  const [showModal, setShowModal] = useState(false);

  const handleView = (doc: File | string) => {
    if (typeof doc === "string") {
      window.open(doc, "_blank");
    } else if (doc instanceof File) {
      const fileURL = URL.createObjectURL(doc);
      window.open(fileURL, "_blank");
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    const start = text.slice(0, 6);
    const end = text.slice(-6);
    return `${start}...${end}`;
  };

  return (
    <div className="flex flex-col gap-6">
      {" "}
      {/* Documents Section */}
      <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg">
        <p className="text-lg font-medium text-zinc-500">Documents</p>
        <div className="w-full h-px bg-zinc-200"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {formData.documents_documents.map((doc, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center md:justify-between p-4 gap-3 bg-white shadow-md rounded-md"
            >
              <div className="flex items-center gap-3">
                {typeof doc === "string" ? (
                  <LinkSimple weight="bold" size={40} />
                ) : (
                  <FilePdf weight="fill" size={40} />
                )}
                <span className="text-sm font-medium text-[#3F3F46]">
                  {typeof doc === "string"
                    ? truncateText(doc, 24)
                    : truncateText(doc.name, 24)}
                </span>
                <CheckCircle weight="fill" color="#0D9488" />
              </div>

              <div className="md:ml-auto flex md:items-end gap-1 flex-col md:flex-row">
                <Button
                  height="40px"
                  padding="12px 16px"
                  bg="#F4F4F5"
                  color="#3F3F46"
                  fontSize="14px"
                  fontWeight="500"
                  _focus={{ bg: "teal.200" }}
                  _hover={{ bg: "teal.200" }}
                  onClick={() => handleView(doc)}
                >
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentsPanel;
