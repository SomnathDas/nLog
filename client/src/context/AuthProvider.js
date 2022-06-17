import { createContext, useState } from "react";

// Create a context that will be shared across the app
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  // Shared value across the app in the context
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
