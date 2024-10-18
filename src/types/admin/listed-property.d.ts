import { PropertyData } from "../property-data";

export interface GetAdminListedPropertyParams {
  page: number;
  perPage: number;
  status?: string;
  searchAddress?: string;
}

export interface AdminListedPropertyResponse {
  id: string;
  marketAddress: string;
  tokenAddress: string;
  address: string;
  city: string;
  state: string;
  country: string;
  type: string;
  chainId: any;
  tokenName: any;
  tokenSymbol: any;
  totalSupply: any;
  latitude: string;
  longitude: string;
  description: string;
  phase: ListedPropertyPhase;
  status: ListedPropertyStatus;
  isFeatured: any;
  isUpcoming: boolean;
  isAftermarket: any;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: any;
  propertyData: PropertyData;
}

export type ListedPropertyStatus = "visible" | "hidden";

export type ListedPropertyPhase =
  | "draft"
  | "upcoming"
  | "initial-offering"
  | "settlement"
  | "aftermarket";

export interface ChangeListedPropertyStatus {
  status: ListedPropertyStatus;
}

export interface ChangeListedPropertyPhase {
  phase: ListedPropertyPhase;
}
