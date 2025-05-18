import { SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Empty, Input, Modal, Segmented, Table, Tag, type TableProps } from "antd"
import dayjs, { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import useMaintenanceStore from "../../../../store/useMaintainenceStore";
import useFlatStore from "../../../../store/useFlatStore";
import type { FlatMaintenanceSummary, MaintenanceTransaction } from "../../../../types";

const MaintainenceTable = () => {
    const [selectedMonth, setSelectedMonth] = useState<string>(dayjs().format("YYYY-MM"));
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [viewMode, setViewMode] = useState<'summary' | 'transactions'>('summary');
    const [selectedFlat, setSelectedFlat] = useState<string | null>(null);

    const { maintenances, getSummariesByMonth, setEditingMaintenance, setAddOpen, deleteMaintenance, } = useMaintenanceStore();
    const { getFlatById } = useFlatStore();

    const handleViewTransactions = (flatNo: string) => {
        setSelectedFlat(flatNo);
        setViewMode('transactions');
    };

    const handleBackToSummary = () => {
        setSelectedFlat(null);
        setViewMode('summary');
    };

    const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value.toLowerCase());
    }

    const handleMonthChange = (value: Dayjs | null) => {
        if (value && dayjs(value).isValid()) {
            setSelectedMonth(value.format("YYYY-MM"));
        }
    };

    const handleResetFilters = () => {
        setSelectedMonth(dayjs().format("YYYY-MM"));
        setSearchQuery("");
    };


    const filteredSummaries: FlatMaintenanceSummary[] = useMemo(() => {
        const result = getSummariesByMonth(selectedMonth)
            .filter(summary => {
                const flat = getFlatById(summary.flatId);
                if (!flat) return false;
                const matchesSearch =
                    searchQuery === "" ||
                    flat.flatNo.toLowerCase().includes(searchQuery) ||
                    (flat.ownerName?.toLowerCase().includes(searchQuery) ?? false);

                return matchesSearch;
            });

        return result;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getFlatById, searchQuery, selectedMonth, maintenances, getSummariesByMonth]);

    const filteredTransactions = useMemo(() => {
        return maintenances
            .filter(m => m.month === selectedMonth)
            .filter(tx => {
                const flat = getFlatById(tx.flatId);
                if (!flat) return false;

                if (selectedFlat && flat.flatNo !== selectedFlat) {
                    return false;
                }

                return searchQuery === "" ||
                    flat.flatNo.toLowerCase().includes(searchQuery) ||
                    (flat.ownerName?.toLowerCase().includes(searchQuery) ?? false);
            });
    }, [maintenances, selectedMonth, searchQuery, getFlatById, selectedFlat]);

    console.log("FILTRERED SUMMARIES", filteredSummaries);

    const handleEditTransaction = (transaction: MaintenanceTransaction) => {
        setEditingMaintenance(transaction);
        setAddOpen(true);
    };

    const handleDeleteTransaction = (transaction: MaintenanceTransaction) => {
        Modal.confirm({
            title: `Delete Transaction`,
            content: `Are you sure you want to delete this transaction of ₹${transaction.amount}?`,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk: () => deleteMaintenance(transaction.id),
        });
    };

    const summaryColumns: TableProps<FlatMaintenanceSummary>['columns'] = [
        {
            title: "Flat No",
            dataIndex: "flatNo",
            key: "flatNo",
            sorter: (a, b) => Number(a.flatNo) - Number(b.flatNo),
        },
        {
            title: "Owner Name",
            dataIndex: "ownerName",
            key: "ownerName",
            sorter: (a, b) => (a.ownerName || "").localeCompare(b.ownerName || ""),
        },
        {
            title: "Total Amount",
            dataIndex: "totalAmount",
            key: "totalAmount",
            render: (amount) => `₹${amount.toFixed(2)}`,
        },
        {
            title: "Status",
            dataIndex: "isFullyPaid",
            key: "status",
            render: (paid) => (
                <Tag color={paid ? "green" : "red"}>
                    {paid ? "Paid" : "Unpaid"}
                </Tag>
            ),
            sorter: (a, b) => Number(b.isFullyPaid) - Number(a.isFullyPaid),
        },
        {
            title: "Actions",
            render: (_, summary) => (
                <div className="flex items-center gap-2">
                    <Button
                        size="small"
                        onClick={() => handleViewTransactions(summary.flatNo as string)}
                    >
                        View Transactions
                    </Button>
                </div>
            )
        }
    ];

    const transactionColumns: TableProps<MaintenanceTransaction>['columns'] = [
        {
            title: "Flat No",
            key: "flatNo",
            render: (_, transaction) => {
                const flat = getFlatById(transaction.flatId);
                return flat?.flatNo || "-";
            },
            sorter: (a, b) => {
                const flatA = getFlatById(a.flatId);
                const flatB = getFlatById(b.flatId);
                return Number(flatA?.flatNo || 0) - Number(flatB?.flatNo || 0);
            },
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (amount) => `₹${amount.toFixed(2)}`,
            sorter: (a, b) => a.amount - b.amount,
        },
        {
            title: "Status",
            dataIndex: "paid",
            key: "paid",
            render: (paid) => (
                <Tag color={paid ? "green" : "red"}>
                    {paid ? "Paid" : "Unpaid"}
                </Tag>
            ),
            sorter: (a, b) => Number(b.paid) - Number(a.paid),
        },
        {
            title: "Payment Details",
            key: "paymentDetails",
            render: (_, record) => {
                if (!record.paid) {
                    return {
                        children: "N/A",
                        // props: {
                        //     colSpan: 0
                        // }
                    };
                }
                return (
                    <div className="text-sm">
                        <div>Paid on: {dayjs(record.paymentDate).format("DD MMM YYYY")}</div>
                        <div>Method: {record.paymentMethod}</div>
                    </div>
                );
            }
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, transaction) => (
                <div className="flex items-center gap-2">
                    <Button
                        size="small"
                        color="orange"
                        variant="outlined"
                        onClick={() => handleEditTransaction(transaction)}
                    >
                        Edit
                    </Button>
                    <Button
                        size="small"
                        danger
                        onClick={() => handleDeleteTransaction(transaction)}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div
            className="mt-4 sm:mt-6"
        >
            {/* Filters and Selector */}
            <div className="my-4 flex flex-col md:flex-row flex-wrap gap-y-2 gap-x-4 items-start md:items-center">
                {/* Date Filter */}
                <div className="flex items-center w-full gap-4 flex-wrap">
                    <DatePicker
                        picker="month"
                        allowClear={false}
                        value={dayjs(selectedMonth)}
                        onChange={handleMonthChange}
                        format="MMMM YYYY" // optional: show "May 2025" instead of "05/2025"
                        className="w-full sm:max-w-[150px]"
                    />

                    <Segmented
                        options={[
                            { label: 'Summary View', value: 'summary' },
                            { label: 'Transactions View', value: 'transactions' },
                        ]}
                        value={viewMode}
                        onChange={(value) => {
                            setViewMode(value as 'summary' | 'transactions');
                            if (value === 'summary') {
                                setSelectedFlat(null);
                            }
                        }}
                    />

                    <Button
                        onClick={handleResetFilters}
                    >
                        Reset Filters
                    </Button>
                </div>
                <div className="flex items-center w-full gap-4">
                    <Input
                        allowClear
                        placeholder="Flat No / Owner Name"
                        prefix={<SearchOutlined />}
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                        className="w-full md:w-1/3 flex-1"
                    />
                    {viewMode === 'transactions' && selectedFlat && (
                        <Button onClick={handleBackToSummary}>
                            Back to Summary
                        </Button>
                    )}
                </div>
            </div>
            {/* Filters and Selector */}


            {viewMode === "summary" ? (
                <Table
                    columns={summaryColumns}
                    dataSource={filteredSummaries}
                    pagination={{ pageSize: 6 }}
                    scroll={{ x: "max-content" }}
                    rowKey={"flatId"}
                    locale={{
                        emptyText: (
                            <Empty
                                description={`No records found for ${dayjs(selectedMonth).format("MMMM YYYY")}`}
                            />
                        ),
                    }}
                />
            ) : (
                <Table
                    columns={transactionColumns}
                    dataSource={filteredTransactions}
                    pagination={{ pageSize: 6 }}
                    scroll={{ x: "max-content" }}
                    rowKey={"id"}
                    expandable={{
                        expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.notes}</p>,
                        rowExpandable: (record) => Boolean(record.notes?.trim()),
                    }}
                    locale={{
                        emptyText: (
                            <Empty
                                description={`No records found for ${dayjs(selectedMonth).format("MMMM YYYY")}`}
                            />
                        ),
                    }}
                />
            )}

        </div>
    )
}

export default MaintainenceTable