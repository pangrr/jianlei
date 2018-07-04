export class Realestate {
  _id: string;
  name: string;
  address: string;
  price: number;
  groupPrice: number;
  phoneNumber: PhoneNumber;
  description: string;
  images: string[];
}

export class PhoneNumber {
  area: number;
  exchange: number;
  subscriber: number;
}
