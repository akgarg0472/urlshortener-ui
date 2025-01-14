interface ProfileAccountInformationProps {
  lastLogin?: number;
  lastPasswordChangedAt?: number;
  createdAt?: number;
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
