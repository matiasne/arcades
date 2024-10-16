import { useEffect, useState } from "react";
import { IAuthService } from "../domain/abstracts/auth.service";
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  deleteUser,
} from "firebase/auth";
import { User } from "../domain/user";
import { IAuthResponse } from "../domain/auth-response";
import { browserLocalPersistence } from "firebase/auth";

export function useFirebaseAuth(): IAuthService {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>(null);
  const [status, setStatus] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");

  let firebase_app = initializeApp(firebaseConfig);
  const auth = getAuth();

  const convertCodeToMessage = (code: string) => {
    let message = "";
    switch (code) {
      case "auth/email-already-in-use":
        message = "Email already in use";
        break;
      case "auth/weak-password":
        message = "Password is too weak";
        break;
      case "auth/invalid-email":
        message = "Invalid email";
        break;
      case "auth/user-not-found":
        message = "User not found";
        break;
      case "auth/wrong-password":
        message = "Invalid password";
        break;
      case "auth/too-many-requests":
        message = "Too many requests, try again later";
        break;
      case "auth/user-disabled":
        message = "User disabled";
        break;
      case "auth/network-request-failed":
        message = "Network request failed";
        break;
      default:
        message = "Invalid username or password";
        break;
    }
    return message;
  };

  const getToken = async (): Promise<string | null> => {
    const token = await auth.currentUser?.getIdToken(true);

    if (token) {
      setToken(token);
      localStorage.setItem("token", token);
      setStatus("authenticated");
      return token;
    }

    return null;
  };

  useEffect(() => {
    setStatus("loading");
    checkLogin();
  }, []);

  const checkLogin = () => {
    getToken().then((token) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          handleData(auth.currentUser);
        } else {
          //to check if token is expired
          console.log("Check if Token expired");

          await getToken();
        }
      });
    });
  };

  const handleData = (data?) => {
    if (data) {
      setStatus("authenticated");
      let userObject: User = {
        id: data.uid,
        name: data.displayName,
        email: data.email,
        image: data.photoURL,
        provider: "firebase",
        oauth_id: data.uid,
        isActive: false,
        username: data.email,
        isEmailPrivate: data.isEmailPrivate,
      };
      setUser(userObject);
    } else {
      setStatus("unauthenticated");
      setUser(null);
    }
  };

  const handleSignOut = () => {
    setStatus("loading");
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    auth
      .signOut()
      .then(function () {
        // Sign-out successful.
        setStatus("unauthenticated");
      })
      .catch(function (error) {
        // An error happened.
        setStatus("unauthenticated");
      });
  };

  return {
    user,
    status,
    async signIn(username: string, password: string): Promise<IAuthResponse> {
      try {
        const userCredentials: any = await signInWithEmailAndPassword(
          auth,
          username,
          password,
        );

        checkLogin();

        return {
          data: userCredentials.user,
          code: 200,
          message: "",
          errors: undefined,
        };
      } catch (e) {
        return {
          data: undefined,
          code: 500,
          message: convertCodeToMessage(e.code),
          errors: convertCodeToMessage(e.code),
        };
      }
    },

    async signInWithGoogle(): Promise<IAuthResponse> {
      const googleProvider = new GoogleAuthProvider();
      try {
        const result: any = await signInWithPopup(auth, googleProvider);

        handleData(result.user);
        return {
          data: result.user,
          code: 200,
          message: "",
          errors: undefined,
        };
      } catch (e) {
        return {
          data: "",
          code: 500,
          message: convertCodeToMessage(e.code),
          errors: convertCodeToMessage(e.code),
        };
      }
    },

    async signUp({
      email,
      password,
    }: {
      password: string;
      email: string;
    }): Promise<IAuthResponse> {
      try {
        const userCredentials: UserCredential =
          await createUserWithEmailAndPassword(auth, email, password);

        return {
          data: userCredentials.user,
          code: 200,
          message: "",
          errors: undefined,
        };
      } catch (e) {
        return {
          data: undefined,
          code: 500,
          message: convertCodeToMessage(e.code),
          errors: convertCodeToMessage(e.code),
        };
      }
    },
    async forgotPassword(email: string): Promise<IAuthResponse> {
      try {
        await sendPasswordResetEmail(auth, email);
        return {
          data: undefined,
          code: 200,
          message: "Email sent",
          errors: undefined,
        };
      } catch (error) {
        return {
          data: undefined,
          code: 500,
          message: error.message,
          errors: error.errors,
        };
      }
    },
    signOut() {
      handleSignOut();
    },

    getToken(): string | null {
      return token;
    },

    deleteSignedUser() {
      const user = auth.currentUser;
      if (user) {
        deleteUser(user)
          .then((data) => {
            //handleSignOut();
          })
          .catch((error) => {
            console.error("Error deleting user :", error);
          });
      } else {
        console.log("No user is currently signed in");
      }
    },
  };
}
