
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id?: string;
  name: string;
  email: string;
  gender: string; // Changed from sexuality to gender
  token?: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  register: (userData: Omit<User, 'id' | 'token'>, password: string) => Promise<void>;
  setUser: (user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      register: async (userData, password) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // For this demo, we'll simulate a successful registration
          const mockUser: User = {
            ...userData,
            id: Math.random().toString(36).substr(2, 9),
            token: 'mock-jwt-token'
          };
          
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          set({ 
            user: mockUser, 
            isAuthenticated: true, 
            loading: false 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Registration failed', 
            loading: false 
          });
        }
      },
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      clearAuth: () => set({ user: null, isAuthenticated: false, error: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
