export interface Realestate {
  _id: string;
  name: string;
  city: string;
  address: string;
  coordinate: Coordinate;
  price: number;
  redpocket: Redpocket;
  groupPrice: number;
  phone: number;
  consultant: Consultant;
  description: string;
  images: string[];
  visitServices: VisitingServices;
  comments: Comment[];
  relatedRealestateIds: string[];
  news: News[];
}

export interface Coordinate {
  longitude: number;
  latitude: number;
}

export interface Redpocket {
  amount: number;
  startDate: string;
  endDate: string;
}

export interface Consultant {
  phone: number;
  description: string;
}

export interface Comment {
  account: string;
  text: string;
  date: string;
}

export interface VisitingServices {
  taxi: string;
  reimburse: string;
}

export interface News {
  title: string;
  url: string;
}


