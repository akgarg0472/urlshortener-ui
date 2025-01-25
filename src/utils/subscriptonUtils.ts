import {
  ActivePack,
  ActiveSubscription,
  SubscriptionPack,
  SubscriptionPackComparison,
} from "../api/subscription/subs.api.response";
import { xorDecrypt, xorEncrypt } from "./encryptionUtils";

const activeSubscriptionKey: string = "activeSubscriptionDetals";
const subscriptionPacksAndComparisonKey: string = "subscriptionPacksComparison";

export type CachedActiveSubscriptionDetails = {
  subscription: ActiveSubscription;
  pack: ActivePack;
  expiry: number;
};

export type CachedSubscriptionPacksAndComparison = {
  packs: SubscriptionPack[] | null;
  comparisons: SubscriptionPackComparison | null;
  expiry: number;
};

export const encryptActiveSubscriptionDetails = (
  subscription: ActiveSubscription,
  pack: ActivePack
): void => {
  const encryptionKey = subscription.user_id;

  const dataToEncrypt: CachedActiveSubscriptionDetails = {
    subscription: subscription,
    pack: pack,
    expiry: Date.now() + 60 * 1000,
  };

  const encryptedData = btoa(
    xorEncrypt(JSON.stringify(dataToEncrypt), encryptionKey)
  );

  sessionStorage.setItem(activeSubscriptionKey, encryptedData);
};

export const getCachedActiveSubscriptionDetails = (
  userId: string
): CachedActiveSubscriptionDetails | null => {
  const cachedValue = sessionStorage.getItem(activeSubscriptionKey);

  if (!cachedValue) {
    return null;
  }

  const decryptedData: CachedActiveSubscriptionDetails = JSON.parse(
    xorDecrypt(atob(cachedValue), userId)
  );

  if (decryptedData.expiry < Date.now()) {
    return null;
  }

  return decryptedData;
};

export const isDeviceMetricsAllowed = (pack: ActivePack | null): boolean => {
  if (!pack) {
    return false;
  }

  return pack.privileges.some(
    (privilege) =>
      privilege.includes("analytic") && privilege.includes("device")
  );
};

export const isGeographicalMetricsAllowed = (
  pack: ActivePack | null
): boolean => {
  if (!pack) {
    return false;
  }

  return pack.privileges.some(
    (privilege) =>
      privilege.includes("analytic") && privilege.includes("geograph")
  );
};

export const encryptSubscriptionPackAndComparison = (
  packs: SubscriptionPack[],
  comparisons: SubscriptionPackComparison | null,
  ttl: number
): void => {
  const dataToEncrypt: CachedSubscriptionPacksAndComparison = {
    packs: packs,
    comparisons: comparisons,
    expiry: Date.now() + ttl,
  };

  const encryptedData = btoa(
    xorEncrypt(JSON.stringify(dataToEncrypt), subscriptionPacksAndComparisonKey)
  );

  sessionStorage.setItem(subscriptionPacksAndComparisonKey, encryptedData);
};

export const getActiveSubscriptionPackId = (userId: string): string | null => {
  const data = getCachedActiveSubscriptionDetails(userId);
  return data ? data.pack.pack_id : null;
};

export const getCachedSubscriptionPacksAndComparison =
  (): CachedSubscriptionPacksAndComparison | null => {
    const cachedValue = sessionStorage.getItem(
      subscriptionPacksAndComparisonKey
    );

    if (!cachedValue) {
      return null;
    }

    const decryptedData: CachedSubscriptionPacksAndComparison = JSON.parse(
      xorDecrypt(atob(cachedValue), subscriptionPacksAndComparisonKey)
    );

    if (decryptedData.expiry < Date.now()) {
      return null;
    }

    return decryptedData;
  };
