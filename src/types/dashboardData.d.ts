export interface Property {
  address: string;
  city: string;
  price: string;
  imageUrl: string;
}

export interface User {
  name: string;
  imageUrl: string;
  amount: number;
}

export interface DashboardData {
  property_propertyListed_upcomming: number;
  property_propertyListed_ipo: number;
  property_propertyListed_aftermarket: number;

  property_listingRequest_chart: string;

  property_latestBuy: Property[];
  property_latestSell: Property[];

  users_kyc: number;
  users_nonKyc: number;
  users_investersNum: number;
  users_activeUsers: number;
  users_newUsers: number;
  users_topInverstors: User[];
}
