export const HOST = process.env.NEXT_PUBLIC_BACKEND_URL;

export const ADMIN_ROUTE = `${HOST}/admin`;

export const GET_ADMIN_PROPERTY_LISTING_REQUEST = `${ADMIN_ROUTE}/property-listing-request`;

export const GET_ADMIN_LISTED_PROPERTY = `${ADMIN_ROUTE}/listed-property`;
