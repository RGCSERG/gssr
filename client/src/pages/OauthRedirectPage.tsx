import { useEffect } from "react";
import { useAuth } from "../contexts/OauthProviderContext";
import { useNavigate, useLocation } from "react-router-dom";

const OauthRedirectPage = () => {
  const { getUserData } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get("code");

  useEffect(() => {
    const setAccessToken = async () => {
      if (code) {
        getUserData(code);
      }
      navigate("/");
    };
    setAccessToken();
  }, [code]);

  return <div>OauthRedirectPage</div>;
};

export default OauthRedirectPage;
