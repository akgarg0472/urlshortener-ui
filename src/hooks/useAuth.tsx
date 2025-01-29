interface AuthObject {
  authToken: string;
  userId: string;
  email: string;
  name: string;
  loginType: string | null;
}

const AUTH_OBJ_NAME: string = "auth";

const useAuth = () => {
  const setAuth = (
    authToken: string,
    userId: string,
    email: string,
    name: string,
    loginType: string | null
  ): boolean => {
    try {
      const auth: AuthObject = {
        authToken,
        userId,
        email,
        name,
        loginType,
      };

      localStorage.setItem(AUTH_OBJ_NAME, JSON.stringify(auth));
    } catch {
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
    sessionStorage.clear();
  };

  const getName = (): string => {
    const auth: string | null = localStorage.getItem(AUTH_OBJ_NAME);

    if (!auth) {
      return "";
    }

    const _auth: AuthObject = JSON.parse(auth);
    return _auth.name;
  };

  const getEmail = (): string | null => {
    const auth: string | null = localStorage.getItem(AUTH_OBJ_NAME);

    if (!auth) {
      return null;
    }

    const _auth: AuthObject = JSON.parse(auth);
    return _auth.email;
  };

  const getLoginType = (): string | null => {
    const auth: string | null = localStorage.getItem(AUTH_OBJ_NAME);

    if (!auth) {
      return null;
    }

    const _auth: AuthObject = JSON.parse(auth);
    return _auth.loginType;
  };

  return {
    setAuth,
    getAuth,
    isUserLoggedIn,
    getUserId,
    logout,
    getName,
    getAuthToken,
    getEmail,
    getLoginType,
  };
};

export default useAuth;
