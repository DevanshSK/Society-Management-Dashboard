import { Button, Input, Modal, Segmented, Table, Tag } from "antd";
import type { TableProps } from "antd";
import type { Flat } from "../../../../types";
import useFlatStore from "../../../../store/useFlatStore";
import { useId, useMemo, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";


const FlatTable = () => {
    const { flats, setEditingFlat, deleteFlat, setAddOpen } = useFlatStore();

    const id = useId();
    const [flatTypeFilter, setFlatTypeFilter] = useState<string>("all");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState<string>("");


    const handleFlatTypeChange = (value: string) => {
        setFlatTypeFilter(value);
    };

    const handleStatusChange = (value: string) => {
        setStatusFilter(value);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const handleResetFilters = () => {
        setFlatTypeFilter("all");
        setStatusFilter("all");
        setSearchQuery("");
    };

    const filteredData = useMemo(() => {
        return flats.filter(flat => {
            const matchesType = flatTypeFilter !== "all" ? flat.type === flatTypeFilter : true;
            const matchesStatus = statusFilter !== "all" ? flat.occupied === (statusFilter === "occupied") : true;
            const matchesSearch =
                searchQuery === "" ||
                flat.flatNo.toLowerCase().includes(searchQuery) ||
                (flat.ownerName?.toLowerCase().includes(searchQuery) ?? false);
            return matchesType && matchesStatus && matchesSearch;
        });
    }, [flats, flatTypeFilter, statusFilter, searchQuery]);

    const columns: TableProps<Flat>['columns'] = [
        {
            title: "Flat No",
            dataIndex: "flatNo",
            key: "flatNo",
            sorter: (a, b) => Number(a.flatNo) - Number(b.flatNo),
        },
        {
            title: "Flat Type",
            dataIndex: "type",
            key: "type",
            sorter: (a, b) => a.type.localeCompare(b.type),
            render: (type) => {
                let color = "yellow";

                if (type === "2BHK") {
                    color = "blue";
                }
                if (type === "3BHK") {
                    color = "green";
                }

                return (<Tag color={color} className="rounded-full">
                    {type}
                </Tag>)
            },
        },
        {
            title: "Flat Status",
            dataIndex: "occupied",
            key: "occupied",
            sorter: (a, b) => Number(b.occupied) - Number(a.occupied),
            render: (value) => {
                return (<Tag color={value ? "green" : "red"}>
                    {value ? "Occupied" : "Available"}
                </Tag>)
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
            }
        },
        {
            title: "Actions",
            render: (_, flat) => {
                return (
                    <div className="flex items-center gap-2">
                        <Button 
                            size="small" 
                            color="orange" 
                            variant="outlined"
                            onClick={() => {
                                setEditingFlat(flat);
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
                                    title: `Delete Flat ${flat.flatNo}`,
                                    content: "Are you sure you want to delete this flat?",
                                    okText: "Yes",
                                    okType: "danger",
                                    cancelText: "No",
                                    onOk: () => deleteFlat(flat.id),
                                });
                            }}
                        >
                            Delete
                        </Button>
                    </div>
                )
            }
        }
    ];

    return (
        <div
            className="mt-6"
        >
            {/* Filters */}
            <div className="my-4 flex flex-col md:flex-row flex-wrap gap-y-2 gap-x-4 items-start md:items-center">
                {/* Search Filter */}
                <div className="flex items-center w-full gap-4">
                    <Input
                        allowClear
                        placeholder="Flat No or Owner Name"
                        prefix={<SearchOutlined />}
                        onChange={handleSearchChange}
                        className="w-full md:w-1/3 flex-1"
                    />
                    <Button onClick={handleResetFilters}>Reset Filters</Button>

                </div>
                <div className="flex flex-wrap gap-y-2 gap-x-6">
                    <Segmented
                        shape="round"
                        id={`${id}-flat-filter`}
                        options={[
                            { label: "All", value: 'all' },
                            { label: "1 BHK", value: '1BHK' },
                            { label: "2 BHK", value: '2BHK' },
                            { label: "3 BHK", value: '3BHK' },
                        ]}
                        // defaultValue="all"
                        value={flatTypeFilter}
                        onChange={handleFlatTypeChange}
                    />
                    <Segmented
                        shape="round"
                        id={`${id}-status-filter`}
                        options={[
                            { label: "All", value: 'all' },
                            { label: "Occupied", value: 'occupied' },
                            { label: "Available", value: 'available' },
                        ]}
                        // defaultValue="all"
                        value={statusFilter}
                        onChange={handleStatusChange}
                    />
                </div>
            </div>
            {/* Filters */}

            <Table
                columns={columns}
                dataSource={filteredData}
                // dataSource={flats}
                pagination={{ pageSize: 6 }}
                scroll={{ x: 'max-content' }}
                rowKey="id"
                virtual
            />
        </div>
    )
}

export default FlatTable