import { SignUp } from "@clerk/clerk-react";
const Signup = () => {
  return (
    <div className="bg-[#262629] w-screen h-screen flex items-center justify-center">
      <SignUp signInUrl="/signin" fallbackRedirectUrl={"/blogs"} />
    </div>
  );
};
export default Signup;
