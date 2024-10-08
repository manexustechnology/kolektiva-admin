import {
  GET_ADMIN_LISTED_PROPERTY,
  GET_LISTED_PROPERTY_DETAIL,
  PATCH_CHANGE_LISTED_PROPERTY_PHASE,
  PATCH_CHANGE_LISTED_PROPERTY_STATUS,
} from "@/constants/api-routes.constants";
import {
  AdminListedPropertyResponse,
  ChangeListedPropertyPhase,
  ChangeListedPropertyStatus,
  GetAdminListedPropertyParams,
} from "@/types/admin/listed-property";
import { ResponseData, ResponseDataPagination } from "@/types/response";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import queryString from "query-string";

export const fetchGetAdminListedProperty = async (
  params: GetAdminListedPropertyParams,
  headers: AxiosRequestConfig
): Promise<
  AxiosResponse<ResponseDataPagination<AdminListedPropertyResponse[]>>
> => {
  const queryParams = queryString.stringify(params as any);
  return await axios.get(`${GET_ADMIN_LISTED_PROPERTY}?${queryParams}`, {
    headers: { "Access-Control-Allow-Origin": "*" },
    ...headers,
  });
};

export const fetchGetAdminListedPropertyDetail = async (
  identifier: string,
  headers: AxiosRequestConfig
): Promise<AxiosResponse<ResponseData<AdminListedPropertyResponse>>> => {
  return await axios.get(`${GET_LISTED_PROPERTY_DETAIL}/${identifier}`, {
    headers: { "Access-Control-Allow-Origin": "*" },
    ...headers,
  });
};

export const fetchChangeListedPropertyStatus = async (
  identifier: string,
  params: ChangeListedPropertyStatus,
  headers: AxiosRequestConfig
): Promise<AxiosResponse<ResponseData<AdminListedPropertyResponse>>> => {
  return await axios.patch(
    `${PATCH_CHANGE_LISTED_PROPERTY_STATUS}/${identifier}`,
    params,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      ...headers,
    }
  );
};

export const fetchChangeListedPropertyPhase = async (
  identifier: string,
  params: ChangeListedPropertyPhase,
  headers: AxiosRequestConfig
): Promise<AxiosResponse<ResponseData<AdminListedPropertyResponse>>> => {
  return await axios.patch(
    `${PATCH_CHANGE_LISTED_PROPERTY_PHASE}/${identifier}`,
    params,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      ...headers,
    }
  );
};
