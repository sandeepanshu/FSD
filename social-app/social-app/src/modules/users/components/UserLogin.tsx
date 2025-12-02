import React from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import {
  LoginOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";

import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import type { UserView } from "../../../modules/users/models/UserView";
import { LOGIN_USER } from "../../../redux/users/user.types";

const { Title, Paragraph } = Typography;

const UserLogin: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values: UserView) => {
    dispatch({
      type: LOGIN_USER,
      payload: { user: values, navigate },
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f2f5",
        padding: "20px",
      }}
    >
      <Card
        variant="borderless"   // 🔥 Updated here (NO deprecated warning)
        style={{
          width: 450,
          minHeight: 520,
          borderRadius: 16,
          padding: "20px 10px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
          background: "#fff",
        }}
        hoverable
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: 10 }}>
          <LoginOutlined /> Login to Your Account
        </Title>

        <Paragraph
          style={{
            textAlign: "center",
            marginBottom: 32,
            color: "#555",
            fontSize: 15,
          }}
        >
          Welcome back! Enter your login credentials to continue.
        </Paragraph>

        <Form layout="vertical" onFinish={onFinish} style={{ marginTop: 20 }}>
          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Enter a valid email address" },
            ]}
          >
            <Input
              size="large"
              prefix={<MailOutlined />}
              placeholder="Enter your email"
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Password is required" },
              {
                pattern: /^[A-Za-z0-9]\w{7,14}$/,
                message: "Password must be 8–15 valid characters",
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Enter your password"
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 30 }}>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              block
              icon={<LoginOutlined />}
            >
              Login
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center", marginTop: 15 }}>
            Don’t have an account?{" "}
            <Link to="/users/register">
              <strong>Register</strong>
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default UserLogin;
