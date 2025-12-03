import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Menu, Layout, Button, Avatar, Switch, Tooltip } from "antd";
import {
  TeamOutlined,
  CodeOutlined,
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined,
  ReadOutlined,
  SunOutlined,
  MoonOutlined,
} from "@ant-design/icons";

import type { RootState } from "../../redux/store";
import * as userActions from "../../redux/users/user.actions";
import { toggleTheme } from "../../redux/theme/theme.slice";

const { Header } = Layout;

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.user
  );
  const themeMode = useSelector((state: RootState) => state.theme.mode);

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = () => {
    dispatch(userActions.logOutUser());
    navigate("/");
  };

  /* ---------------- MENU ITEMS ---------------- */
  const menuItems = [
    {
      key: "/",
      icon: <CodeOutlined />,
      label: <NavLink to="/">Home</NavLink>,
    },
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

  const selectedKey = location.pathname.split("/")[1] || "/";

  /* ---------------- NAVBAR ---------------- */
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          background: themeMode === "dark" ? "#000c17" : "#001529",
          height: 64,
          position: "fixed",
          top: 0,
          zIndex: 1000,
          width: "100%",
        }}
      >
        {/* LOGO */}
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
            whiteSpace: "nowrap",
          }}
        >
          <CodeOutlined />
          React Social
        </NavLink>

        {/* MENU */}
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={menuItems}
          style={{ flex: 1, minWidth: 0 }}
        />

        {/* THEME TOGGLE */}
        <Tooltip
          title={
            themeMode === "light"
              ? "Switch to Dark Mode"
              : "Switch to Light Mode"
          }
        >
          <Switch
            checkedChildren={<SunOutlined />}
            unCheckedChildren={<MoonOutlined />}
            checked={themeMode === "light"}
            onChange={() => dispatch(toggleTheme())}
            style={{ marginRight: 20 }}
          />
        </Tooltip>

        {/* AUTH BUTTONS */}
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
            {/* Avatar & Name */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Avatar
                src={user?.avatar}
                icon={!user?.avatar ? <UserOutlined /> : undefined}
                style={{ backgroundColor: "#1890ff" }}
              />
              <span style={{ color: "#fff", fontWeight: 600 }}>
                {user?.name}
              </span>
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

      {/* FIXED HEADER SPACER */}
      <div style={{ marginTop: 64 }}></div>
    </Layout>
  );
};

export default NavBar;
