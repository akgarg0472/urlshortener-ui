interface GenerateUrlRequest {
  userId: string;
  originalUrl: string;
  authToken: string;
  customAlias: string | null;
  expirationTime: number | null;
}
