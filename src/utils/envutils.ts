export const getEnv = (key: string, defaultValue: string): string => {
  const processEnv = process.env[key];

  if (process.env.NODE_ENV === "production") {
    if (processEnv) {
      return processEnv;
    } else {
      const windowEnv = window.env && window.env[key];

      if (windowEnv) {
        return windowEnv;
      }
    }
  }

  if (processEnv) {
    return processEnv;
  }

  return defaultValue;
};
