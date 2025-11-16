import { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface AuthState {
  token: string | null;
  user: { id: string; username: string; role: number } | null;
}

interface AuthContextValue extends AuthState {
  setAuth: (auth: AuthState) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthState['user']>(null);

  useEffect(() => {
    const t = localStorage.getItem('token');
    const u = localStorage.getItem('user');
    if (t) setToken(t);
    if (u) try { setUser(JSON.parse(u)); } catch {}
  }, []);

  const setAuth = (auth: AuthState) => {
    setToken(auth.token);
    setUser(auth.user);
    if (auth.token) localStorage.setItem('token', auth.token); else localStorage.removeItem('token');
    if (auth.user) localStorage.setItem('user', JSON.stringify(auth.user)); else localStorage.removeItem('user');
  };

  const logout = () => setAuth({ token: null, user: null });

  const value = useMemo(() => ({ token, user, setAuth, logout }), [token, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
