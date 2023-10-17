import { createContext, useState } from 'react';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {}
});

function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);

  function authenticate(token) {
    setToken(token);
  }

  function logout() {
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        authenticate,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
