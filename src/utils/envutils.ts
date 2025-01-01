export const getEnv = (key: string, defaultValue: string): string => {
  const processEnv = typeof process !== "undefined" && process.env[key];

  if (processEnv) {
    return processEnv;
  }

  const windowEnv = window.env && window.env[key];

  if (windowEnv) {
    return windowEnv;
  }

  return defaultValue;
};
