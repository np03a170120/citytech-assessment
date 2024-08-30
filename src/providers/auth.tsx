import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getStoredUser, setStoredUser } from "../utils/localstorage";

export interface AuthContext {
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  user: { token: string; username: string } | null;
}

interface User {
  token: string;
  username: string;
}

const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getStoredUser());
  const isAuthenticated = !!user;

  const logout = useCallback(async () => {
    setStoredUser(null, null);
    setUser(null);
  }, []);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(" useAuth is not within an AuthProvider");
  }
  return context;
}
