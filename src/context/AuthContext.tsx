import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { supabase } from "@/supbase-client";
import {
  Session,
  AuthError,
  AuthChangeEvent,
  AuthResponse,
} from "@supabase/supabase-js";

interface AuthContextType {
  session: Session | null;
  signUpNewUser: (
    email: string,
    password: string,
  ) => Promise<{
    success: boolean;
    data?: AuthResponse["data"];
    error?: AuthError;
  }>;
  signInUser: (
    email: string,
    password: string,
  ) => Promise<{
    success: boolean;
    data?: AuthResponse["data"];
    error?: string;
  }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const getInitialSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting initial session:", error.message);
      }

      setSession(session);
    };

    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUpNewUser = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password,
    });

    if (error) {
      console.error("Error signing up:", error.message);
      return { success: false, error };
    }

    return { success: true, data };
  };

  const signInUser = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase(),
      password,
    });

    if (error) {
      console.error("Sign-in error:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  };

  const signOut = async () => {
    setSession(null);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        signUpNewUser,
        signInUser,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UserAuth must be used within an AuthContextProvider");
  }
  return context;
};
