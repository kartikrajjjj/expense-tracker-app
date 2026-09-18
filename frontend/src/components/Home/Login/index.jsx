import { Button, Card, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
const { Item } = Form;

const Login = () => {

  const navigate = useNavigate();

  const [loginForm] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/user/login", values);
      const {role}=data;
      if(role ==="admin"){
      return toast.success("Admin tried to login");
      }
      if(role ==="user"){
      return navigate("/app/user");
      }
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <div className="w-1/2 hidden md:flex items-center justify-center">
        <img
          src="img1-expense-tracker.jpg"
          alt="Bank"
          className="w-4/5 object-contain "
        />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-2 md:p-6 bg-white">
        <Card className="border border-black! w-full max-w-sm shadow-md">
          <h2 className="font-bold text-[#e20808ad] text-2xl text-center mb-6 ">
            Track your expense
          </h2>
          <Form name="login-form" 
          layout="vertical"
          onFinish={onFinish}
          form={loginForm}
          >
            <Item name="email" label="Email:" rules={[{ required: true }]}>
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter your username"
              />
            </Item>
            <Item
              name="password"
              label="Password:"
              rules={[{ required: true }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter your password"
              />
            </Item>
            <Item>
              <Button
                type="text"
                htmlType="submit"
                block
                className="bg-[#e20808ad]! text-white! font-bold!
                active:scale-95"
                loading={loading}
              >
                Login
              </Button>
            </Item>
          </Form>
          <div className="flex items-center justify-between">
            <Link
              style={{ textDecoration: "underline" }}
              to="#"
              className="text-[#e20808ad]! font-bold!"
            >
              Forgot Password
            </Link>
            <Link
              style={{ textDecoration: "underline" }}
              to="/signup"
              className="text-[#e20808ad]! font-bold!"
            >
              Don't have an account
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default Login;
