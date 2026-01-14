import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      localStorage.setItem("token", token);

      const decodetoken = jwtDecode(token);
      if (decodetoken.role === "ROLE_CUSTOMER") navigate("/user/dashboard");
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  }, [location, navigate]);

  return <div>Processing Authentication from google...</div>;
};

export default AuthSuccess;
