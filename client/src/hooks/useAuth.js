import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

/* Basic Hook to provide us with the value of auth 
that we are supposed get from AuthContext that
is shared across the app using AuthContext.Provider*/
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
