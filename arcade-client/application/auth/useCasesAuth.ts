import { useEffect, useState } from "react";
import { User } from "../../domain/user";
import { useFirebaseAuth } from "../../services/auth-firebase.service";

export function useCasesAuth() {
  const {
    signIn,
    signUp,
    user,
    status,
    signInWithGoogle,
    getToken,
    forgotPassword,
    signOut,
    deleteSignedUser,
  } = useFirebaseAuth();

  const [authStatus, setAuthStatus] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");

  useEffect(() => {
    if (user) {
      if (status === "authenticated") {
        setAuthStatus("authenticated");
      }
    }
  }, [user]);

  const useCaseSignIn = async (
    email: string,
    password: string
  ): Promise<{
    data: User | null;
    code: number;
    message: string;
    errors: string[] | undefined;
  }> => {
    setAuthStatus("loading");
    const resp = await signIn(email, password);

    if (resp.code !== 200) {
      setAuthStatus("unauthenticated");
      return resp;
    }

    setAuthStatus("authenticated");
    return resp;
  };

  const useCaseSignInWithGoogle = async () => {
    setAuthStatus("loading");
    await signInWithGoogle();
    setAuthStatus("authenticated");
  };

  const useCaseSignUp = async ({
    email,
    password,
  }: {
    password: string;
    email: string;
  }): Promise<{
    data: User | null;
    code: number;
    message: string;
    errors: string[] | undefined;
  }> => {
    setAuthStatus("loading");
    const resp = await signUp({
      email,
      password,
    });

    if (resp.code !== 200) {
      return resp;
    }
    setAuthStatus("authenticated");
    resp.data = user;
    return resp;
  };

  const useCaseSignOut = async () => {
    await signOut();
  };

  const useGetToken = () => {
    return getToken();
  };

  const useDeleteSignedUser = () => {
    deleteSignedUser();
  };

  return {
    useCaseSignIn,
    useCaseSignInWithGoogle,
    useGetToken,
    useCaseSignUp,
    useCaseForgotPassword: forgotPassword,
    useCaseSignOut: useCaseSignOut,
    useCaseGetToken: getToken,
    authUser: user,
    authStatus: status,
    useDeleteSignedUser,
  };
}
