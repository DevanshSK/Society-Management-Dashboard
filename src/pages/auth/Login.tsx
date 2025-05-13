import { Button, Form, Input } from "antd";
import useAuthStore from "../../store/useAuthStore";

const Login = () => {
    const { login, loading } = useAuthStore();

    // const handleLogin = () => {
    //     login("admin@gmail.com", "admin123");
    //     // login("admin@gmail.com", "admin1234");
    // }
    // const handleFalseLogin = () => {
    //     // login("admin@gmail.com", "admin123");
    //     login("admin@gmail.com", "admin1234");
    // }
    const [form] = Form.useForm();

    const onFinish = async (values: { email: string; password: string }) => {
        console.log("Form Submitted", values);
        login(values.email, values.password);
    }




    return (
        <div className="flex-1 py-36 md:px-16 w-full">
            <div className="flex flex-col h-full gap-3">
                <h1 className="text-3xl font-bold text-left lg:text-left">Admin Login</h1>
                <h2 className="mb-2 text-left lg:text-left">Enter your credentials to log into Society Management Portal.</h2>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Please input your email!" },
                            { type: "email", message: "Please enter a valid email!" },
                        ]}
                    >
                        <Input placeholder="admin@gmail.com" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: "Please input your password!" },
                        ]}
                    >
                        <Input.Password placeholder="admin123" />
                    </Form.Item>

                    <Form.Item
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            disabled={loading}
                            loading={loading}
                            style={{
                                marginTop: "12px",
                                backgroundColor: "#010107",
                                color: "white",
                            }}
                        >
                            Log in
                        </Button>
                    </Form.Item>
                </Form>

                {/* <Button
                    onClick={handleLogin}
                >
                    Login
                </Button>
                <Button
                    onClick={handleFalseLogin}
                >
                    False Login
                </Button> */}
                {/* <Spin
                    fullscreen
                    spinning={loading}
                /> */}
            </div>

        </div>
    )
}

export default Login