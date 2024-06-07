import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const { isSignedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn === false)
      return navigate("/signin", { state: { url: location.pathname } });
  }, []);

  return <Outlet />;
};

export default PrivateRoute;
