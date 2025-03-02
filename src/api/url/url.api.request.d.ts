interface GenerateUrlRequest {
  userId: string;
  originalUrl: string;
  customAlias: string | null;
  expirationTime: number | null;
}
