import { CustomerComment } from './customer-comment';

export class Realestate {
  id: number;
  name: string;
  location: string;
  price: number;
  customerComments: CustomerComment[];
  description: string[];
  imageUrls: string[];
  relatedRealestates: number[];
  developer: string;
  investor: string;
  propertyManagementCompany: string;
}
