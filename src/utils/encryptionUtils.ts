export const xorEncrypt = (data: string, key: string) => {
  const keyLength = key.length;
  let encryptedData = "";
  for (let i = 0; i < data.length; i++) {
    encryptedData += String.fromCharCode(
      data.charCodeAt(i) ^ key.charCodeAt(i % keyLength)
    );
  }
  return encryptedData;
};

export const xorDecrypt = (data: string, key: string) => {
  const keyLength = key.length;
  let decryptedData = "";

  for (let i = 0; i < data.length; i++) {
    decryptedData += String.fromCharCode(
      data.charCodeAt(i) ^ key.charCodeAt(i % keyLength)
    );
  }

  return decryptedData;
};
