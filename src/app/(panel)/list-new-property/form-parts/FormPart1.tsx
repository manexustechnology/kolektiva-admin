"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FormData } from "@/types/formData";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { CheckCircle, Trash } from "@phosphor-icons/react/dist/ssr";
import { Box, Button, Toast } from "@chakra-ui/react";
import { Eye } from "@phosphor-icons/react";
import MediaShowModal from "../modals/MediaShowModal";
import toast from "react-hot-toast";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface FormPart1Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const FormPart1: React.FC<FormPart1Props> = ({ formData, setFormData }) => {
  const isLoading = false;
  const [showModal, setShowModal] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value === "" ? 0 : Number(value);

    setFormData((prevData) => ({
      ...prevData,
      [name]: numericValue,
    }));
  };

  const [errorEmail, setErrorEmail] = useState("");
  const [errorMap, setErrorMap] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormData((prevData) => ({
        ...prevData,
        validEmail: false,
      }));
      setErrorEmail("Please enter a valid email address.");
    } else {
      setFormData((prevData) => ({
        ...prevData,
        validEmail: true,
      }));
      setErrorEmail("");
    }
  };

  const validateMapLink = (link: string) => {
    const urlRegex =
      /^(https?:\/\/)?(www\.)?(google\.com\/maps\/|maps\.app\.goo\.gl\/).+/;
    if (!urlRegex.test(link)) {
      setFormData((prevData) => ({
        ...prevData,
        validMap: false,
      }));
      setErrorMap("Please paste a valid Google Maps URL.");
    } else {
      setFormData((prevData) => ({
        ...prevData,
        validMap: true,
      }));
      setErrorMap("");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      propertyDetails_issuerDetails_email: value,
    }));
    validateEmail(value);
  };

  const handleMapLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      propertyDetails_propertySummary_googleMapUrl: value,
    }));
    validateMapLink(value);
  };
  const handlePhoneChange = (phone: string) => {
    setFormData((prevData) => ({
      ...prevData,
      propertyDetails_issuerDetails_phoneNum: phone,
    }));
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      updateFormData(image);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const image = e.dataTransfer.files[0];
      updateFormData(image);
    }
  };

  const updateFormData = (image: File) => {
    setFormData((prevState) => {
      if (prevState.propertyDetails_propertyImages_primary === null) {
        return {
          ...prevState,
          propertyDetails_propertyImages_primary: image,
        };
      } else {
        return {
          ...prevState,
          propertyDetails_propertyImages_others: [
            ...prevState.propertyDetails_propertyImages_others,
            image,
          ],
        };
      }
    });
    toast.success("Image Uploaded Successfully");
  };

  const swapImage = (index: number) => {
    const selectedImage = formData.propertyDetails_propertyImages_others[index];
    const primaryImage = formData.propertyDetails_propertyImages_primary;

    setFormData((prevData) => {
      const newOthers: File[] =
        prevData.propertyDetails_propertyImages_others.filter(
          (_, i) => i !== index
        );

      if (primaryImage) {
        newOthers.push(primaryImage);
      }

      return {
        ...prevData,
        propertyDetails_propertyImages_primary: selectedImage,
        propertyDetails_propertyImages_others: newOthers,
      };
    });
    toast.success("New Primary Image Set");
  };

  const removeImage = (index: number) => {
    setFormData((prevData) => {
      const newOthers = prevData.propertyDetails_propertyImages_others.filter(
        (_, i) => i !== index
      );

      return {
        ...prevData,
        propertyDetails_propertyImages_others: newOthers,
      };
    });
    toast.success("Image Removed Successfully");
  };

  const removePrimaryImage = () => {
    setFormData((prevData) => ({
      ...prevData,
      propertyDetails_propertyImages_primary: null,
    }));
    toast.success("Image Removed Successfully");
  };

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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevData) => {
      const updatedIssues = checked
        ? [...prevData.propertyDetails_propertyDetails_propertyIssues, name]
        : prevData.propertyDetails_propertyDetails_propertyIssues.filter(
            (issue) => issue !== name
          );
      return {
        ...prevData,
        propertyDetails_propertyDetails_propertyIssues: updatedIssues,
      };
    });
  };

  const handleDescriptionChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      propertyDetails_description: value,
    }));
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    const start = text.slice(0, 6);
    const end = text.slice(-6);
    return `${start}...${end}`;
  };

  const [inputValue, setInputValue] = useState("");

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    // Check if the user presses space or comma to add the input as a tag
    // if (value.endsWith(" ") || value.endsWith(",")) {
    if (value.endsWith(",")) {
      const newTag = value.trim().replace(",", "");
      if (
        newTag &&
        !formData.propertyDetails_propertyDetails_furniture.includes(newTag)
      ) {
        setFormData((prev) => ({
          ...prev,
          propertyDetails_propertyDetails_furniture: [
            ...prev.propertyDetails_propertyDetails_furniture,
            newTag,
          ],
        }));
      }
      setInputValue("");
    } else {
      setInputValue(value);
    }
  };

  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      propertyDetails_propertyDetails_furniture:
        prev.propertyDetails_propertyDetails_furniture.filter((t) => t !== tag),
    }));
  };
  return (
    <>
      {/* ProgressBar */}
      <div className="flex flex-row items-start p-4 gap-2.5 w-full bg-white shadow-md rounded-lg">
        {/* 1 */}
        <div className="flex flex-col items-start p-0 gap-2.5 w-1/4 flex-grow">
          <div className="w-full h-[6px] bg-teal-600 rounded-full" />
          <div className="text-sm md:text-base font-medium text-zinc-700">
            1. Property Details
          </div>
        </div>

        {/* 2 */}
        <div className="flex flex-col items-start p-0 gap-2.5 w-1/4 flex-grow">
          <div className="w-full h-[6px] bg-zinc-200 rounded-full" />
          <div className="text-sm md:text-base  font-normal text-zinc-400">
            2. Financials
          </div>
        </div>

        {/* 3 */}
        <div className="flex flex-col items-start p-0 gap-2.5 w-1/4 flex-grow">
          <div className="w-full h-[6px] bg-zinc-200 rounded-full" />
          <div className="text-sm md:text-base  font-normal text-zinc-400">
            3. Documents
          </div>
        </div>

        {/* 4 */}
        <div className="flex flex-col items-start p-0 gap-2.5 w-1/4 flex-grow">
          <div className="w-full h-[6px] bg-zinc-200 rounded-full" />
          <div className="text-sm md:text-base  font-normal text-zinc-400">
            4. Markets
          </div>
        </div>
      </div>

      {/* Property Status */}
      <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg">
        {/* Title */}
        <p className="text-lg font-medium text-zinc-500">Property Status</p>
        {/* Divider */}
        <div className="w-full h-px bg-zinc-200"></div>

        {/* Phase/Status */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5 w-full">
          {/* Phase */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Phase <span className="text-zinc-400">*</span>
              </p>
              {formData.errmsg &&
                formData.propertyDetails_propertyStatus_phase === "" && (
                  <span className="text-red-500 text-xs">Select an option</span>
                )}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <div className="relative w-full">
                <select
                  name="propertyDetails_propertyStatus_phase"
                  value={formData.propertyDetails_propertyStatus_phase}
                  onChange={handleDropdownChange}
                  className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full pl-4 pr-4"
                  disabled={isLoading}
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
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Status
                <span className="text-zinc-400">*</span>
              </p>
              {formData.errmsg &&
                formData.propertyDetails_propertyStatus_status === "" && (
                  <span className="text-red-500 text-xs">Select an option</span>
                )}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <div className="relative w-full">
                <select
                  name="propertyDetails_propertyStatus_status"
                  value={formData.propertyDetails_propertyStatus_status}
                  onChange={handleDropdownChange}
                  className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full pl-4 pr-4"
                  disabled={isLoading}
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

        {/* Rental Status */}
        {/* <div className="flex flex-col md:flex-row items-start p-0 gap-1.5 w-full">
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Rental Status <span className="text-zinc-400">*</span>
              </p>
              {formData.errmsg &&
                formData.propertyDetails_propertyStatus_rentalStatus === "" && (
                  <span className="text-red-500 text-xs">Select an option</span>
                )}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <div className="relative w-full">
                <select
                  name="propertyDetails_propertyStatus_rentalStatus"
                  value={formData.propertyDetails_propertyStatus_rentalStatus}
                  onChange={handleDropdownChange}
                  className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full pl-4 pr-4"
                  disabled={isLoading}
                >
                  <option value="" disabled>
                    Select Property Status
                  </option>
                  <option value="idle">idle</option>
                  <option value="rented">rented</option>
                </select>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      {/* Network Selector */}
      <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg">
        {/* Title */}
        <p className="text-lg font-medium text-zinc-500">Network</p>
        {/* Divider */}
        <div className="w-full h-px bg-zinc-200"></div>

        {/* Network Selector */}
        <div className="flex flex-col items-start p-0 gap-1.5 w-full">
          <div className="flex flex-row items-center p-0 gap-0.75">
            <p className="text-sm font-normal text-zinc-700">
              Network <span className="text-zinc-400">*</span>
            </p>
            {formData.errmsg && formData.chain_chainName === "" && (
              <span className="text-red-500 text-xs">Select a network</span>
            )}
          </div>
          <div className="flex flex-col items-start p-0 gap-1 w-full">
            <div className="relative w-full">
              <select
                name="chain_selector"
                value={`${formData.chain_chainName}|${formData.chain_chainId}`}
                onChange={handleDropdownChange}
                className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full pl-4 pr-10 appearance-none"
                disabled={isLoading}
                style={{
                  backgroundImage: `url(${
                    formData.chain_chainName === "Lisk Sepolia"
                      ? "/chain-logo/lisk-logo.svg"
                      : formData.chain_chainName === "Base Sepolia"
                      ? "/chain-logo/base-logo-in-blue.svg"
                      : "none"
                  })`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.5rem center",
                  backgroundSize: "20px 20px",
                }}
              >
                <option value="" disabled>
                  Select Network
                </option>
                <option value="Lisk Sepolia|4202">Lisk Sepolia</option>
                <option value="Base Sepolia|84532">Base Sepolia</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Issuer Details */}
      <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg">
        {/* Title */}
        <p className="text-lg font-medium text-zinc-500">Issuer Details</p>
        {/* Divider */}
        <div className="w-full h-px bg-zinc-200"></div>

        {/* Issued By/Name */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5 w-full">
          {/* Issued By */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Issued By <span className="text-zinc-400">*</span>
              </p>
              {formData.errmsg &&
                formData.propertyDetails_issuerDetails_issuedBy === "" && (
                  <span className="text-red-500 text-xs">Select an option</span>
                )}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <div className="relative w-full">
                <select
                  name="propertyDetails_issuerDetails_issuedBy"
                  value={formData.propertyDetails_issuerDetails_issuedBy}
                  onChange={handleDropdownChange}
                  className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full pl-4 pr-4"
                  disabled={isLoading}
                >
                  <option value="" disabled>
                    Select Property Owner
                  </option>
                  <option value="Owner">Owner</option>
                  <option value="NotOwner">Not The Owner</option>
                </select>
              </div>
            </div>
          </div>

          {/* Name */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Name <span className="text-zinc-400">*</span>
              </p>
              {formData.errmsg &&
                formData.propertyDetails_issuerDetails_name === "" && (
                  <span className="text-red-500 text-xs">Required Field</span>
                )}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <input
                type="text"
                name="propertyDetails_issuerDetails_name"
                value={formData.propertyDetails_issuerDetails_name}
                onChange={handleChange}
                className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full p-2"
                placeholder="Enter your Name"
              />
            </div>
          </div>
        </div>

        {/* Phone/ E-Mail */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5  w-full">
          {/* Phone */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Phone <span className="text-zinc-400">*</span>
              </p>
              {formData.errmsg &&
                formData.propertyDetails_issuerDetails_phoneNum === "" && (
                  <span className="text-red-500 text-xs">Required Field</span>
                )}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full h-64px">
              <PhoneInput
                country={"us"}
                value={formData.propertyDetails_issuerDetails_phoneNum}
                onChange={handlePhoneChange}
                containerStyle={{
                  backgroundColor: "#F4F4F5",
                  borderRadius: "9999px",
                }}
                inputStyle={{
                  width: "100%",
                  backgroundColor: "transparent",
                  border: "none",
                  borderRadius: "9999px",
                }}
                buttonStyle={{
                  border: "none",
                }}
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Email <span className="text-zinc-400">*</span>
              </p>
              {formData.errmsg &&
                formData.propertyDetails_issuerDetails_email === "" && (
                  <span className="text-red-500 text-xs">Required Field</span>
                )}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <input
                type="text"
                name="propertyDetails_issuerDetails_email"
                value={formData.propertyDetails_issuerDetails_email}
                onChange={handleEmailChange}
                className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full p-2"
                placeholder="Enter your Email"
              />
              {errorEmail && (
                <p className="text-red-500 text-xs">{errorEmail}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Property Summary */}
      <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg">
        {/* Title */}
        <p className="text-lg font-medium text-zinc-500">Property Summary</p>
        {/* Divider */}
        <div className="w-full h-px bg-zinc-200"></div>

        {/* Title/Gmap */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5  w-full">
          {/* Title */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Title <span className="text-zinc-400">*</span>
              </p>
              {formData.errmsg &&
                formData.propertyDetails_propertySummary_title === "" && (
                  <span className="text-red-500 text-xs">Required Field</span>
                )}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <input
                type="text"
                name="propertyDetails_propertySummary_title"
                value={formData.propertyDetails_propertySummary_title}
                onChange={handleChange}
                className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full p-2"
                placeholder="Enter Title"
              />
            </div>
          </div>

          {/* G Map */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Google Map Url <span className="text-zinc-400">*</span>
              </p>
              {formData.errmsg &&
                formData.propertyDetails_propertySummary_googleMapUrl ===
                  "" && (
                  <span className="text-red-500 text-xs">Required Field</span>
                )}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <input
                type="text"
                name="propertyDetails_propertySummary_googleMapUrl"
                value={formData.propertyDetails_propertySummary_googleMapUrl}
                onChange={handleMapLinkChange}
                className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full p-2"
                placeholder="Enter Map Url"
              />
              {errorMap && <p className="text-xs text-red-500">{errorMap}</p>}
            </div>
          </div>
        </div>

        {/* Country/State */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5  w-full">
          {/* Country */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Country <span className="text-zinc-400">*</span>
              </p>
              {formData.errmsg &&
                formData.propertyDetails_propertySummary_country === "" && (
                  <span className="text-red-500 text-xs">Required Field</span>
                )}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <input
                type="text"
                name="propertyDetails_propertySummary_country"
                value={formData.propertyDetails_propertySummary_country}
                onChange={handleChange}
                className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full p-2"
                placeholder="Enter Country"
              />
            </div>
          </div>

          {/* State */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                State <span className="text-zinc-400">*</span>
              </p>
              {formData.errmsg &&
                formData.propertyDetails_propertySummary_state === "" && (
                  <span className="text-red-500 text-xs">Required Field</span>
                )}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <input
                type="text"
                name="propertyDetails_propertySummary_state"
                value={formData.propertyDetails_propertySummary_state}
                onChange={handleChange}
                className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full p-2"
                placeholder="Enter State"
              />
            </div>
          </div>
        </div>

        {/* City/District */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5  w-full">
          {/* City */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                City <span className="text-zinc-400">*</span>
              </p>
              {formData.errmsg &&
                formData.propertyDetails_propertySummary_city === "" && (
                  <span className="text-red-500 text-xs">Required Field</span>
                )}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <input
                type="text"
                name="propertyDetails_propertySummary_city"
                value={formData.propertyDetails_propertySummary_city}
                onChange={handleChange}
                className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full p-2"
                placeholder="Enter City"
              />
            </div>
          </div>

          {/* District */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                District/Sub-District <span className="text-zinc-400">*</span>
              </p>
              {formData.errmsg &&
                formData.propertyDetails_propertySummary_district === "" && (
                  <span className="text-red-500 text-xs">Required Field</span>
                )}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <input
                type="text"
                name="propertyDetails_propertySummary_district"
                value={formData.propertyDetails_propertySummary_district}
                onChange={handleChange}
                className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full p-2"
                placeholder="Enter District/Sub-District"
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-col items-start p-0 gap-1.5 w-full">
          <div className="flex flex-row items-center p-0 gap-0.75">
            <p className="text-sm font-normal text-zinc-700">
              Address <span className="text-zinc-400">*</span>
            </p>
            {formData.errmsg &&
              formData.propertyDetails_propertySummary_address === "" && (
                <span className="text-red-500 text-xs">Required Field</span>
              )}
          </div>
          <div className="flex flex-col items-start p-0 gap-1 w-full">
            <input
              type="text"
              name="propertyDetails_propertySummary_address"
              value={formData.propertyDetails_propertySummary_address}
              onChange={handleChange}
              className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full p-2"
              placeholder="Enter property address"
            />
          </div>
        </div>

        {/* Land / Building Area */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5  md:h-[66px] w-full">
          {/* Land */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2 h-[66px]">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Land area <span className="text-zinc-400">*</span>
              </p>
              {formData.errmsg &&
                formData.propertyDetails_propertySummary_landArea === 0 && (
                  <span className="text-red-500 text-xs">Required Field</span>
                )}
              {formData.propertyDetails_propertySummary_landArea < 0 && (
                <span className="text-red-500 text-xs">
                  Enter a number Greater than 0
                </span>
              )}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <div className="flex items-center bg-[#F4F4F5] border-none rounded-full h-[40px] w-full relative">
                <input
                  type="number"
                  name="propertyDetails_propertySummary_landArea"
                  value={formData.propertyDetails_propertySummary_landArea}
                  onChange={handleNumberChange}
                  className="flex-grow h-full bg-transparent border-none rounded-full pl-3 md:pr-10 focus:outline-none focus:ring-0 focus:border-none"
                />
                <span className="text-sm text-[#3F3F46] pr-3">m²</span>
              </div>
            </div>
          </div>

          {/* Building */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2 h-[66px]">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Building area <span className="text-zinc-400">*</span>
              </p>
              {formData.errmsg &&
                formData.propertyDetails_propertySummary_buildingArea === 0 && (
                  <span className="text-red-500 text-xs">Required Field</span>
                )}
              {formData.propertyDetails_propertySummary_buildingArea < 0 && (
                <span className="text-red-500 text-xs">
                  Enter a number Greater than 0
                </span>
              )}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <div className="flex items-center bg-[#F4F4F5] border-none rounded-full h-[40px] w-full relative">
                <input
                  type="number"
                  name="propertyDetails_propertySummary_buildingArea"
                  value={formData.propertyDetails_propertySummary_buildingArea}
                  onChange={handleNumberChange}
                  className="flex-grow h-full bg-transparent border-none rounded-full pl-3 md:pr-10 focus:outline-none focus:ring-0 focus:border-none"
                />
                <span className="text-sm text-[#3F3F46] pr-3">m²</span>
              </div>
            </div>
          </div>
        </div>

        {/* Price Estim */}
        <div className="flex flex-row items-start p-0 gap-1.5  h-[66px] w-full">
          {/* Land */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full h-[66px]">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Property price estimation{" "}
                <span className="text-zinc-400">*</span>
              </p>
              {formData.errmsg &&
                (formData.propertyDetails_propertySummary_priceEstimation ===
                  0 ||
                  isNaN(
                    formData.propertyDetails_propertySummary_priceEstimation
                  )) && (
                  <span className="text-red-500 text-xs">Required Field</span>
                )}
              {formData.propertyDetails_propertySummary_priceEstimation < 0 && (
                <span className="text-red-500 text-xs">
                  Enter a number Greater than 0
                </span>
              )}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <div className="flex items-center bg-[#F4F4F5] border-none rounded-full h-[40px] w-full relative">
                <input
                  type="number"
                  name="propertyDetails_propertySummary_priceEstimation"
                  value={
                    formData.propertyDetails_propertySummary_priceEstimation
                  }
                  onChange={handleNumberChange}
                  className="flex-grow h-full bg-transparent border-none rounded-full pl-3 md:pr-10 focus:outline-none focus:ring-0 focus:border-none"
                />
                <span className="text-sm text-[#3F3F46] pr-3">USD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Images */}
      <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg">
        {/* Title */}
        <p className="text-lg font-medium text-zinc-500">Property Images</p>
        {/* Divider */}
        <div className="w-full h-px bg-zinc-200"></div>

        {/* Uploader */}
        <div
          className="flex flex-col justify-center items-center p-8 gap-4 w-full md:h-[164px] border border-dashed border-zinc-300 rounded-lg"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="flex flex-col items-center p-0 gap-2 h-[44px]">
            <div className="h-[18px] text-base font-medium text-zinc-700">
              Choose a file or drag & drop it here
            </div>
            <div className="h-[18px] text-base font-regular text-zinc-500 hidden md:block">
              png and jpg formats with maximum 1080x720 up to 50MB
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="file-input"
          />
          <label
            htmlFor="file-input"
            className="flex flex-row justify-center items-center p-3 gap-2 w-[101px] h-[40px] bg-teal-600 text-white font-medium rounded-full cursor-pointer"
          >
            Upload
          </label>
          {formData.errmsg &&
            formData.propertyDetails_propertyImages_primary === null && (
              <span className="text-red-500 text-xs">
                Primary Image is Necessary
              </span>
            )}
          {formData.errmsg &&
            !(formData.propertyDetails_propertyImages_others.length > 0) && (
              <span className="text-red-500 text-xs">
                Atleast 2 images are required in total
              </span>
            )}
        </div>
        {formData.errmsg &&
          formData.propertyDetails_propertyImages_primary === null && (
            <span className="text-red-500 text-xs">
              Primary Image is Necessary
            </span>
          )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {formData.propertyDetails_propertyImages_primary && (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 gap-3 bg-white shadow-md rounded-md">
              <div className="flex items-center gap-3">
                <Image
                  src={URL.createObjectURL(
                    formData.propertyDetails_propertyImages_primary
                  )}
                  alt="Primary Image"
                  width={40}
                  height={40}
                  style={{ borderRadius: "3px" }}
                />
                <span className="hidden md:block text-sm font-medium text-[#3F3F46]">
                  {truncateText(
                    formData.propertyDetails_propertyImages_primary.name,
                    18
                  )}
                </span>
                <CheckCircle weight="fill" color="#0D9488" />
                <Box
                  backgroundColor="#F0FDFA"
                  color="#0D9488"
                  padding="2px 8px"
                  borderWidth="1px"
                  borderRadius="full"
                  borderColor="#0D9488"
                  fontSize="xs"
                  zIndex={10}
                >
                  Primary
                </Box>
              </div>
              <span className="md:hidden text-sm font-medium text-[#3F3F46]">
                {truncateText(
                  formData.propertyDetails_propertyImages_primary.name,
                  18
                )}
              </span>

              <div className="md:ml-auto flex md:items-end gap-1">
                <Button
                  leftIcon={<Eye weight="fill" />}
                  height="40px"
                  padding="12px 16px"
                  bg="#F4F4F5"
                  boxShadow=""
                  borderRadius="full"
                  color="#3F3F46"
                  fontSize="14px"
                  fontWeight="500"
                  _focus={{ bg: "teal.200" }}
                  _hover={{ bg: "teal.200" }}
                  onClick={() => {
                    setShowModal(0); // For primary image
                  }}
                >
                  View
                </Button>
                <Button
                  height="40px"
                  padding="12px 16px"
                  bg="#F4F4F5"
                  boxShadow=""
                  borderRadius="full"
                  color="#3F3F46"
                  fontSize="14px"
                  fontWeight="500"
                  _focus={{ bg: "teal.200" }}
                  _hover={{ bg: "teal.200" }}
                  onClick={() => {
                    removePrimaryImage();
                  }}
                >
                  <Trash weight="fill" />
                </Button>

                <MediaShowModal
                  isOpen={showModal === 0} // Check if primary image modal should be open
                  image={formData.propertyDetails_propertyImages_primary}
                  onClose={() => setShowModal(null)}
                />
              </div>
            </div>
          )}

          {formData.propertyDetails_propertyImages_others.map(
            (image, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-center md:justify-between p-4 gap-3 bg-white shadow-md rounded-md"
              >
                <div className="flex items-center gap-3">
                  <Image
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt="Other Image"
                    width={40}
                    height={40}
                    style={{ borderRadius: "3px" }}
                  />
                  <span className="hidden md:block text-sm font-medium text-[#3F3F46]">
                    {truncateText(image.name, 18)}
                  </span>
                  <CheckCircle weight="fill" color="#0D9488" />
                </div>

                <span className="md:hidden text-sm font-medium text-[#3F3F46]">
                  {truncateText(image.name, 18)}
                </span>

                <div className="md:ml-auto flex md:items-end gap-1 flex-col md:flex-row">
                  <Button
                    height="40px"
                    padding="12px 16px"
                    bg="#F4F4F5"
                    boxShadow=""
                    borderRadius="full"
                    color="#3F3F46"
                    fontSize="14px"
                    fontWeight="500"
                    _focus={{ bg: "teal.200" }}
                    _hover={{ bg: "teal.200" }}
                    onClick={() => swapImage(index)}
                  >
                    Set as Primary
                  </Button>
                  <Button
                    leftIcon={<Eye weight="fill" />}
                    height="40px"
                    padding="12px 16px"
                    bg="#F4F4F5"
                    boxShadow=""
                    borderRadius="full"
                    color="#3F3F46"
                    fontSize="14px"
                    fontWeight="500"
                    _focus={{ bg: "teal.200" }}
                    _hover={{ bg: "teal.200" }}
                    onClick={() => {
                      setShowModal(index + 1); // +1 to differentiate from primary image modal
                    }}
                  >
                    View
                  </Button>
                  <Button
                    height="40px"
                    padding="12px 16px"
                    bg="#F4F4F5"
                    boxShadow=""
                    borderRadius="full"
                    color="#3F3F46"
                    fontSize="14px"
                    fontWeight="500"
                    _focus={{ bg: "teal.200" }}
                    _hover={{ bg: "teal.200" }}
                    onClick={() => {
                      removeImage(index);
                    }}
                  >
                    <Trash weight="fill" />
                  </Button>

                  <MediaShowModal
                    isOpen={showModal === index + 1} // Check if other image modal should be open
                    image={image}
                    onClose={() => setShowModal(null)}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Property Details */}
      <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg">
        {/* Title */}
        <p className="text-lg font-medium text-zinc-500">Property Details</p>
        {/* Divider */}
        <div className="w-full h-px bg-zinc-200"></div>

        {/* Sell Plan / Property Type */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5 w-full">
          {/* Sell Plan */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                When do you plan to sell the property?{" "}
                <span className="text-zinc-400">*</span>
              </p>
              {formData.errmsg &&
                formData.propertyDetails_propertyDetails_planToSell === "" && (
                  <span className="text-red-500 text-xs">Select an option</span>
                )}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <div className="relative w-full">
                <select
                  name="propertyDetails_propertyDetails_planToSell"
                  value={formData.propertyDetails_propertyDetails_planToSell}
                  onChange={handleDropdownChange}
                  className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full pl-4 pr-4"
                  disabled={isLoading}
                >
                  <option value="" disabled>
                    Select Sell Plan
                  </option>
                  <option value="ASAP">ASAP</option>
                  <option value="Slightly Looking Price">
                    Slightly Looking Price
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Property Type */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Property Type
                <span className="text-zinc-400">*</span>
              </p>
              {formData.errmsg &&
                formData.propertyDetails_propertyDetails_propertyType ===
                  "" && (
                  <span className="text-red-500 text-xs">Select an option</span>
                )}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <div className="relative w-full">
                <select
                  name="propertyDetails_propertyDetails_propertyType"
                  value={formData.propertyDetails_propertyDetails_propertyType}
                  onChange={handleDropdownChange}
                  className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full pl-4 pr-4"
                  disabled={isLoading}
                >
                  <option value="" disabled>
                    Select Property Type
                  </option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="House">House</option>
                  <option value="Commercial Building">
                    Commercial Building
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/*Ownership*/}
        <div className="flex flex-col items-start p-0 gap-1.5  md:h-[128px] w-full">
          <div className="flex flex-row items-center p-0 gap-0.75">
            <p className="text-sm font-normal text-zinc-700">
              Does the property still have a loan, or is it fully owned?{" "}
              <span className="text-zinc-400">*</span>
            </p>
            {formData.errmsg &&
              formData.propertyDetails_propertyDetails_ownershipStatus ===
                "" && (
                <span className="text-red-500 text-xs">Select an option</span>
              )}
          </div>

          <div className="flex flex-col items-start p-0 gap-3 w-[756px] md:h-[66px]">
            <div className="flex flex-row items-center p-0 gap-3 w-[351px] h-[20px]">
              <input
                type="radio"
                id="fullOwnership"
                name="propertyDetails_propertyDetails_ownershipStatus"
                value="full"
                className="w-[24px] h-[24px] bg-red"
                checked={
                  formData.propertyDetails_propertyDetails_ownershipStatus ===
                  "full"
                }
                onChange={handleOptionChange}
                disabled={isLoading}
              />
              <label
                htmlFor="fullOwnership"
                className="text-sm font-normal text-zinc-700"
              >
                I own 100% of the property
              </label>
            </div>
            <div className="flex flex-row items-center p-0 gap-3 w-[351px] md:h-[20px]">
              <input
                type="radio"
                id="partialOwnership"
                name="propertyDetails_propertyDetails_ownershipStatus"
                value="partial"
                className="w-[24px] h-[24px]"
                checked={
                  formData.propertyDetails_propertyDetails_ownershipStatus ===
                  "partial"
                }
                onChange={handleOptionChange}
                disabled={isLoading}
              />
              <label
                htmlFor="partialOwnership"
                className="text-sm font-normal text-zinc-700"
              >
                I own partial ownership of the property
              </label>
            </div>
            <div className="flex flex-row items-center p-0 gap-3 w-[351px] md:h-[20px]">
              <input
                type="radio"
                id="onCredit"
                name="propertyDetails_propertyDetails_ownershipStatus"
                value="credit"
                className="w-[24px] h-[24px]"
                checked={
                  formData.propertyDetails_propertyDetails_ownershipStatus ===
                  "credit"
                }
                onChange={handleOptionChange}
                disabled={isLoading}
              />
              <label
                htmlFor="onCredit"
                className="text-sm font-normal text-zinc-700"
              >
                It is still on credit, not fully purchased
              </label>
            </div>
          </div>
        </div>

        {/* Property Condition */}
        <div className="flex flex-col items-start p-0 gap-1.5  h-[66px] w-full">
          <div className="flex flex-row items-center p-0 gap-0.75">
            <p className="text-sm font-normal text-zinc-700">
              Property condition <span className="text-zinc-400">*</span>
            </p>
            {formData.errmsg &&
              formData.propertyDetails_propertyDetails_propertyCondition ===
                "" && (
                <span className="text-red-500 text-xs">Select an option</span>
              )}
          </div>
          <div className="flex flex-col items-start p-0 gap-1 w-full">
            <div className="relative w-full">
              <select
                name="propertyDetails_propertyDetails_propertyCondition"
                value={
                  formData.propertyDetails_propertyDetails_propertyCondition
                }
                onChange={handleDropdownChange}
                className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full pl-4 pr-4"
                disabled={isLoading}
              >
                <option value="" disabled>
                  Select Property Condition
                </option>
                <option value="New">New</option>
                <option value="Well Maintained">Well Maintained</option>
                <option value="Inhabitable">Inhabitable</option>
              </select>
            </div>
          </div>
        </div>

        {/* Occupancy Status */}
        <div className="flex flex-col items-start p-0 gap-1.5 h-[66px] w-full">
          <div className="flex flex-row items-center p-0 gap-0.75">
            <p className="text-sm font-normal text-zinc-700">
              Occupancy status <span className="text-zinc-400">*</span>
            </p>
            {formData.errmsg &&
              formData.propertyDetails_propertyDetails_occupancyStatus ===
                "" && (
                <span className="text-red-500 text-xs">Select an option</span>
              )}
          </div>
          <div className="flex flex-col items-start p-0 gap-1 w-full">
            <div className="relative w-full">
              <select
                name="propertyDetails_propertyDetails_occupancyStatus"
                value={formData.propertyDetails_propertyDetails_occupancyStatus}
                onChange={handleDropdownChange}
                className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full pl-4 pr-4"
                disabled={isLoading}
              >
                <option value="" disabled>
                  Select Occupancy Status
                </option>
                <option value="Vacant">Vacant</option>
                <option value="Rented">Rented</option>
                <option value="Owner occupied">Owner occupied</option>
              </select>
            </div>
          </div>
        </div>

        {/* Manager / Furniture */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5 md:h-[66px] w-full">
          {/* Manager */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Is there’s a Property Manager for your property?{" "}
                <span className="text-zinc-400">*</span>
              </p>
              {formData.errmsg &&
                formData.propertyDetails_propertyDetails_propertyManager ===
                  "" && (
                  <span className="text-red-500 text-xs">Select an option</span>
                )}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <div className="relative w-full">
                <select
                  name="propertyDetails_propertyDetails_propertyManager"
                  value={
                    formData.propertyDetails_propertyDetails_propertyManager
                  }
                  onChange={handleDropdownChange}
                  className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full pl-4 pr-4"
                  disabled={isLoading}
                >
                  <option value="" disabled>
                    Select Option
                  </option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>

          {/* Furniture */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Furniture <span className="text-zinc-400">*</span>
              </p>
              {formData.errmsg &&
                formData.propertyDetails_propertyDetails_furnish === "" && (
                  <span className="text-red-500 text-xs">Select an option</span>
                )}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <div className="relative w-full">
                <select
                  name="propertyDetails_propertyDetails_furnish"
                  value={formData.propertyDetails_propertyDetails_furnish}
                  onChange={handleDropdownChange}
                  className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full pl-4 pr-4"
                  disabled={isLoading}
                >
                  <option value="" disabled>
                    Select Option
                  </option>
                  <option value="Full furnish">Full furnish</option>
                  <option value="Half furnish">Half furnish</option>
                  <option value="Empty">Empty</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Property Issues */}
        <div className="flex flex-col items-start p-0 gap-3 h-[236px] w-full">
          <div className="flex flex-row items-center p-0 gap-0.75 w-full">
            <p className="text-sm font-normal text-zinc-700">
              Does the property have any issues?{" "}
            </p>
            {formData.errmsg &&
              formData.propertyDetails_propertyDetails_propertyIssues.length ===
                0 && (
                <span className="text-red-500 text-xs">
                  Select at least one
                </span>
              )}
          </div>

          {/* Checkboxes */}
          <div className="flex flex-col p-0 gap-3 w-full">
            {[
              "Foundation",
              "Roof",
              "Plumbing",
              "Fire Damage",
              "Paint",
              "None of the above",
            ].map((issue) => (
              <div className="flex items-center" key={issue}>
                <input
                  type="checkbox"
                  id={issue.toLowerCase().replace(/\s+/g, "")}
                  name={issue}
                  checked={formData.propertyDetails_propertyDetails_propertyIssues.includes(
                    issue
                  )}
                  onChange={handleCheckboxChange}
                  className="w-6 h-6"
                  disabled={isLoading}
                />
                <label
                  htmlFor={issue.toLowerCase().replace(/\s+/g, "")}
                  className="ml-2 text-sm font-normal text-zinc-700"
                >
                  {issue}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Furniture sale */}
        <div className="flex flex-col items-start p-0 gap-1.5 h-auto w-full">
          <div className="flex flex-row items-center p-0 gap-0.75">
            <p className="text-sm font-normal text-zinc-700">
              Any furniture will be included on sale? (Add &quot;,&quot; to add
              tag)
            </p>
          </div>
          <div className="flex flex-col items-start p-0 gap-1 w-full">
            <div className="flex flex-wrap items-center gap-1 w-full bg-[#F4F4F5] border-none rounded-full p-2">
              {Array.isArray(
                formData.propertyDetails_propertyDetails_furniture
              ) &&
                formData.propertyDetails_propertyDetails_furniture.map(
                  (tag, index) => (
                    <span
                      key={index}
                      className="bg-teal-100 text-teal-600 px-2 py-1 rounded-[3px] text-md flex items-center gap-1"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="text-red-500"
                      >
                        &times;
                      </button>
                    </span>
                  )
                )}
              <input
                type="text"
                name="propertyDetails_propertyDetails_furniture"
                value={inputValue}
                onChange={handleTagChange}
                className="flex-grow h-[40px] bg-transparent border-none"
                placeholder="Waterpump, Air Purifier, furnace, etc."
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Property Specifications */}
      <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg">
        {/* Title */}
        <p className="text-lg font-medium text-zinc-500">
          Property Specifications
        </p>
        {/* Divider */}
        <div className="w-full h-px bg-zinc-200"></div>

        {/* Certificate/Floors */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5  w-full">
          {/* Certificate */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Property Certificate
                {/* <span className="text-zinc-400">*</span> */}
              </p>
              {/* {formData.errmsg &&
                formData.propertyDetails_propertySpecifications_propertyCertificate ===
                  "" && (
                  <span className="text-red-500 text-xs">Required Field</span>
                )} */}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <input
                type="text"
                name="propertyDetails_propertySpecifications_propertyCertificate"
                value={
                  formData.propertyDetails_propertySpecifications_propertyCertificate
                }
                onChange={handleChange}
                className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full p-2"
                placeholder=""
              />
            </div>
          </div>

          {/* Floor */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Floors
                {/* <span className="text-zinc-400">*</span> */}
              </p>
              {/* {formData.errmsg &&
                formData.propertyDetails_propertySpecifications_floors ===
                  0 && (
                  <span className="text-red-500 text-xs">Required Field</span>
                )}
              {formData.propertyDetails_propertySpecifications_floors < 0 && (
                <span className="text-red-500 text-xs">
                  Enter a number Greater than 0
                </span>
              )} */}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <input
                type="number"
                name="propertyDetails_propertySpecifications_floors"
                value={formData.propertyDetails_propertySpecifications_floors}
                onChange={handleNumberChange}
                className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full p-2"
                placeholder="Enter Floors"
              />
            </div>
          </div>
        </div>

        {/* WaterSupply/Bedrooms */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5  w-full">
          {/* Water */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Water Supply
                {/* <span className="text-zinc-400">*</span> */}
              </p>
              {/* {formData.errmsg &&
                formData.propertyDetails_propertySpecifications_waterSupply ===
                  "" && (
                  <span className="text-red-500 text-xs">Required Field</span>
                )} */}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <input
                type="text"
                name="propertyDetails_propertySpecifications_waterSupply"
                value={
                  formData.propertyDetails_propertySpecifications_waterSupply
                }
                onChange={handleChange}
                className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full p-2"
                placeholder=""
              />
            </div>
          </div>

          {/* Bedrooms */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Bedrooms
                {/* <span className="text-zinc-400">*</span> */}
              </p>
              {/* {formData.errmsg &&
                formData.propertyDetails_propertySpecifications_bedrooms ===
                  0 && (
                  <span className="text-red-500 text-xs">Required Field</span>
                )}
              {formData.propertyDetails_propertySpecifications_bedrooms < 0 && (
                <span className="text-red-500 text-xs">
                  Enter a number Greater than 0
                </span>
              )} */}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <input
                type="number"
                name="propertyDetails_propertySpecifications_bedrooms"
                value={formData.propertyDetails_propertySpecifications_bedrooms}
                onChange={handleNumberChange}
                className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full p-2"
                placeholder="Enter Bedrooms"
              />
            </div>
          </div>
        </div>

        {/* Bathrooms/Garage */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5  w-full">
          {/* Bathrooms */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Bathrooms
                {/* <span className="text-zinc-400">*</span> */}
              </p>
              {/* {formData.errmsg &&
                formData.propertyDetails_propertySpecifications_bathrooms ===
                  0 && (
                  <span className="text-red-500 text-xs">Required Field</span>
                )}
              {formData.propertyDetails_propertySpecifications_bathrooms <
                0 && (
                <span className="text-red-500 text-xs">
                  Enter a number Greater than 0
                </span>
              )} */}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <input
                type="number"
                name="propertyDetails_propertySpecifications_bathrooms"
                value={
                  formData.propertyDetails_propertySpecifications_bathrooms
                }
                onChange={handleNumberChange}
                className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full p-2"
                placeholder="Enter Bathrooms"
              />
            </div>
          </div>

          {/* Garage */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Garage
                {/* <span className="text-zinc-400">*</span> */}
              </p>
              {/* {formData.errmsg &&
                formData.propertyDetails_propertySpecifications_garage ===
                  "" && (
                  <span className="text-red-500 text-xs">Required Field</span>
                )} */}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <input
                type="text"
                name="propertyDetails_propertySpecifications_garage"
                value={formData.propertyDetails_propertySpecifications_garage}
                onChange={handleChange}
                className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full p-2"
                placeholder=""
              />
            </div>
          </div>
        </div>

        {/* Garden/Swimming Pool */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5  w-full">
          {/* Garden */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Garden
                {/* <span className="text-zinc-400">*</span> */}
              </p>
              {/* {formData.errmsg &&
                formData.propertyDetails_propertySpecifications_garden ===
                  "" && (
                  <span className="text-red-500 text-xs">Required Field</span>
                )} */}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <input
                type="text"
                name="propertyDetails_propertySpecifications_garden"
                value={formData.propertyDetails_propertySpecifications_garden}
                onChange={handleChange}
                className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full p-2"
                placeholder=""
              />
            </div>
          </div>

          {/* Swimming Pool */}
          <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
            <div className="flex flex-row items-center p-0 gap-0.75">
              <p className="text-sm font-normal text-zinc-700">
                Swimming Pool
                {/* <span className="text-zinc-400">*</span> */}
              </p>
              {/* {formData.errmsg &&
                formData.propertyDetails_propertySummary_state === "" && (
                  <span className="text-red-500 text-xs">Required Field</span>
                )} */}
            </div>
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <input
                type="text"
                name="propertyDetails_propertySpecifications_swimPool"
                value={formData.propertyDetails_propertySpecifications_swimPool}
                onChange={handleChange}
                className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full p-2"
                placeholder=""
              />
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg md:min-h-[240px]">
        {/* Title */}
        <p className="text-lg font-medium text-zinc-500">
          Description{" "}
          {formData.errmsg && formData.propertyDetails_description === "" && (
            <span className="text-red-500 text-xs">Required Field</span>
          )}
        </p>
        {/* Divider */}
        <div className="w-full h-px bg-zinc-200"></div>

        <ReactQuill
          className="w-full"
          value={formData.propertyDetails_description}
          onChange={handleDescriptionChange}
        />
      </div>
    </>
  );
};

export default FormPart1;
