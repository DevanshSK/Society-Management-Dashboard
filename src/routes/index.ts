import { createBrowserRouter } from 'react-router';
import Home from '../pages/home/Home';
import Login from '../pages/auth/Login';
import AuthLayout from '../components/layout/AuthLayout';
import DashboardLayout from '../components/layout/DashboardLayout';
import FlatPage from '../pages/flats/FlatPage';
import VehiclePage from '../pages/vehicles/VehiclePage';

const router = createBrowserRouter([
    {
        path: "/",
        Component: DashboardLayout,
        children: [
            { index: true, Component: Home },
            { path: "flats", Component: FlatPage },
            { path: "vehicles", Component: VehiclePage },
            { path: "maintainence", Component: Home },
        ]
    },
    {
        Component: AuthLayout,
        children: [
            { index: true, Component: Login, path: "/login" },
        ]
    },
]);

export default router;