import React from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import type { UserView } from "../../../modules/users/models/UserView";
import { REGISTER_USER } from "../../../redux/users/user.types";

const { Title, Paragraph } = Typography;

const UserRegister: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values: UserView) => {
    dispatch({
      type: REGISTER_USER,
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
        style={{
          width: 450,
          minHeight: 560, // ⬅️ Increased height for premium look
          borderRadius: 16,
          padding: "20px 10px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        }}
        variant="borderless"
        hoverable
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: 10 }}>
          <UserAddOutlined /> Create Your Account
        </Title>

        <Paragraph
          style={{
            textAlign: "center",
            marginBottom: 32,
            color: "#555",
            fontSize: 15,
          }}
        >
          Join the React Social community and connect with developers worldwide.
        </Paragraph>

        <Form layout="vertical" onFinish={onFinish} style={{ marginTop: 20 }}>
          {/* Name */}
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Name is required" },
              {
                pattern: /^[a-zA-Z0-9-_]{4,20}$/,
                message: "4–20 chars (letters, numbers, _ or -)",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Enter name"
            />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input
              size="large"
              prefix={<MailOutlined />}
              placeholder="Enter email"
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
                message: "8–15 characters required",
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Enter password"
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 30 }}>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              block
              icon={<UserAddOutlined />}
            >
              Register
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center", marginTop: 10 }}>
            Already have an account?{" "}
            <Link to="/users/login">
              <strong>Login</strong>
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default UserRegister;
