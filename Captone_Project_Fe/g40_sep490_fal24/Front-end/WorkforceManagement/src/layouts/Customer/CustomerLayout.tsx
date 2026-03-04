import React, { useState } from "react";
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import HeaderLayout from "../../components/Header/Header";
import LogoImage from "../../assets/images/deskapp-logo.svg";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  backgroundColor: "#fff",
  scrollbarWidth: "thin",
  scrollbarColor: "unset",
  paddingTop: 20,
};

const CustomerLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); // Hook for navigation  

  const items: MenuProps["items"] = [
    {
      key: "1",
      icon: <HomeOutlined style={{ fontSize: "24px" }} />,
      label: "Home Management",
      onClick: () => navigate("/customer/home"), // Navigate to home
    },
    {
      key: "2",
      icon: <UserOutlined style={{ fontSize: "24px" }} />,
      label: "Customer Ticket",
      children: [
        {
          key: "2-1",
          label: "New Pentest Ticket",
          onClick: () => navigate("/customer/ticket"), // Navigate to user page 1
        },
                {
          key: "2-2",
          label: "Request Status",
          onClick: () => navigate("/customer/request-status"), // Navigate to user page 1
        },
      ],
    },
  ];


  return (
    <Layout hasSider>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={siderStyle}
        width={250}
      >
        <div className="demo-logo-vertical" style={{ textAlign: "center" }}>
          {!collapsed && (
            <img
              src={LogoImage}
              alt=""
              className="h-full w-auto"
              style={{
                maxWidth: 150,
                transition: "max-width 0.2s",
                paddingLeft: "10px",
              }}
            />
          )}
        </div>
        <div className="pt-5">
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]} // Set a valid default selected key
            items={items}
            style={{ fontSize: "18px", fontWeight: "inherit", textAlign: "center" }}
          />
        </div>
        {/* Toggle Button */}
        <div
          style={{
            textAlign: "center",
            cursor: "pointer",
            position: "absolute",
            bottom: 0,
            width: "100%",
          }}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
      </Sider>
      <Layout
        style={{
          marginInlineStart: collapsed ? 80 : 250,
          transition: "margin-inline-start 0.2s",
        }}
      >
        <Header
          style={{
            padding: 0,
            position: "sticky",
            top: 0,
            zIndex: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <HeaderLayout />
        </Header>
        <Content style={{ margin: "40px 24px 0", overflow: "initial", minHeight: "100vh" }}>
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default CustomerLayout;
