import { ApiResponse } from "../base";

export interface GetPublicApiKeyResponse extends ApiResponse {
  public_key: string;
}
