export interface CreateAddressDto {
  userId: string;
  street: string;
  city: string;
  state: string;
  country: string;
}

export interface UpdateAddressDto {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
}