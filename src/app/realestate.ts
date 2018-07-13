export interface Realestate {
  _id: string;
  name: string;
  address: string;
  price: number;
  redpocket: Redpocket;
  groupPrice: number;
  phone: number;
  consultant: Consultant;
  description: string;
  images: string[];
  visitServices: VisitService[];
  comments: Comment[];
  relatedRealestateIds: string[];
}

export interface Redpocket {
  amount: number;
  startDate: string;
  endDate: string;
}

export interface Consultant {
  title: string;
  phone: number;
  description: string;
}

export interface VisitService {
  name: string;
  description: string;
}

export interface Comment {
  account: string;
  text: string;
  date: string;
}


