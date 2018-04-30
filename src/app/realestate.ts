import { CustomerComment } from './customer-comment';

export class Realestate {
  _id: string;
  name: string;
  alias?: string;
  location: string;
  price: number;
  customerComments?: CustomerComment[];
  description: string;
  imageUrls: string[] = [];
  relatedRealestates?: number[];
  developer?: string;
  investor?: string;
  propertyManagementCompany?: string;
}
