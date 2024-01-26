import axios from "axios";
import {
  DASHBOARD_GET_PROFILE_API_URL_V1,
  DASHBOARD_UPDATE_PROFILE_API_URL_V1,
} from "../api.endpoint.constants";
import { GetProfileResponse, UpdateProfileResponse } from "./apiModals";
import {
  axiosNwErrorResponse,
  errorResponse,
  isAxiosNetworkError,
} from "../utils/errorutils";

export const getProfile = async (
  profileId: string
): Promise<GetProfileResponse> => {
  const url =
    process.env.REACT_APP_BACKEND_BASE_URL +
    DASHBOARD_GET_PROFILE_API_URL_V1.replace("$profileId", profileId);

  try {
    const apiResponse = await axios.get(url);

    const data = apiResponse.data.data;

    return {
      httpCode: apiResponse.status,
      success: apiResponse.data.status_code === 200,
      id: data.id,
      name: data.name,
      bio: data.bio,
      profile_picture: data.profile_picture,
      phone: data.phone,
      city: data.city,
      state: data.state,
      country: data.city,
      zipcode: data.zipcode,
      last_login: data.last_login,
      last_password_changed: data.last_password_changed,
      premium_account: data.premium_account,
      business_details: data.business_details,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };
  } catch (err: any) {
    if (isAxiosNetworkError(err)) {
      return axiosNwErrorResponse();
    }

    if (err.response && err.response.data) {
      return errorResponse(err);
    }

    return {
      success: false,
      httpCode: 500,
      message: "Fetch Profile Failed",
    };
  }
};

export const updateProfile = async (
  profileId: string,
  updateRequest: UpdateProfileRequest
): Promise<UpdateProfileResponse> => {
  const url =
    process.env.REACT_APP_BACKEND_BASE_URL +
    DASHBOARD_UPDATE_PROFILE_API_URL_V1.replace("$profileId", profileId);

  let profilePicture: File | null = null;

  if (updateRequest.profile_picture) {
    profilePicture = updateRequest.profile_picture;
    delete updateRequest.profile_picture;
  }

  const requestBody = new Map();

  for (const [key, value] of Object.entries(updateRequest)) {
    if (key && value) {
      requestBody.set(key, value);
    }
  }

  try {
    const formData = new FormData();
    const reqBody = JSON.stringify(Object.fromEntries(requestBody));

    if (profilePicture) {
      formData.append("profile_picture", profilePicture);
    }

    formData.append("req_body", reqBody);

    const response = await axios.patch(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      httpCode: response.status,
      success: response.data.status_code === 200,
      message: response.data.message,
    };
  } catch (err: any) {
    if (isAxiosNetworkError(err)) {
      return axiosNwErrorResponse();
    }

    if (err.response?.data) {
      const resp = err.response.data;
      console.log(resp);

      return {
        httpCode: resp.status_code,
        success: false,
        message: resp.errors,
      };
    }

    return {
      success: false,
      httpCode: 500,
      message: "Profile update Failed",
    };
  }
};
