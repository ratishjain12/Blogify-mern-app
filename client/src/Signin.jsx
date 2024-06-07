import { SignIn } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";
const Signin = () => {
  const location = useLocation();
  return (
    <div className="bg-[#262629] w-screen h-screen flex items-center justify-center">
      <SignIn
        signUpUrl="/signup"
        fallbackRedirectUrl={location?.state?.url || "/blogs"}
      />
    </div>
  );
};
export default Signin;
