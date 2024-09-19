"use client";

import React, { useState } from "react";
import { FormData } from "@/types/formData";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface FormPart1Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const FormPart1: React.FC<FormPart1Props> = ({ formData, setFormData }) => {
  const isLoading = false;

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
    setFormData((prevData) => ({ ...prevData, mapLink: value }));
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
      [name]: e.target.value,
    });
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //   const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const { name, checked } = e.target;
  //     setFormData((prevData) => {
  //       const updatedIssues = checked
  //         ? [...prevData.propertyIssues, name]
  //         : prevData.propertyIssues.filter((issue) => issue !== name);
  //       return { ...prevData, propertyIssues: updatedIssues };
  //     });
  //   };

  return (
    <>
      {/* ProgressBar */}
      <div className="flex flex-row items-start p-4 gap-2.5 w-full bg-white shadow-md rounded-lg">
        {/* 1 */}
        <div className="flex flex-col items-start p-0 gap-2.5 w-1/4 flex-grow">
          <div className="w-full h-[6px] bg-teal-600 rounded-full" />
          <div className="text-base font-medium text-zinc-700">
            1. Property Details
          </div>
        </div>

        {/* 2 */}
        <div className="flex flex-col items-start p-0 gap-2.5 w-1/4 flex-grow">
          <div className="w-full h-[6px] bg-zinc-200 rounded-full" />
          <div className="text-base font-normal text-zinc-400">
            2. Financials
          </div>
        </div>

        {/* 3 */}
        <div className="flex flex-col items-start p-0 gap-2.5 w-1/4 flex-grow">
          <div className="w-full h-[6px] bg-zinc-200 rounded-full" />
          <div className="text-base font-normal text-zinc-400">
            3. Documents
          </div>
        </div>

        {/* 4 */}
        <div className="flex flex-col items-start p-0 gap-2.5 w-1/4 flex-grow">
          <div className="w-full h-[6px] bg-zinc-200 rounded-full" />
          <div className="text-base font-normal text-zinc-400">4. Markets</div>
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
                  <option value="Phase1">Phase1</option>
                  <option value="Phase1">Phase2</option>
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
                  <option value="Status1">Status1</option>
                  <option value="Status2">Status2</option>
                  <option value="Status3">Status3</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Rental Status */}
        <div className="flex flex-col md:flex-row items-start p-0 gap-1.5 w-full">
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
                  <option value="Status1">Status1</option>
                  <option value="Status2">Status2</option>
                  <option value="Status3">Status3</option>
                </select>
              </div>
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
                Rental Status <span className="text-zinc-400">*</span>
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
                  <option value="NotOwner">NotOwner</option>
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
        </div>

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
        </div>
      </div>

      {/* Property Images */}
      <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg">
        {/* Title */}
        <p className="text-lg font-medium text-zinc-500">Property Images</p>
        {/* Divider */}
        <div className="w-full h-px bg-zinc-200"></div>
      </div>

      {/* Property Details */}
      <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg">
        {/* Title */}
        <p className="text-lg font-medium text-zinc-500">Property Details</p>
        {/* Divider */}
        <div className="w-full h-px bg-zinc-200"></div>
      </div>

      {/* Property Specifications */}
      <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg">
        {/* Title */}
        <p className="text-lg font-medium text-zinc-500">
          Property Specifications
        </p>
        {/* Divider */}
        <div className="w-full h-px bg-zinc-200"></div>
      </div>

      {/* Description */}
      <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg">
        {/* Title */}
        <p className="text-lg font-medium text-zinc-500">Description</p>
        {/* Divider */}
        <div className="w-full h-px bg-zinc-200"></div>
      </div>
    </>
  );
};

export default FormPart1;
