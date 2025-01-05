interface GenerateUrlRequest {
  userId: string;
  originalUrl: string;
  authToken: string;
  expirationTime: number | null;
}
