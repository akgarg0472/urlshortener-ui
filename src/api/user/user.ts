import {
  DASHBOARD_DELETE_PROFILE_API_URL_V1,
  DASHBOARD_GET_PROFILE_API_URL_V1,
  DASHBOARD_UPDATE_PASSWORD_API_URL_V1,
  DASHBOARD_UPDATE_PROFILE_API_URL_V1,
} from "../../api.endpoint.constants";
import { getEnv } from "../../utils/envutils";
import {
  axiosNwErrorResponse,
  isAxiosNetworkError,
} from "../../utils/errorutils";
import { axiosInstance } from "../base";
import {
  DeleteProfileResponse,
  GetProfileResponse,
  UpdatePasswordResponse,
  UpdateProfileResponse,
} from "./user.api.response";

export const getProfile = async (
  userId: string,
  authToken: string
): Promise<GetProfileResponse> => {
  const url =
    getEnv("REACT_APP_BACKEND_BASE_URL", "http://127.0.0.1:8765") +
    DASHBOARD_GET_PROFILE_API_URL_V1.replace("$profileId", userId);

  try {
    const apiResponse = await axiosInstance.get(url, {
      headers: {
        "X-USER-ID": userId,
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = apiResponse.data.data;

    return {
      httpCode: apiResponse.status,
      success: apiResponse.data.status_code === 200,
      id: data.id,
      email: data.email,
      name: data.name,
      bio: data.bio,
      profile_picture: data.profile_picture,
      phone: data.phone,
      city: data.city,
      state: data.state,
      country: data.country,
      zipcode: data.zipcode,
      last_login: data.last_login,
      last_password_changed: data.last_password_changed,
      premium_account: data.premium_account,
      business_details: data.business_details,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };
  } catch (err: any) {
    return errResp(err, "Error Fetching Profile");
  }
};

export const updateProfile = async (
  userId: string,
  updateRequest: UpdateProfileRequest,
  authToken: string
): Promise<UpdateProfileResponse> => {
  const url =
    getEnv("REACT_APP_BACKEND_BASE_URL", "http://127.0.0.1:8765") +
    DASHBOARD_UPDATE_PROFILE_API_URL_V1.replace("$profileId", userId);

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

    const response = await axiosInstance.patch(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-USER-ID": userId,
        Authorization: `Bearer ${authToken}`,
      },
    });

    return {
      httpCode: response.status,
      success: response.data.status_code === 200,
      message: response.data.message,
    };
  } catch (err: any) {
    return errResp(err, "Profile updation Failed");
  }
};

export const updatePassword = async (
  profileId: string,
  request: UpdatePasswordRequest,
  authToken: string
): Promise<UpdatePasswordResponse> => {
  const url =
    getEnv("REACT_APP_BACKEND_BASE_URL", "http://127.0.0.1:8765") +
    DASHBOARD_UPDATE_PASSWORD_API_URL_V1.replace("$profileId", profileId);

  try {
    const body = {
      current_password: request.currentPassword,
      new_password: request.newPassword,
      confirm_password: request.confirmPassword,
    };

    const updatePasswordResp = await axiosInstance.patch(url, body, {
      headers: {
        "X-USER-ID": profileId,
        Authorization: `Bearer ${authToken}`,
      },
    });

    return {
      httpCode: updatePasswordResp.status,
      success: updatePasswordResp.data.status_code === 200,
      message: updatePasswordResp.data.message,
    };
  } catch (err: any) {
    return errResp(err, "Error updating password");
  }
};

export const deleteProfile = async (
  profileId: string
): Promise<DeleteProfileResponse> => {
  const url =
    getEnv("REACT_APP_BACKEND_BASE_URL", "http://127.0.0.1:8765") +
    DASHBOARD_DELETE_PROFILE_API_URL_V1.replace("$profileId", profileId);

  try {
    const deleteResponse = await axiosInstance.delete(url);

    return {
      httpCode: deleteResponse.status,
      success: deleteResponse.data.status_code === 200,
      message: deleteResponse.data.message,
    };
  } catch (err) {
    return errResp(err, "Profile deletion Failed");
  }
};

const errResp = (err: any, defaultErrorMsg: string) => {
  if (isAxiosNetworkError(err)) {
    return axiosNwErrorResponse();
  }

  if (err.response?.data) {
    const resp = err.response.data;

    return {
      httpCode: resp.status_code,
      success: false,
      message: resp.errors,
    };
  }

  return {
    success: false,
    httpCode: 500,
    message: defaultErrorMsg,
  };
};
