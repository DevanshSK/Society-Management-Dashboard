import { Navigate, Outlet } from "react-router";
import useAuthStore from "../../store/useAuthStore";
import Sidebar from "../dashboard/sidebar/Sidebar";
import Navbar from "../dashboard/navbar/Navbar";
import useFlatStore from "../../store/useFlatStore";
import { useEffect } from "react";
import useVehicleStore from "../../store/useVehicleStore";

const DashboardLayout = () => {
    const { isAuthenticated } = useAuthStore();
    const { loadFlats, resetFlats } = useFlatStore();
    const {loadVehicles, resetVehicles} = useVehicleStore();

    useEffect(() => {
        if(isAuthenticated){
            loadFlats();
            loadVehicles();
        }

        return () => {
            resetFlats();
            resetVehicles();
        }
    }, [isAuthenticated, loadFlats, resetFlats, loadVehicles, resetVehicles]);

    return isAuthenticated ? (
        <div
            className="h-full"
        >
            <div className="h-[61px] md:pl-56 fixed inset-y-0 w-full z-50">
            {/* <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50"> */}
                <Navbar />
            </div>
            <div className="hidden md:flex w-56 flex-col fixed inset-y-0 z-50">
                <Sidebar />
            </div>
            <main className="md:pl-56 h-full">
            {/* <main className="md:pl-56 pt-[61px] h-full"> */}
                <Outlet />
            </main>
        </div>
    ) : (
        <Navigate to="/login" replace />
    );
}

export default DashboardLayout