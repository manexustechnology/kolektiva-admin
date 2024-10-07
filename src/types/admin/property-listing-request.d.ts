import { PropertyData } from "../property-data";

export interface GetAdminPropertyListingRequestParams {
  page: number;
  perPage: number;
  status: string;
  search: string;
}

export interface AdminPropertyListingRequestResponse {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  priceEstimation: string;
  status: string;
  propertyData: PropertyData;
  createdAt: Date;
  updatedAt: Date;
}

export interface PropertyListingRequestPropertyData {
  landArea: number;
  furniture: string;
  planToSell: string;
  buildingArea: number;
  propertyType: string;
  googleMapsLink: string;
  propertyIssues: string[];
  occupancyStatus: string;
  ownershipStatus: string;
  propertyManager: string;
  includedFurniture: string;
  propertyCondition: string;
}

export interface ChangePropertyListingRequestStatus {
  status: "pending" | "oncheck" | "approved" | "rejected" | "archived";
}
