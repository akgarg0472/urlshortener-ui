import { ApiResponse } from "../base";

export interface GetProfileResponse extends ApiResponse {
  id?: string;
  email?: string;
  profile_picture?: string;
  name?: string;
  bio?: string;
  phone?: string;
  city?: string;
  state?: string;
  country?: string;
  zipcode?: string;
  last_login?: number;
  last_password_changed?: number;
  premium_account?: boolean;
  business_details?: string;
  created_at?: number;
  updated_at?: number;
}

export interface UpdateProfileResponse extends ApiResponse {}

export interface DeleteProfileResponse extends ApiResponse {}

export interface UpdatePasswordResponse extends ApiResponse {}
