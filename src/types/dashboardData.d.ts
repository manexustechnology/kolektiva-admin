export interface Property {
  address: string;
  city: string;
  price: string;
  imageUrl: string;
}

export interface DashboardData {
  property_propertyListed_upcomming: number;
  property_propertyListed_ipo: number;
  property_propertyListed_aftermarket: number;

  property_listingRequest_chart: string;

  property_latestBuy: Property[];
  property_latestSell: Property[];
}
