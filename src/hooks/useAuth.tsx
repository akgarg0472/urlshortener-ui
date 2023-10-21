const useAuth = () => {
  const setAuth = (authToken: string, userId: string): boolean => {
    try {
      const auth = {
        authToken,
        userId,
      };

      localStorage.setItem("auth", JSON.stringify(auth));
    } catch (error) {
      console.error(error);
      return false;
    }

    return true;
  };

  const isAuthenticated = () => {
    return getUserId() !== null;
  };

  const getUserId = (): string | null => {
    const auth: string | null = localStorage.getItem("auth");

    if (auth === null) {
      return null;
    }

    const _auth = JSON.parse(auth);
    return _auth.userId;
  };

  const logout = () => {
    localStorage.removeItem("auth");
    console.log("Logged out");
  };

  return { setAuth, isAuthenticated, getUserId, logout };
};

export default useAuth;
