import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";

import { useRouter } from "next/router";
import { useState, useEffect, useMemo, useContext, createContext } from "react";
import { auth } from "../firebase";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { FirebaseError } from "firebase/app";

interface IAuth {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  uploadProfileImage: (file: File) => Promise<string | null>;
  error: string | null;
  loading: boolean;
  navigateTo: (path: string) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuth | null>(null);

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
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(true);
        router.push("/login");
      }
      setInitialLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Upload Profile Image Function using Cloudinary
  const uploadProfileImage = async (file: File): Promise<string | null> => {
    if (!auth.currentUser) return null;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET!);
      formData.append(
        "cloud_name",
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
      );

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
      );

      const downloadURL = res.data.secure_url;
      await updateProfile(auth.currentUser, { photoURL: downloadURL });

      setUser({ ...auth.currentUser, photoURL: downloadURL });

      return downloadURL;
    } catch (error) {
      console.error("Failed to upload image:", error);
      return null;
    }
  };

  const signUp = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: `${firstName} ${lastName}` });
      router.push("/signup");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message || "An unknown error occurred.");
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setUser(userCredential.user);
      await router.push("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message || "An unknown error occurred.");
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    await router.push("/login");
    signOut(auth)
      .then(() => setUser(null))
      .catch((error) =>
        setError(
          error instanceof Error ? error.message : "An unknown error occurred",
        ),
      )
      .finally(() => setLoading(false));
  };

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const resetPassword = async (email: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent! Check your inbox.");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to send password reset email.",
      );
    } finally {
      setLoading(false);
    }
  };

  const memoedValue = useMemo(
    () => ({
      user,
      setUser,
      signUp,
      signIn,
      logout,
      resetPassword,
      uploadProfileImage,
      error,
      loading,
      navigateTo,
    }),
    [user, loading, error],
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
      {error && (
        <div className="fixed left-1/2 top-5 z-50 w-[90%] max-w-lg -translate-x-1/2 transform">
          <Alert
            variant="destructive"
            className="relative w-[90%] max-w-md rounded-lg border border-white/30 bg-white/20 p-4 text-red-700 shadow-lg backdrop-blur-md"
          >
            <Terminal className="h-4 w-4 text-red-700" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
