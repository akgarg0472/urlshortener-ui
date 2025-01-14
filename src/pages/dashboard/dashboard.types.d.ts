type ProfileData = {
  id?: string;
  email?: string;
  profilePicture: string;
  name: string;
  bio: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  businessDetails: string;
  premiumAccount?: boolean;
  lastPasswordChangedAt?: number;
  lastLogin?: number;
  createdAt?: number;
  updatedAt?: number;
};

type PercentageChange = {
  percentage: number;
  direction: 1 | -1 | 0;
};
