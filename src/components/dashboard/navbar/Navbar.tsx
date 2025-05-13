import { MenuOutlined } from "@ant-design/icons"
import { Drawer } from 'antd';
import Sidebar from "../sidebar/Sidebar";
import useSidebarStore from "../../../store/useSidebarStore";

const Navbar = () => {
    const { open, showDrawer, closeDrawer } = useSidebarStore();

    return (
        <div className="px-4 py-2 border-b border-gray-300 h-full flex items-center justify-between bg-neutral-50 shadow-sm">
            <div className="md:hidden pr-4 hover:opacity-75 transition">
                <MenuOutlined onClick={showDrawer} />

            </div>
            <Drawer
                open={open}
                closable={false}
                onClose={closeDrawer}
                styles={{
                    header: {
                        display: 'none',
                    },
                    body: {
                        padding: 0,
                    },
                }}
                width={250}
                placement="left"
                destroyOnHidden={true}
            >

                    <Sidebar />
            </Drawer>
            <div className="">
                <p>Welcome back, Admin</p>
            </div>
        </div>
    )
}

export default Navbar