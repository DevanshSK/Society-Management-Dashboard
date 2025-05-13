import { Button, Drawer, Form, Input, notification, Select, Space, Switch } from 'antd';
import useFlatStore from '../../../../store/useFlatStore';
import type { Flat } from '../../../../types';
import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';

const AddFlatDrawer = () => {
    const {
        addOpen,
        setAddOpen,
        flats,
        addFlat,
        isEditing,
        editingFlat,
        updateFlat,
        setEditingFlat,

    } = useFlatStore();
    const [form] = Form.useForm();

    const closeDrawer = () => {
        setAddOpen(false);
        form.resetFields();
    }

    const handleSubmit = (values: Omit<Flat, "id">) => {
        if (isEditing && editingFlat) {
            const updatedFlat: Flat = { ...editingFlat, ...values };
            updateFlat(updatedFlat.id, updatedFlat);
            notification.success({ message: "Flat updated successfully" });
        } else {
            const newFlat: Flat = { ...values, id: uuid(), };
            addFlat(newFlat);
            notification.success({
                message: "Flat successfully added",
            });
        }
        closeDrawer();
    }

    const occupied = Form.useWatch('occupied', form);

    useEffect(() => {
        if (!occupied) {
            form.setFieldValue("ownerName", "");
        }
    }, [occupied, form]);

    useEffect(() => {
        if (addOpen && isEditing && editingFlat) {
            form.setFieldsValue(editingFlat);
        }
        if (!addOpen) {
            form.resetFields();
            setEditingFlat(null);
        }
    }, [addOpen, isEditing, editingFlat, form, setEditingFlat]);

    return (
        <>
            <Drawer
                title={isEditing ? "Edit Flat" : "Add new Flat"}
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
                                backgroundColor: "#010107"
                            }}
                        >
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Form
                    layout='vertical'
                    form={form}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Flat Number"
                        name="flatNo"
                        rules={[
                            { required: true, message: 'Please input the flat number!' },
                            {
                                validator: (_, value) => {
                                    if(isEditing) return Promise.resolve();
                                    const exists = flats.some(flat => flat.flatNo.toLowerCase() === value?.toLowerCase());
                                    return exists
                                        ? Promise.reject('Flat number already exists!')
                                        : Promise.resolve();
                                }
                            }
                        ]}
                    >
                        <Input placeholder="101" />
                    </Form.Item>
                    <Form.Item
                        label="Flat Type"
                        name="type"
                        rules={[{ required: true, message: 'Please select the flat type!' }]}
                    >
                        <Select placeholder="Select type">
                            <Select.Option value="1BHK">1 BHK</Select.Option>
                            <Select.Option value="2BHK">2 BHK</Select.Option>
                            <Select.Option value="3BHK">3 BHK</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Owner Name"
                        name="ownerName"
                        rules={[
                            {
                                pattern: /^[A-Za-z\s]+$/,
                                message: 'Owner name can only contain letters and spaces',
                            }
                        ]}
                    >
                        <Input placeholder="John Doe"
                            disabled={!occupied}
                            allowClear
                        />
                    </Form.Item>

                    <Form.Item
                        label="Occupied"
                        name="occupied"
                        valuePropName="checked"
                        initialValue={false}
                    >
                        <Switch checkedChildren="Yes" unCheckedChildren="No" />
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    )
}

export default AddFlatDrawer