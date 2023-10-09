const validateString = (str: string | null | undefined): boolean => {
  if (str === null || str === undefined || str === "") {
    return false;
  }

  return true;
};

export { validateString };
