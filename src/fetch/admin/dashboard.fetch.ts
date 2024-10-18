import { GET_DASHBOARD } from "@/constants/api-routes.constants";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import queryString from "query-string";

const defaultHeaders = {
  "Access-Control-Allow-Origin": "*",
};

const createAxiosConfigWithHeaders = (headers: AxiosRequestConfig) => ({
  headers: { ...defaultHeaders, ...headers.headers },
});

export const fetchGetTotalUsers = async (
  query: any,
  headers: AxiosRequestConfig
) => {
  return await axios.get(
    `${GET_DASHBOARD}/total-users?${queryString.stringify(query)}`,
    createAxiosConfigWithHeaders(headers)
  );
};

export const fetchGetUserCounts = async (
  query: any,
  headers: AxiosRequestConfig
) => {
  return await axios.get(
    `${GET_DASHBOARD}/new-users?${queryString.stringify(query)}`,
    createAxiosConfigWithHeaders(headers)
  );
};

export const fetchGetPropertyCounts = async (
  query: any,
  headers: AxiosRequestConfig
) => {
  return await axios.get(
    `${GET_DASHBOARD}/property-counts?${queryString.stringify(query)}`,
    createAxiosConfigWithHeaders(headers)
  );
};

export const fetchGetUserActivities = async (
  query: any,
  headers: AxiosRequestConfig
) => {
  return await axios.get(
    `${GET_DASHBOARD}/user-activities?${queryString.stringify(query)}`,
    createAxiosConfigWithHeaders(headers)
  );
};

export const fetchGetPropertyListingRequests = async (
  query: any,
  headers: AxiosRequestConfig
) => {
  return await axios.get(
    `${GET_DASHBOARD}/property-requests?${queryString.stringify(query)}`,
    createAxiosConfigWithHeaders(headers)
  );
};

export const fetchGetLatestTrades = async (
  query: any,
  headers: AxiosRequestConfig
) => {
  return await axios.get(
    `${GET_DASHBOARD}/latest-trades?${queryString.stringify(query)}`,
    createAxiosConfigWithHeaders(headers)
  );
};
