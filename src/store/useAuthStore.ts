import { create } from "zustand";
import { persist } from "zustand/middleware";
import { notification } from "antd";

interface AuthState {
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const useAuthStore = create<AuthState>()(
    persist((set) => ({
        isAuthenticated: false,
        loading: false,

        login: async (email, password) => {
            set({ loading: true });
            // Simulate an API call 
            await new Promise((resolve) => setTimeout(resolve, 400));

            if (email === "admin@gmail.com" && password === "admin123") {
                set({ isAuthenticated: true, loading: false });
                notification.success({
                    message: "Login Successful",
                    description: "Welcome back, Admin!",
                });
            } else {
                set({ isAuthenticated: false, loading: false });
                notification.error({
                    message: "Login Failed",
                    description: "Invalid email or password. Please try again.",
                });

            }
        },
        logout: () => {
            set({ isAuthenticated: false });
            notification.info({
                message: "Logged Out",
                description: "You have been logged out.",
            });
        }
    }),
        {
            name: "auth-storage",
            partialize: (state) => ({ isAuthenticated: state.isAuthenticated }),
        }
    )
);

export default useAuthStore;