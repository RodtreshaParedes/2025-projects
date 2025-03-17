import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

import { useRouter } from "next/router";
import { useState, useEffect, useMemo, useContext, createContext } from "react";
import { auth } from "../firebase";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

interface IAuth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => clearTimeout(timer); // Cleanup function to prevent memory leaks
    }
  }, [error]);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          setLoading(false);
        } else {
          setUser(null);
          setLoading(true);
          router.push("/login");
        }

        setInitialLoading(false);
      }),
    [auth],
  );

  const signUp = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.push("/");
      })
      .catch((error) => {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      })
      .finally(() => setLoading(false));
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.push("/");
      })
      .catch((error) => {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      })
      .finally(() => setLoading(false));
  };

  const logout = async (): Promise<void> => {
    setLoading(true);

    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      })
      .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(
    () => ({
      user,
      signUp,
      signIn,
      loading,
      logout,
      error,
    }),
    [user, loading, error],
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && (
        <>
          {error && (
            <div className="fixed left-1/2 top-5 z-50 w-[90%] max-w-lg -translate-x-1/2 transform">
              <Alert
                variant="destructive"
                className="relative w-[90%] max-w-md rounded-lg border border-white/30 bg-white/20 p-4 shadow-lg backdrop-blur-md"
              >
                <Terminal className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          )}
          {children}
        </>
      )}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
