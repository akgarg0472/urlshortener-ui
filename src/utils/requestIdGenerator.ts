const BASE62_ALPHABET =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const BASE62_LENGTH = BASE62_ALPHABET.length;

let counter = 0;
const MAX_COUNTER = 9999;

const toBase62 = (num: number): string => {
  let encoded = "";
  while (num > 0) {
    encoded = BASE62_ALPHABET[num % BASE62_LENGTH] + encoded;
    num = Math.floor(num / BASE62_LENGTH);
  }
  return encoded || "0";
};

export const generateRequestId = (): string => {
  const timestampPart = toBase62(Date.now());
  counter = (counter + 1) % MAX_COUNTER;
  const counterPart = toBase62(counter).padStart(2, "0");
  const randomPart = toBase62(Math.floor(Math.random() * 62 ** 3));
  return `${timestampPart}${counterPart}${randomPart}`;
};
