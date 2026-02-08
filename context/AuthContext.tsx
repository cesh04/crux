import { onAuthStateChanged, User } from 'firebase/auth';
import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';
import { auth } from '../firebaseConfig'; // Your firebase config file

// 1. Define the shape of your context
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
}

// 2. Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
});

// 3. Create a custom hook to easily access the context
export const useAuth = () => {
  return useContext(AuthContext);
};

// 4. Create the Provider component that will wrap your app
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged listens for any auth changes (login/logout)
    // It returns an 'unsubscribe' function
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // If logged out, 'user' will be null
      setIsLoading(false); // We're done checking
    });

    // Cleanup: unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    isLoading,
  };

  // Provide the auth state to all child components
  // We don't render children until we're done loading
  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};