import { Link } from "react-router"
import { AdminRoutes } from "../../../constants/AdminRoutes"
import SidebarItem from "./SidebarItem"
import { Button } from "antd"
import { LogoutOutlined } from "@ant-design/icons"
import useAuthStore from "../../../store/useAuthStore"

const Sidebar = () => {
    const { logout } = useAuthStore();

    const handleLogout = () => {
        logout();
    }

    return (
        <div
            className="h-full border-r border-gray-300 flex flex-col overflow-y-auto bg-neutral-50 shadow-sm"
        >
            <div className="p-6 py-4 border-b border-gray-300">
                <Link to="/">
                    <span className="text-xl font-bold text-blue-800">Society Portal</span>
                </Link>
            </div>


            <div className="flex flex-1 flex-col w-full">
                {AdminRoutes.map(route => (
                    <SidebarItem
                        key={route.href}
                        icon={route.icon}
                        label={route.label}
                        href={route.href}
                    />
                ))}
            </div>
            <div className="p-6 py-4 border-t border-gray-300">
                <Button
                    onClick={handleLogout}
                    icon={<LogoutOutlined className="font-semibold" />}
                    className="w-full bg-[#010107]"
                    style={{
                        backgroundColor: "#010107",
                        color: "white",
                        fontWeight: 600,
                    }}
                >
                    Logout
                </Button>
            </div>
        </div>
    )
}

export default Sidebar