import { createContext, useContext, useEffect, useState } from "react";
import { useCasesAuth } from "../../../application/auth/useCasesAuth";
import { Router } from "next/router";

export const SessionContext = createContext<any>({});

export function useAuthSession() {
  return useContext(SessionContext);
}

export const AuthSessionProvider = ({ children }) => {
  const [status, setStatus] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");

  const {
    useCaseSignIn,
    authUser,
    authStatus,
    useCaseSignInWithGoogle,
    useGetToken,
    useCaseSignUp,
    useCaseSignOut,
    useCaseForgotPassword,
  } = useCasesAuth();

  useEffect(() => {
    setStatus("loading");
    if (authUser) {
      setStatus("authenticated");
    } else {
      setStatus("unauthenticated");
    }
  }, [authUser]);

  return (
    <SessionContext.Provider
      value={{
        signIn: useCaseSignIn,
        signOut: useCaseSignOut,
        signUp: useCaseSignUp,
        authUser,
        authStatus,
        signInWithGoogle: useCaseSignInWithGoogle,
        token: useGetToken(),
        forgotPassword: useCaseForgotPassword,
        status,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
