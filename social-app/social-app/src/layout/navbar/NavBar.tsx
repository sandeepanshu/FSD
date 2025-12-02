import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Menu, Layout, Button, Avatar } from "antd";
import {
  TeamOutlined,
  CodeOutlined,
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined,
  ReadOutlined,
} from "@ant-design/icons";

import type { RootState } from "../../redux/store";
import * as userActions from "../../redux/users/user.actions";

const { Header } = Layout;

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.user
  );

  const handleLogout = () => {
    dispatch(userActions.logOutUser());
  };

  // -------------------------------
  // MENU ITEMS (AntD v5 style)
  // -------------------------------
  const menuItems = [
    {
      key: "developers",
      icon: <TeamOutlined />,
      label: <NavLink to="/developers">Developers</NavLink>,
    },
    ...(isAuthenticated
      ? [
          {
            key: "posts",
            icon: <ReadOutlined />,
            label: <NavLink to="/posts/list">Posts</NavLink>,
          },
          {
            key: "dashboard",
            icon: <ProfileOutlined />,
            label: <NavLink to="/profiles/dashboard">Dashboard</NavLink>,
          },
        ]
      : []),
  ];

  // Derive current selected key from URL
  const selectedKey = location.pathname.split("/")[1] || "home";

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          background: "#001529",
          height: 64,
        }}
      >
        {/* Logo */}
        <NavLink
          to="/"
          style={{
            color: "#fff",
            fontSize: 18,
            fontWeight: 600,
            marginRight: 32,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <CodeOutlined />
          React Social
        </NavLink>

        {/* NAV MENU */}
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={menuItems}
          style={{ flex: 1, minWidth: 0 }}
        />

        {/* RIGHT SIDE AUTH BUTTONS */}
        {!isAuthenticated ? (
          <div style={{ display: "flex", gap: 12 }}>
            <NavLink to="/users/register">
              <Button type="default">Register</Button>
            </NavLink>

            <NavLink to="/users/login">
              <Button type="primary">Login</Button>
            </NavLink>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Avatar + Name */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Avatar
                src={user?.avatar}
                icon={!user?.avatar ? <UserOutlined /> : undefined}
              />
              <span style={{ color: "#fff" }}>{user?.name}</span>
            </div>

            {/* Logout */}
            <Button
              type="primary"
              danger
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        )}
      </Header>
    </Layout>
  );
};

export default NavBar;
