import { Button, Spin } from "antd";
import useVehicleStore from "../../store/useVehicleStore";
import { PlusOutlined } from "@ant-design/icons";
import VehicleTable from "../../components/dashboard/vehicles/vehicle-table/VehicleTable";
import AddVehicleDrawer from "../../components/dashboard/vehicles/add-vehicle/AddVehicleDrawer";

const VehiclePage = () => {
    const { loading, setAddOpen } = useVehicleStore();


    return (
        <div
            className="min-h-screen p-4 pt-[77px] sm:p-6 sm:pt-[85px] bg-neutral-100"
        >
            <div className="max-w-3xl">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-2xl sm:text-3xl font-semibold">Vehicle Management</h1>
                    <Button
                        onClick={() => setAddOpen(true)}
                        type="primary"
                        style={{
                            backgroundColor: "#010107"
                        }}
                        icon={<PlusOutlined />}
                    >
                        Add new Vehicle
                    </Button>
                </div>
                <VehicleTable />
                <AddVehicleDrawer />
                <Spin
                    fullscreen
                    spinning={loading}
                />
            </div>
        </div>
    )
}

export default VehiclePage