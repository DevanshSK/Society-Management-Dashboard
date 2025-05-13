import { Button, Spin } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import useFlatStore from "../../store/useFlatStore";
import FlatTable from "../../components/dashboard/flats/flat-table/FlatTable";
import AddFlatDrawer from "../../components/dashboard/flats/add-flat/AddFlatDrawer";

const FlatPage = () => {

    const { loading, setAddOpen } = useFlatStore();

    return (
        <div
            className="min-h-screen p-4 pt-[77px] sm:p-6 sm:pt-[85px] bg-neutral-100"
        >
            <div className="max-w-3xl">
                <div className=" flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-2xl sm:text-3xl font-semibold">Flats Management</h1>
                    <Button
                        onClick={() => setAddOpen(true)}
                        type="primary"
                        style={{
                            backgroundColor: "#010107"
                        }}
                        icon={<PlusOutlined />}
                    >
                        Add new Flat
                    </Button>
                </div>
                <FlatTable />
                <AddFlatDrawer />
                <Spin
                    fullscreen
                    spinning={loading}
                />
            </div>
        </div>
    )
}

export default FlatPage