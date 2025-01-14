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
  id: string;
  name: string;
  features: string[];
  privileges: string[];
  default_pack: boolean;
};
