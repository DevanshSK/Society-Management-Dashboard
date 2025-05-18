import { Button, Spin } from "antd";
import useMaintenanceStore from "../../store/useMaintainenceStore"
import { PlusOutlined } from "@ant-design/icons";
import MaintainenceTable from "../../components/dashboard/maintainence/maintainence-table/MaintainenceTable";
import AddMaintainenceDrawer from "../../components/dashboard/maintainence/add-maintainence-drawer/AddMaintainenceDrawer";

const MaintainencePage = () => {
    const { loading, setAddOpen } = useMaintenanceStore();

    return (
        <div className="min-h-screen p-4 pt-[77px] sm:p-6 sm:pt-[85px] bg-neutral-100">
            <div className="max-w-3xl">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-2xl sm:text-3xl font-semibold">Maintainence Management</h1>
                    <Button
                        onClick={() => setAddOpen(true)}
                        type="primary"
                        style={{
                            backgroundColor: "#010107"
                        }}
                        icon={<PlusOutlined />}
                    >
                        Add new Transaction
                    </Button>
                </div>
                <MaintainenceTable />
                <AddMaintainenceDrawer />
                <Spin
                    fullscreen
                    spinning={loading}
                />
            </div>
        </div>
    )
}

export default MaintainencePage