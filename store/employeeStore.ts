import { create } from "zustand";


// Define types
type UserRole = "admin" | "non-admin";

interface User {
  id: number;
  email: string;
  firstname: string | null;
  lastname: string | null;
  phone: string | null;
  isActive: boolean;
  isVerified: boolean;
  setupToken: string | null;
  tokenExpiration: string | null;
  userType: UserRole | null // Add other user types if needed
  createdAt: string; // ISO date string (e.g., "2025-03-05T09:59:25.614Z")
  updatedAt: string;
}






interface AppState {
  user: User | null;
  setUser: (user: Partial<User>) => void;
}

// Zustand store with DevTools middleware
const useStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) =>
    set(() => ({
      user: { ...user } as User, // Completely replace the old user
    })),
}));

export default useStore;
