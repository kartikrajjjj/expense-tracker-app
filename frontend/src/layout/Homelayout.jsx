import { Layout,theme } from "antd";
import { Header, Footer, Content } from "antd/es/layout/layout";

const Homelayout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header className="!bg-[#FF735C] flex items-center justify-center">
        <h1 className="text-white text-lg md:text-3xl font-bold text-center">
          Expense Tracker App
        </h1>
      </Header>
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 260,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        {children}
      </Content>
      <Footer className="!bg-[#FF735C] flex items-center justify-center"><h1 className="text-white text-lg md:text-3xl font-bold text-center">
          Footer 
        </h1>
      </Footer>
    </Layout>
  );
};
export default Homelayout;
