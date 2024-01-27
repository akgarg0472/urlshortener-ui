interface ProfileAccountInformationProps {
  lastLogin?: number;
  lastPasswordChangedAt?: number;
  premiumAccount?: boolean;
}

interface PersonalDetailsProps {
  city: string;
  state: string;
  zipcode: string;
  country: string;
}

interface ProfilePersonalDetailsProps {
  profilePicture: string;
  name: string;
  bio: string;
  email?: string;
  phone: string;
  createdAt?: number;
}
