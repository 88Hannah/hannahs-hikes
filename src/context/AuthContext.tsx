"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

interface CreateContextResult {
  user: User | null
}

export const AuthContext = createContext<null | CreateContextResult>(null);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContextProvider = ({ children } : AuthContextProviderProps) => {
  const [user, setUser] = useState<null | User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user) {
        setUser(user);
        console.log("There's been a change!")
        console.log(user)
      } else {
        setUser(null)
      }
      setLoading(false)
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <div>Loading ...</div> : children}
    </AuthContext.Provider>
  );
};