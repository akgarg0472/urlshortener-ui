import {
  ActivePack,
  ActiveSubscription,
} from "../api/subscription/subs.api.response";

export type CachedActiveSubscriptionDetails = {
  subscription: ActiveSubscription;
  pack: ActivePack;
  expiry: number;
};

const activeSubscriptionKey: string = "activeSubscriptionDetals";

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

  const decryptedData: CachedActiveSubscriptionDetails =
    decryptActiveSubscriptionDetails(cachedValue, userId);

  if (decryptedData.expiry < Date.now()) {
    return null;
  }

  return decryptedData;
};

const decryptActiveSubscriptionDetails = (
  encryptedData: string,
  encryptionKey: string
): CachedActiveSubscriptionDetails => {
  const encryptedStr = atob(encryptedData);
  const decryptedData = xorDecrypt(encryptedStr, encryptionKey);
  return JSON.parse(decryptedData);
};

const xorEncrypt = (data: any, key: string) => {
  const keyLength = key.length;
  let encryptedData = "";
  for (let i = 0; i < data.length; i++) {
    encryptedData += String.fromCharCode(
      data.charCodeAt(i) ^ key.charCodeAt(i % keyLength)
    );
  }
  return encryptedData;
};

const xorDecrypt = (data: any, key: string) => {
  const keyLength = key.length;
  let decryptedData = "";

  for (let i = 0; i < data.length; i++) {
    decryptedData += String.fromCharCode(
      data.charCodeAt(i) ^ key.charCodeAt(i % keyLength)
    );
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
