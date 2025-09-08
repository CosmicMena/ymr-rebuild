import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type AuthUser = {
  name?: string;
  email?: string;
};

type AuthContextValue = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('ymr_auth_user');
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  function login(nextUser: AuthUser) {
    setUser(nextUser);
    try {
      localStorage.setItem('ymr_auth_user', JSON.stringify(nextUser));
    } catch {
      // ignore
    }
  }

  function logout() {
    setUser(null);
    try {
      localStorage.removeItem('ymr_auth_user');
    } catch {
      // ignore
    }
  }

  const value = useMemo<AuthContextValue>(() => ({
    isAuthenticated: !!user,
    user,
    login,
    logout,
  }), [user]);

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}


