import { AppstoreAddOutlined, BarChartOutlined, Loading3QuartersOutlined, LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, Image, Layout, Menu } from "antd";
import { useState } from "react";
import { Navigate, Outlet , useNavigate } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../../../utils/fetcher";
import Loader from "../../Shared/Loader";

const { Sider, Header, Content, Footer } = Layout;

const items = [
  {
    key: "/app/user/dashboard",
    label: "Dashboard",
    icon: <AppstoreAddOutlined />,
  },
  {
    key: "/app/user/report",
    label: "Reports",
    icon: <BarChartOutlined />,
  },
];

const Userlayout = () => {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const handleNavigate = (menu)=>{
        navigate(menu.key);
    }

    const {data: session , error, isLoading} = useSWR(
      "/api/user/session",
      fetcher
    )

    if(isLoading)
      return <Loader></Loader>

    
    if(!session && session?.role !== "user")
      return <Navigate to="/" />

    if(error)
      return <Navigate to="/" />

    const siderStyle={
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        scrollbarWidth: 'thin',
        scrollbarGutter: 'stable',
    };

    const headerStyle = {
        position: 'sticky',
        top: 0,
        zIndex: -1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: 0,
    }

  return (
    <Layout className="min-h-screen!">
      <Sider style={siderStyle} collapsible collapsed={open}>
        <div className="flex items-center justify-center my-4">
          <Image
            src="/app-logo.png"
            width={60}
            height={60}
            alt="logo"
            className="rounded-full text-center! mx-auto mb-3"
          />
        </div>
        <Menu
          defaultSelectedKeys={["app/user/dashboard"]}
          theme="dark"
          items={items}
          onClick={handleNavigate}
        />
      </Sider>
      <Layout>
        <Header style={headerStyle} className="flex items-center justify-between px-5! bg-white! shadow!">
            <Button
            onClick={()=>setOpen(!open)}
            icon={<MenuOutlined />}
            />
            <Button
            icon={<LogoutOutlined />}
            />
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Userlayout;
