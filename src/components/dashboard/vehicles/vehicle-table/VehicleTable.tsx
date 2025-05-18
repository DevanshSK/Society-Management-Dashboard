import { useId, useMemo, useState } from "react";
import useVehicleStore from "../../../../store/useVehicleStore"
import type { MergedVehicle } from "../../../../types";
import { Button, Input, Modal, Segmented, Table, Tag, type TableProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import useFlatStore from "../../../../store/useFlatStore";
import { toVehicle } from "../../../../lib/helpers";


const VehicleTable = () => {
    const { vehicles, setEditingVehicle, deleteVehicle, setAddOpen } = useVehicleStore();
    const { flats } = useFlatStore();

    const id = useId();
    const [vehicleTypeFilter, setVehicleTypeFilter] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleVehicleTypeChange = (value: string) => {
        setVehicleTypeFilter(value);
    }

    const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value.toLowerCase());
    }

    const handleResetFilters = () => {
        setVehicleTypeFilter("all");
        setSearchQuery("");
    }

    const filteredData: MergedVehicle[] = useMemo(() => {
        return vehicles
            .map(vehicle => {
                const flat = flats.find(f => f.id === vehicle.flatId);
                return {
                    ...vehicle,
                    flatNo: flat?.flatNo ?? null,
                    ownerName: flat?.ownerName ?? null,
                };
            })
            .filter(vehicle => {
                const matchesType = vehicleTypeFilter !== 'all' ? vehicle.type === vehicleTypeFilter : true;
                const matchesSearch =
                    searchQuery === "" ||
                    // vehicle.flatId.toLowerCase().includes(searchQuery) ||
                    vehicle.vehicleNo.toLowerCase().includes(searchQuery) ||
                    (vehicle.ownerName?.toLowerCase().includes(searchQuery) ?? false) ||
                    (vehicle.flatNo?.toLowerCase().includes(searchQuery) ?? false);

                return matchesType && matchesSearch;
            })
    }, [searchQuery, vehicleTypeFilter, vehicles, flats]);



    const columns: TableProps<MergedVehicle>['columns'] =
            [
                {
                    title: "Vehicle No",
                    dataIndex: "vehicleNo",
                    key: "vehicleNo",
                },
                {
                    title: "Flat No",
                    dataIndex: "flatNo",
                    key: "flatNo",
                    sorter: (a, b) => Number(a.flatNo) - Number(b.flatNo),
                },
                {
                    title: "Vehicle Type",
                    dataIndex: "type",
                    key: "type",
                    sorter: (a, b) => a.type.localeCompare(b.type),
                    render: (type) => {
                        return (
                            <Tag color={type === "Bike" ? "blue" : "green"}>
                                {type}
                            </Tag>
                        )
                    },
                },
                {
                    title: "Owner Name",
                    dataIndex: "ownerName",
                    key: "ownerName",
                    sorter: (a, b) => (a.ownerName || "").localeCompare(b.ownerName || ""),
                    render: (value) => {
                        return (
                            <span>{value || "---"}</span>
                        )
                    },
                },
                {
                    title: "Actions",
                    render: (_, vehicle) => {
                        return (
                            <div className="flex items-center gap-2">
                                <Button
                                    size="small"
                                    color="orange"
                                    variant="outlined"
                                    onClick={() => {
                                        setEditingVehicle(toVehicle(vehicle));
                                        setAddOpen(true);
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    size="small"
                                    color="danger"
                                    variant="outlined"
                                    onClick={() => {
                                        Modal.confirm({
                                            title: `Delete Vehicle ${vehicle.vehicleNo}`,
                                            content: "Are you sure you want to delete this vehicle?",
                                            okText: "Yes",
                                            okType: "danger",
                                            cancelText: "No",
                                            onOk: () => deleteVehicle(vehicle.id),
                                        });
                                    }}
                                >
                                    Delete
                                </Button>
                            </div>
                        )
                    }
                },

            ]

    return (
        <div className="mt-6">
            {/* Filters */}
            <div className="my-4 flex flex-col md:flex-row flex-wrap gap-y-2 gap-x-4 items-start md:items-center">
                {/* Search Filter */}
                <div className="flex items-center w-full gap-4">
                    <Input
                        allowClear
                        placeholder="Vehicle No / Flat No / Owner Name"
                        prefix={<SearchOutlined />}
                        onChange={handleSearchQueryChange}
                        className="w-full md:w-1/3 flex-1"
                    />
                    <Button onClick={handleResetFilters}>Reset Filters</Button>
                </div>
                <div className="flex flex-wrap gap-y-2 gap-x-6 items-baseline">
                    <span>Vehicle Type: </span>
                    <Segmented
                        shape="round"
                        id={`${id}-vehicle-filter`}
                        options={[
                            { label: "All", value: "all" },
                            { label: "Car", value: "Car" },
                            { label: "Bike", value: "Bike" },
                        ]}
                        value={vehicleTypeFilter}
                        onChange={handleVehicleTypeChange}
                    />
                </div>
            </div>
            {/* Filters */}

            <Table
                columns={columns}
                dataSource={filteredData}
                pagination={{ pageSize: 6 }}
                scroll={{ x: 'max-content' }}
                rowKey="id"
            />
        </div>
    )
}

export default VehicleTable