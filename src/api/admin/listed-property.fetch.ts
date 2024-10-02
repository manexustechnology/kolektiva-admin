import { GET_ADMIN_LISTED_PROPERTY } from "@/constants/api-routes.constants";
import {
  AdminListedPropertyResponse,
  GetAdminListedPropertyParams,
} from "@/types/admin/listed-property";
import { ResponseDataPagination } from "@/types/response";
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
