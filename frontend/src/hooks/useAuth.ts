import { useState } from 'react';

type User = {
  id: string;
  email: string;
  displayName?: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    // Authentication logic here
    setUser({ id: '1', email });
  };

  const logout = () => {
    setUser(null);
  };

  return { user, login, logout };
}