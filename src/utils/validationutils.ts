const validateString = (str: string | null | undefined): boolean => {
  if (str === null || str === undefined || str === "") {
    return false;
  }

  return true;
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

const validatePassword = (password: string): boolean => {
  return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password);
};

export { validateEmail, validatePassword, validateString };
