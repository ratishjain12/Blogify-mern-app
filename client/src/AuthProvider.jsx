import { useUser } from "@clerk/clerk-react";
import { createContext, useEffect, useState } from "react";

export const userContext = createContext({});

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const { user } = useUser();
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    setUserInfo(user);
  }, [user]);
  return (
    <userContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </userContext.Provider>
  );
};
