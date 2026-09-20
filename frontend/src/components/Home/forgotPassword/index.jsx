import { Button, Card, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Homelayout from "../../../layout/Homelayout";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
const { Item } = Form;

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [params] = useSearchParams();

  const [forgetForm] = Form.useForm();
  const [rePasswordForm] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(params.get("token"));

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.post("/api/user/forgot-password", values);
      toast.success("Please check your email to reset password");
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.message);
    } finally {
      setLoading(false);
    }
  };

  const onChangePassword = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/user/login", values);
      const { role } = data;
      if (role === "admin") {
        return toast.success("Admin tried to login");
      }
      if (role === "user") {
        return navigate("/app/user");
      }
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Homelayout>
      <div className="flex">
        <div className="w-1/2 hidden md:flex items-center justify-center">
          <img src="img2.jpg" alt="Bank" className="w-4/5 object-contain " />
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center p-2 md:p-6 bg-white">
          <Card className="border border-black! w-full max-w-sm shadow-md">
            <h2 className="font-bold text-[#e20808ad] text-2xl text-center mb-6 ">
              Forgot Password
            </h2>
            {token ? (
              <Form
                name="login-form"
                layout="vertical"
                onFinish={onChangePassword}
                form={rePasswordForm}
              >
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
                <Item
                  name="re-password"
                  label="re Enter Password:"
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
                    Submit
                  </Button>
                </Item>
              </Form>
            ) : (
              <Form
                name="login-form"
                layout="vertical"
                onFinish={onFinish}
                form={forgetForm}
              >
                <Item name="email" label="Email:" rules={[{ required: true }]}>
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Enter your email ID:"
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
                    Change Password
                  </Button>
                </Item>
              </Form>
            )}

            <div className="flex items-center justify-between">
              <Link
                style={{ textDecoration: "underline" }}
                to="/"
                className="text-[#e20808ad]! font-bold!"
              >
                Sign in
              </Link>
              <Link
                style={{ textDecoration: "underline" }}
                to="/signup"
                className="text-[#e20808ad]! font-bold!"
              >
                Don't have an account?
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </Homelayout>
  );
};
export default ForgotPassword;
