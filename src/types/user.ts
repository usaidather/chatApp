export interface UserAddress {
  street?: string;
  city?: string;
  zipcode?: string;
}

export interface User {
  id: number | string;
  name: string;
  email?: string;
  username?: string;
  phone?: string;
  website?: string;
  avatar?: string;
  company?: string;
  address?: UserAddress;
}
