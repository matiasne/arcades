import { useEffect } from "react";
import { useAuthSession } from "./SessionProvider";
import path from "path";

//check if you are on the client (browser) or server
const isBrowser = () => typeof window !== "undefined";

const ProtectedRoute = ({ router, children }) => {
  //Identify authenticated user
  const { authUser, authStatus } = useAuthSession();
  const isAuthenticated = authUser ? true : false;

  let unprotectedRoutes = ["/login", "/signup"];

  return children;
};

export default ProtectedRoute;
