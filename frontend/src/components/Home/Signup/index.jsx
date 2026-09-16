import { Button, Card, Form, Input } from "antd";
import { LockOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Homelayout from "../../../layout/Homelayout";
const { Item } = Form;

const Signup = () => {
  return (
    <Homelayout>
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
            <Form name="signup-form" layout="vertical">
              <Item name="fullname" label="Full Name:" rules={[{ required: true }]}>
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Enter your full name"
                />
              </Item>
              <Item name="mobile" label="Mobile: " rules={[{ required: true }]}>
                <Input
                  prefix={<PhoneOutlined />}
                  placeholder="Enter your mobile no."
                />
              </Item>

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
                  className="bg-[#e20808ad]! text-white! font-bold!"
                >
                  Signup
                </Button>
              </Item>
            </Form>
            <div className="flex items-center justify-between">
              <div></div>
              <Link
                style={{ textDecoration: "underline" }}
                to="/"
                className="text-[#e20808ad]! font-bold!"
              >
                Already have an account
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </Homelayout>
  );
};
export default Signup;
