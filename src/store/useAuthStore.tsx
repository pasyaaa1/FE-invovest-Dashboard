import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface RegisteredUser {
  nama: string;
  email: string;
  password: string;
  event: string;
  bio: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  registeredUsers: RegisteredUser[];
  register: (user: RegisteredUser) => void;
  login: (email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      registeredUsers: [],
      register: (user) =>
        set((state) => ({
          registeredUsers: [...state.registeredUsers, user],
        })),
      login: (email) => set({ isAuthenticated: true, user: email }),
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
