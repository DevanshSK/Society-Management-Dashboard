import { Button, DatePicker, Drawer, Form, Input, notification, Select, Space, Switch } from "antd";
import useFlatStore from "../../../../store/useFlatStore";
import useMaintenanceStore from "../../../../store/useMaintainenceStore";
import type { MaintenanceTransaction } from "../../../../types";
import { v4 as uuid } from 'uuid';
import { useEffect } from "react";
import type { DefaultOptionType } from "antd/es/select";
import dayjs from "dayjs";

const AddMaintainenceDrawer = () => {
    const {
        addOpen,
        setAddOpen,
        // maintenances,
        addMaintenance,
        isEditing,
        editingMaintenance,
        updateMaintenance,
        setEditingMaintenance,
    } = useMaintenanceStore();
    const { flats } = useFlatStore();
    const [form] = Form.useForm();

    const closeDrawer = () => {
        setAddOpen(false);
        form.resetFields();
    }

    const handleSubmit = (values: Omit<MaintenanceTransaction, "id">) => {
        const amount = Number(values.amount);
        if (isNaN(amount) || amount <= 0) {
            notification.error({ message: "Please enter a valid amount" });
            return;
        }

        // Format dates
        const formattedValues = {
            ...values,
            amount,
            month: dayjs(values.month).format("YYYY-MM"),
            paymentDate: values.paymentDate ? dayjs(values.paymentDate).format("YYYY-MM-DD") : undefined,
        };

        console.log("Submitting maintenance transaction:", formattedValues);

        if (isEditing && editingMaintenance) {
            const updatedMaintainence: MaintenanceTransaction = { ...editingMaintenance, ...formattedValues };
            updateMaintenance(updatedMaintainence.id, updatedMaintainence);
            notification.success({ message: "Maintainence updated successfully" });
        } else {
            const newTransaction: MaintenanceTransaction = { ...formattedValues, id: uuid(), };
            addMaintenance(newTransaction);
            notification.success({
                message: "Maintainence successfully added",
            });
        }
        closeDrawer();
    }

    const paid = Form.useWatch('paid', form);

    useEffect(() => {
        if (!paid) {
            form.setFieldValue("paymentMethod", null);
            form.setFieldValue("paymentDate", null);
        }
    }, [paid, form]);

    useEffect(() => {
        if (addOpen && isEditing && editingMaintenance) {
            const formValues = {
                ...editingMaintenance,
                month: dayjs(editingMaintenance.month),
                paymentDate: editingMaintenance.paymentDate ? dayjs(editingMaintenance.paymentDate) : null,
            };
            form.setFieldsValue(formValues);
        }

        if (!addOpen) {
            form.resetFields();
            setEditingMaintenance(null);
        }
    }, [addOpen, isEditing, form, setEditingMaintenance, editingMaintenance]);


    const flatOptions: DefaultOptionType[] = flats
        .filter(flat => flat.occupied)
        .map(flat => ({ value: flat.id, label: `# ${flat.flatNo} - ${flat.ownerName}` }));


    return (
        <>
            <Drawer
                title={isEditing ? "Update Transaction" : "Add Transaction"}
                width={500}
                onClose={closeDrawer}
                open={addOpen}
                styles={{
                    body: {
                        paddingBottom: 80,
                    }
                }}
                extra={
                    <Space>
                        <Button onClick={closeDrawer}>Cancel</Button>
                        <Button
                            onClick={() => {
                                form.submit();
                            }}
                            type="primary"
                            style={{
                                backgroundColor: "#010107",
                            }}
                        >
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Amount"
                        name="amount"
                        rules={[
                            { required: true, message: 'Please input the amount!' },
                            {
                                validator: (_, value) => {
                                    const num = Number(value);
                                    if (isNaN(num) || num <= 0) {
                                        return Promise.reject("Please enter a valid number greater than 0");
                                    }
                                    return Promise.resolve();
                                }
                            },
                        ]}
                    >
                        <Input
                            prefix="₹"
                            type="number"
                            min={0}
                            step={0.01}
                            placeholder="Enter Amount"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Month"
                        name="month"
                        rules={[
                            { required: true, message: 'Please select the month!' },
                        ]}
                    >
                        <DatePicker
                            picker="month"
                            allowClear={false}
                            format="MMMM YYYY"
                            className="w-full"
                        // disabledDate={(current) => {
                        //     // Disable Future Months
                        //     return current && current > dayjs().endOf('month');
                        // }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Owner's Flat"
                        name="flatId"
                        rules={[{ required: true, message: 'Please select the owner flat!' }]}
                    >
                        <Select
                            placeholder="Select Owner's Flat"
                            showSearch
                            options={flatOptions}
                            optionFilterProp="label"
                            filterOption={(input, option) =>
                                (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        label="Payment Method"
                        name="paymentMethod"
                        rules={[
                            {
                                required: paid,
                                message: 'Please select payment method when marked as paid!'
                            }
                        ]}
                    >
                        <Select
                            placeholder="Select payment type"
                            disabled={!paid}
                        >
                            <Select.Option value="UPI">UPI</Select.Option>
                            <Select.Option value="Cash">Cash</Select.Option>
                            <Select.Option value="Card">Card</Select.Option>
                            <Select.Option value="Bank Transfer">Bank Transfer</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Payment Date"
                        name="paymentDate"
                        rules={[
                            {
                                required: paid,
                                message: 'Please select payment date when marked as paid!'
                            }
                        ]}
                    >
                        <DatePicker
                            disabled={!paid}
                            picker="date"
                            allowClear={false}
                            format="DD MMMM YYYY"
                            className="w-full"
                            disabledDate={(current) => {
                                // Disable future dates
                                return current && current > dayjs().endOf('day');
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Paid"
                        name="paid"
                        valuePropName="checked"
                        initialValue={false}
                    >
                        <Switch checkedChildren="Yes" unCheckedChildren="No" />
                    </Form.Item>
                    <Form.Item
                        label="Notes"
                        name="notes"
                        rules={[
                            {
                                max: 500,
                                message: 'Notes cannot exceed 500 characters!'
                            }
                        ]}
                    >
                        <Input.TextArea
                            placeholder="Enter additional notes..."
                            maxLength={500}
                            showCount
                        />
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    )
}

export default AddMaintainenceDrawer;