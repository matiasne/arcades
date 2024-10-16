import { User } from "../user";
import { IAuthResponse } from "../auth-response";

export abstract class IAuthService {
  abstract signIn(username: string, password: string): Promise<IAuthResponse>;
  abstract signInWithGoogle(): Promise<IAuthResponse>;
  abstract signUp({
    email,
    password,
  }: {
    password: string;
    email: string;
  }): Promise<IAuthResponse>;
  abstract signOut();
  abstract forgotPassword(email: string): Promise<IAuthResponse>;
  abstract getToken(): string | null;
  abstract deleteSignedUser();
  status: "loading" | "authenticated" | "unauthenticated";
  user: User | null;
}
