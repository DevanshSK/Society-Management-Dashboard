import { Button, Drawer, Form, Input, notification, Select, Space } from "antd";
import useVehicleStore from "../../../../store/useVehicleStore"
import type { Vehicle } from "../../../../types";
import { v4 as uuid } from 'uuid';
import { useEffect } from "react";
import useFlatStore from "../../../../store/useFlatStore";
import type { DefaultOptionType } from "antd/es/select";

const AddVehicleDrawer = () => {
    const {
        addOpen,
        setAddOpen,
        vehicles,
        addVehicle,
        isEditing,
        editingVehicle,
        updateVehicle,
        setEditingVehicle,
    } = useVehicleStore();
    const { flats } = useFlatStore();
    const [form] = Form.useForm();

    const closeDrawer = () => {
        setAddOpen(false);
        form.resetFields();
    }

    const handleSubmit = (values: Omit<Vehicle, "id">) => {
        if (isEditing && editingVehicle) {
            const updatedVehicle: Vehicle = { ...editingVehicle, ...values };
            updateVehicle(updatedVehicle.id, updatedVehicle);
            notification.success({ message: "Vehicle updated successfully" });
        } else {
            const newVehicle: Vehicle = { ...values, id: uuid(), };
            addVehicle(newVehicle);
            notification.success({
                message: "Vehicle successfully added",
            });
        }
        closeDrawer();
    }

    useEffect(() => {
        if (addOpen && isEditing && editingVehicle) {
            form.setFieldsValue(editingVehicle);
        }

        if (!addOpen) {
            form.resetFields();
            setEditingVehicle(null);
        }
    }, [addOpen, isEditing, editingVehicle, form, setEditingVehicle]);


    const flatOptions: DefaultOptionType[] = flats
        .filter(flat => flat.occupied)
        .map(flat => ({value: flat.id, label: `# ${flat.flatNo} - ${flat.ownerName}`}));



    return (
        <>
            <Drawer
                title={isEditing ? "Edit Vehicle" : "Add new Vehicle"}
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
                        label="Vehicle Number"
                        name="vehicleNo"
                        rules={[
                            { required: true, message: 'Please enter the vehicle number!' },
                            {
                                validator: (_, value) => {
                                    if (isEditing) return Promise.resolve();
                                    const exists = vehicles.some(vehicle => vehicle.vehicleNo.toLowerCase() === value?.toLowerCase());
                                    return exists
                                        ? Promise.reject('Vehicle number already exists!')
                                        : Promise.resolve();
                                }
                            }
                        ]}
                    >
                        <Input placeholder="e.g. MH12AB1234" />
                    </Form.Item>
                    <Form.Item
                        label="Vehicle Type"
                        name="type"
                        rules={[{ required: true, message: 'Please select the vehicle type!' }]}
                    >
                        <Select placeholder="Select type">
                            <Select.Option value="Bike">Bike</Select.Option>
                            <Select.Option value="Car">Car</Select.Option>
                        </Select>
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
                </Form>
            </Drawer>
        </>
    )
}

export default AddVehicleDrawer