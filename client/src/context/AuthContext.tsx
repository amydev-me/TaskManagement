import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import buildClient from '../api/build-client';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean; 
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  getCurrentUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

   
  const getCurrentUser = async () => {
    try {
      const client = buildClient();
      const response = await client.get('/api/users/currentuser');
      
      if (response.data) {
        setUser(response.data.currentUser);
      } else {
        setUser(null);
      }
    } catch (error) { 
      setUser(null);
    } finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []); 

  return (
    <AuthContext.Provider value={{ user,isLoading, setUser, getCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
