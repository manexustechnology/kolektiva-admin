import { GET_ADMIN_PROPERTY_LISTING_REQUEST } from "@/constants/api-routes.constants";
import {
  AdminPropertyListingRequestResponse,
  GetAdminPropertyListingRequestParams,
} from "@/types/admin/property-listing-request";
import { ResponseDataPagination } from "@/types/response";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import queryString from "query-string";

export const fetchGetAdminPropertyListingRequest = async (
  params: GetAdminPropertyListingRequestParams,
  headers: AxiosRequestConfig
): Promise<
  AxiosResponse<ResponseDataPagination<AdminPropertyListingRequestResponse[]>>
> => {
  const queryParams = queryString.stringify(params as any);
  return await axios.get(
    `${GET_ADMIN_PROPERTY_LISTING_REQUEST}?${queryParams}`,
    {
      headers: { "Access-Control-Allow-Origin": "*" },
      ...headers,
    }
  );
};
