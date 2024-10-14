import {
  GET_ADMIN_LISTED_PROPERTY,
  GET_LISTED_PROPERTY_DETAIL,
  PATCH_CHANGE_LISTED_PROPERTY_PHASE,
  PATCH_CHANGE_LISTED_PROPERTY_STATUS,
  SUBMIT_ADMIN_LISTED_PROPERTY,
  UPDATE_ADMIN_LISTED_PROPERTY,
  REMOVE_ADMIN_LISTED_PROPERTY,
} from "@/constants/api-routes.constants";
import {
  AdminListedPropertyResponse,
  ChangeListedPropertyPhase,
  ChangeListedPropertyStatus,
  GetAdminListedPropertyParams,
} from "@/types/admin/listed-property";
import { PropertyData } from "@/types/property-data";
import { ResponseData, ResponseDataPagination } from "@/types/response";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import queryString from "query-string";

const defaultHeaders = {
  "Access-Control-Allow-Origin": "*",
};

const createAxiosConfigWithHeaders = (headers: AxiosRequestConfig) => ({
  headers: { ...defaultHeaders, ...headers.headers },
});

export const fetchGetAdminListedProperty = async (
  params: GetAdminListedPropertyParams,
  headers: AxiosRequestConfig
): Promise<
  AxiosResponse<ResponseDataPagination<AdminListedPropertyResponse[]>>
> => {
  const queryParams = queryString.stringify(params as any);
  return await axios.get(
    `${GET_ADMIN_LISTED_PROPERTY}?${queryParams}`,
    createAxiosConfigWithHeaders(headers)
  );
};

export const fetchGetAdminListedPropertyDetail = async (
  identifier: string,
  headers: AxiosRequestConfig
): Promise<AxiosResponse<ResponseData<AdminListedPropertyResponse>>> => {
  return await axios.get(
    `${GET_LISTED_PROPERTY_DETAIL}/${identifier}`,
    createAxiosConfigWithHeaders(headers)
  );
};

export const fetchChangeListedPropertyStatus = async (
  identifier: string,
  params: ChangeListedPropertyStatus,
  headers: AxiosRequestConfig
): Promise<AxiosResponse<ResponseData<AdminListedPropertyResponse>>> => {
  return await axios.patch(
    `${PATCH_CHANGE_LISTED_PROPERTY_STATUS}/${identifier}`,
    params,
    createAxiosConfigWithHeaders(headers)
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
    createAxiosConfigWithHeaders(headers)
  );
};

export const fetchSubmitListedProperty = async (
  params: PropertyData,
  headers: AxiosRequestConfig
): Promise<AxiosResponse<ResponseData<AdminListedPropertyResponse>>> => {
  return await axios.post(
    SUBMIT_ADMIN_LISTED_PROPERTY,
    params,
    createAxiosConfigWithHeaders(headers)
  );
};

export const fetchUpdateListedProperty = async (
  identifier: string,
  params: PropertyData,
  headers: AxiosRequestConfig
): Promise<AxiosResponse<ResponseData<AdminListedPropertyResponse>>> => {
  return await axios.put(
    `${UPDATE_ADMIN_LISTED_PROPERTY}/${identifier}`,
    params,
    createAxiosConfigWithHeaders(headers)
  );
};

export const fetchRemoveListedProperty = async (
  identifier: string,
  headers: AxiosRequestConfig
): Promise<AxiosResponse<ResponseData<AdminListedPropertyResponse>>> => {
  return await axios.delete(
    `${REMOVE_ADMIN_LISTED_PROPERTY}/${identifier}`,
    createAxiosConfigWithHeaders(headers)
  );
};
