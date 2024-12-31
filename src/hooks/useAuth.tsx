interface AuthObject {
  authToken: string;
  userId: string;
  email: string;
  name: string;
}

const AUTH_OBJ_NAME: string = "auth";

const useAuth = () => {
  const setAuth = (
    authToken: string,
    userId: string,
    email: string,
    name: string
  ): boolean => {
    try {
      const auth: AuthObject = {
        authToken,
        userId,
        email,
        name,
      };

      localStorage.setItem(AUTH_OBJ_NAME, JSON.stringify(auth));
    } catch (_: any) {
      return false;
    }

    return true;
  };

  const getAuth = (): AuthObject | null => {
    const auth: string | null = localStorage.getItem(AUTH_OBJ_NAME);

    if (auth === null) {
      return null;
    }

    const _auth: AuthObject = JSON.parse(auth);
    return _auth;
  };

  const isUserLoggedIn = () => {
    return getUserId() !== null;
  };

  const getUserId = (): string | null => {
    const auth: string | null = localStorage.getItem(AUTH_OBJ_NAME);

    if (auth === null) {
      return null;
    }

    const _auth: AuthObject = JSON.parse(auth);
    return _auth.userId;
  };

  const getAuthToken = () => {
    const auth: string | null = localStorage.getItem(AUTH_OBJ_NAME);

    if (auth === null) {
      return null;
    }

    const _auth: AuthObject = JSON.parse(auth);
    return _auth.authToken;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_OBJ_NAME);
  };

  const getName = (): string => {
    const auth: string | null = localStorage.getItem(AUTH_OBJ_NAME);

    if (!auth) {
      return "";
    }

    const _auth: AuthObject = JSON.parse(auth);
    return _auth.name;
  };

  return {
    setAuth,
    getAuth,
    isUserLoggedIn,
    getUserId,
    logout,
    getName,
    getAuthToken,
  };
};

export default useAuth;
