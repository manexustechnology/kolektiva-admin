import {
  GET_ADMIN_PROPERTY_LISTING_REQUEST,
  GET_PROPERTY_REQUEST_DETAIL,
  PATCH_CHANGE_PROPERTY_LISTING_REQUEST_STATUS,
  POST_PROPERTY_LISTING_REQUEST,
} from "@/constants/api-routes.constants";
import {
  AdminPropertyListingRequestResponse,
  ChangePropertyListingRequestStatus,
  GetAdminPropertyListingRequestParams,
} from "@/types/admin/property-listing-request";
import { PropertyData } from "@/types/property-data";
import { ResponseData, ResponseDataPagination } from "@/types/response";
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

export const fetchGetAdminPropertyListingRequestDetail = async (
  identifier: string,
  headers: AxiosRequestConfig
): Promise<
  AxiosResponse<ResponseData<AdminPropertyListingRequestResponse>>
> => {
  return await axios.get(`${GET_PROPERTY_REQUEST_DETAIL}/${identifier}`, {
    headers: { "Access-Control-Allow-Origin": "*" },
    ...headers,
  });
};

export const fetchPostPropertyListingRequest = async (
  params: PropertyData,
  headers: AxiosRequestConfig
): Promise<
  AxiosResponse<ResponseData<AdminPropertyListingRequestResponse>>
> => {
  return await axios.post(`${POST_PROPERTY_LISTING_REQUEST}`, params, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    ...headers,
  });
};

export const fetchUpdatePropertyListingRequest = async (
  identifier: string,
  params: PropertyData,
  headers: AxiosRequestConfig
): Promise<
  AxiosResponse<ResponseData<AdminPropertyListingRequestResponse>>
> => {
  return await axios.put(
    `${POST_PROPERTY_LISTING_REQUEST}/${identifier}`,
    params,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      ...headers,
    }
  );
};

export const fetchChangePropertyListingRequestStatus = async (
  identifier: string,
  params: ChangePropertyListingRequestStatus,
  headers: AxiosRequestConfig
): Promise<
  AxiosResponse<ResponseData<AdminPropertyListingRequestResponse>>
> => {
  return await axios.patch(
    `${PATCH_CHANGE_PROPERTY_LISTING_REQUEST_STATUS}/${identifier}`,
    params,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      ...headers,
    }
  );
};
