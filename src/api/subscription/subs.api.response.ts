export type GetSubscriptionResponse = {
  success: boolean;
  httpCode: number;
  message: string;
  subscription: ActiveSubscription | null;
  pack: ActivePack | null;
};

export type getAllSubscriptionsResponse = {
  success: boolean;
  httpCode: number;
  message: string;
  subscriptions: ActiveSubscription[] | null;
};

export type ActiveSubscription = {
  subscription_id: string;
  user_id: string;
  activated_at: number;
  expires_at: number;
  status: string;
  pack_id: string;
};

export type ActivePack = {
  pack_id: string;
  pack_name: string;
  features: string[];
  privileges: string[];
  default_pack: boolean;
};

export type SubscriptionPack = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  validity: string;
  validity_duration: number;
  features: string[];
  selected: boolean;
  default_pack: boolean;
};

export type SubscriptionPackComparison = {
  headers: string[];
  rows: any[][];
};

export type GetSubscriptionPacksResponse = {
  httpCode: number;
  success: boolean;
  message?: string;
  packs: SubscriptionPack[] | null;
  comparisons: SubscriptionPackComparison | null;
  errors: any | null;
};
