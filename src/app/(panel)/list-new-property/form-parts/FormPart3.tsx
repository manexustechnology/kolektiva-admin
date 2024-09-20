"use client";

import React, { useState } from "react";
import { FormData } from "@/types/formData";
import Image from "next/image";
import {
  CheckCircle,
  FilePdf,
  Link,
  LinkSimple,
  Trash,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "@chakra-ui/react";
import InserLinkModal from "../modals/InserLinkModal";

interface FormPart3Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const FormPart3: React.FC<FormPart3Props> = ({ formData, setFormData }) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const [showModal, setShowModal] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const pdfFiles = files.filter((file) => file.type === "application/pdf");
    if (pdfFiles.length > 0) {
      setFormData((prev) => ({
        ...prev,
        documents_documents: [...prev.documents_documents, ...pdfFiles],
      }));
    }
  };

  const handleView = (doc: File | string) => {
    if (typeof doc === "string") {
      window.open(doc, "_blank");
    } else if (doc instanceof File) {
      const fileURL = URL.createObjectURL(doc);
      window.open(fileURL, "_blank");
    }
  };

  const removeDocument = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      documents_documents: prev.documents_documents.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    const start = text.slice(0, 12);
    const end = text.slice(-12);
    return `${start}...${end}`;
  };

  return (
    <>
      {/* ProgressBar */}
      <div className="flex flex-row items-start p-4 gap-2.5 w-full bg-white shadow-md rounded-lg">
        {/* Progress Steps */}
        <div className="flex flex-col items-start p-0 gap-2.5 w-1/4 flex-grow">
          <div className="w-full h-[6px] bg-teal-600 rounded-full" />
          <div className="text-sm md:text-base  font-medium text-zinc-700">
            1. Property Details
          </div>
        </div>
        <div className="flex flex-col items-start p-0 gap-2.5 w-1/4 flex-grow">
          <div className="w-full h-[6px] bg-teal-600 rounded-full" />
          <div className="text-sm md:text-base  font-medium text-zinc-700">
            2. Financials
          </div>
        </div>
        <div className="flex flex-col items-start p-0 gap-2.5 w-1/4 flex-grow">
          <div className="w-full h-[6px] bg-teal-600 rounded-full" />
          <div className="text-sm md:text-base  font-medium text-zinc-700">
            3. Documents
          </div>
        </div>
        <div className="flex flex-col items-start p-0 gap-2.5 w-1/4 flex-grow">
          <div className="w-full h-[6px] bg-zinc-200 rounded-full" />
          <div className="text-sm md:text-base  font-normal text-zinc-400">
            4. Markets
          </div>
        </div>
      </div>

      {/* Documents Section */}
      <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg">
        <p className="text-lg font-medium text-zinc-500">Documents</p>
        <div className="w-full h-px bg-zinc-200"></div>

        {/* Uploader */}
        <div
          className="flex flex-col justify-center items-center p-8 gap-4 w-full md:h-[164px] border border-dashed border-zinc-300 rounded-lg"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="flex flex-col items-center p-0 gap-2 h-[44px]">
            <div className="h-[18px] text-base font-medium text-zinc-700">
              Choose a PDF file or drag & drop it here
            </div>
            <div className="hidden md:block h-[18px] text-base font-regular text-zinc-500">
              pdf format up to 50MB
            </div>
          </div>
          <div className="flex gap-1 flex-col md:flex-row">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
              id="file-input"
            />
            <label
              htmlFor="file-input"
              className="flex flex-row justify-center items-center p-3 gap-2 w-[101px] h-[40px] bg-teal-600 text-white font-medium rounded-full cursor-pointer"
            >
              Upload
            </label>
            <Button
              leftIcon={<Link></Link>}
              width="140px"
              height="40px"
              padding="12px 16px"
              bg="white"
              boxShadow="lg"
              borderRadius="full"
              color="teal.600"
              fontSize="14px"
              fontWeight="500"
              _focus={{ bg: "teal.100" }}
              _hover={{ bg: "teal.100" }}
              onClick={() => {
                setShowModal(true);
              }}
            >
              Insert Link
            </Button>
            <InserLinkModal
              formData={formData}
              setFormData={setFormData}
              isOpen={showModal}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>

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

                <Button
                  height="40px"
                  padding="12px 16px"
                  bg="#F4F4F5"
                  color="#3F3F46"
                  fontSize="14px"
                  fontWeight="500"
                  _focus={{ bg: "teal.200" }}
                  _hover={{ bg: "teal.200" }}
                  onClick={() => removeDocument(index)}
                >
                  <Trash weight="fill" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FormPart3;
