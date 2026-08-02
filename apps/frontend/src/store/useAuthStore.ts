import { create } from 'zustand';

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'USER' | 'PREMIUM' | 'ADMIN';
  subscriptionTier: 'FREE' | 'PRO' | 'ENTERPRISE';
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, accessToken: string) => void;
  logout: () => void;
  refreshSession: () => Promise<string>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  setAuth: (user, accessToken) => set({ user, accessToken, isAuthenticated: true }),
  logout: () => set({ user: null, accessToken: null, isAuthenticated: false }),
  refreshSession: async () => {
    // Session refresh logic placeholder
    const mockNewToken = 'rotated_access_token';
    set({ accessToken: mockNewToken });
    return mockNewToken;
  }
}));
