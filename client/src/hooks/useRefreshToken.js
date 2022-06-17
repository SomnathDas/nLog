import axios from "../api/axios";
import useAuth from "./useAuth";

/* Basic hook to get new access token*/
const useRefreshToken = () => {
  const { setAuth } = useAuth();

  /* function to be called when access token is expired then
   it will refresh -> get a new token */
  const refresh = async () => {
    const response = await axios.get("/api/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      return {
        ...prev,
        accessToken: response.data.token,
        username: response.data.username,
        id: response.data.id,
      };
    });
    return response.data.token;
  };
  return refresh;
};

export default useRefreshToken;
