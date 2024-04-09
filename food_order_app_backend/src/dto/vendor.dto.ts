export interface createVendorInput {
  name: string;
  ownerName: string;
  foodType: [string];
  pincode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

export interface editVendorInput {
  name: string;
  address: string;
  phone: string;
  foodType: [string];
}

export interface vendorLoginInput {
  email: string;
  password: string;
}

export interface vendorPayload {
  _id: string;
  email: string;
  name: string;
}

export interface createOfferInputs {
  offerType: string;
  vendors: [any];
  title: string;
  description: string;
  minValue: number;
  offerAmount: number;
  startValidity: Date;
  endValidity: Date;
  promocode: string;
  promoType: string;
  bank: [any];
  bins: [any];
  pincode: string;
  isActive: boolean;
}
