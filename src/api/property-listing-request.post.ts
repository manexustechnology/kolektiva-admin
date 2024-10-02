import { PROPERTY_LISTING_REQUEST } from "@/constants/api-routes.constants";

import { ResponseData, ResponseDataPagination } from "@/types/response";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const submitPropertyListingRequest = async (
  params: any, // params is FormData()
  headers: AxiosRequestConfig
): Promise<AxiosResponse<ResponseData<any>>> => {
  const result = await axios.post(
    `${PROPERTY_LISTING_REQUEST}/submit`,
    params,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      ...headers,
    }
  );
  console.log("result from be", result);

  return result;
};
