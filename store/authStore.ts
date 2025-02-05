import { create } from "zustand";

interface AuthState {
  user: any | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  checkAuth: async () => {
    try {
      const res = await fetch("https://your-backend.com/api/auth/me", {
        credentials: "include", // Include cookies if used for authentication
      });

      if (!res.ok) throw new Error("Unauthorized");

      const userData = await res.json();
      set({ user: userData, loading: false });
    } catch (error) {
      set({ user: null, loading: false });
    }
  },

  login: async (email, password) => {
    const res = await fetch("https://your-backend.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!res.ok) throw new Error("Invalid credentials");

    const userData = await res.json();
    set({ user: userData, loading: false });
  },

  logout: async () => {
    await fetch("https://your-backend.com/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    set({ user: null });
  },
}));
