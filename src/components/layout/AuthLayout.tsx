import useAuthStore from "../../store/useAuthStore";
import { Navigate } from "react-router";
import { Outlet } from "react-router";

const AuthLayout = () => {
    const { isAuthenticated } = useAuthStore();

    return isAuthenticated ? (
        <Navigate to="/" replace />
    ) : (
        <div
            className="h-screen flex w-full justify-center bg-neutral-50"
        >
            <div className="w-[600px] ld:w-full flex flex-col  items-start p-6">
                <Outlet />
            </div>
            <div className="hidden lg:flex flex-1 w-full max-h-full relative bg-cream flex-col">
                <img
                    src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1896&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="background"
                    loading="lazy"
                    className="absolute w-full h-full object-cover object-left"
                />
            </div>
        </div>
    );
}

export default AuthLayout