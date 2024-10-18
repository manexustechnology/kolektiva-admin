export const HOST = process.env.NEXT_PUBLIC_BACKEND_URL;

export const ADMIN_ROUTE = `${HOST}/admin`;

export const POST_PROPERTY_LISTING_REQUEST = `${HOST}/property-listing-request/submit`;

export const GET_ADMIN_PROPERTY_LISTING_REQUEST = `${ADMIN_ROUTE}/property-listing-request`;
export const PATCH_CHANGE_PROPERTY_LISTING_REQUEST_STATUS = `${GET_ADMIN_PROPERTY_LISTING_REQUEST}/change-status`;
export const GET_PROPERTY_REQUEST_DETAIL = `${GET_ADMIN_PROPERTY_LISTING_REQUEST}/detail`;

export const GET_DASHBOARD = `${HOST}/dashboard`;

export const GET_ADMIN_LISTED_PROPERTY = `${ADMIN_ROUTE}/listed-property`;
export const SUBMIT_ADMIN_LISTED_PROPERTY = `${GET_ADMIN_LISTED_PROPERTY}/submit`;
export const UPDATE_ADMIN_LISTED_PROPERTY = `${GET_ADMIN_LISTED_PROPERTY}/update`;
export const REMOVE_ADMIN_LISTED_PROPERTY = `${GET_ADMIN_LISTED_PROPERTY}/remove`;
export const PATCH_CHANGE_LISTED_PROPERTY_STATUS = `${GET_ADMIN_LISTED_PROPERTY}/change-status`;
export const PATCH_CHANGE_LISTED_PROPERTY_PHASE = `${GET_ADMIN_LISTED_PROPERTY}/change-phase`;
export const GET_LISTED_PROPERTY_DETAIL = `${GET_ADMIN_LISTED_PROPERTY}/detail`;
