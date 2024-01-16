import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.post("/accounts/refresh/", undefined, {
        withCredentials: true,
      });
      console.log(response.data);
      setAuth((prev) => {
        // console.log(JSON.stringify(prev));
        // console.log(response.data);
        localStorage.setItem("_a", response.data.access);
        return { ...prev, access: response.data.access };
      });

      return response.data.access;
    } catch {
      return null;
      console.log(
        " no access token obtained from the server. likely the refresh token has expired."
      );
    }
  };
  return refresh;
};

// TODO: THIS LETS THE ACCESS TOKEN EXPIRE EVERY TIME THE USER REFRESHES THE PAGE, MAYBE FIND A BETTER WAY, OR KEEP FOR SECURITY: DEFINITELY USE SESSIONSTORAGE
export default useRefreshToken;
