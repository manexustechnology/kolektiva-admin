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
  status: string;
  isFeatured: any;
  isUpcoming: boolean;
  isAftermarket: any;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: any;
}