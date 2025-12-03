import React, { useEffect } from "react";
import { Form, Input, Button, Card, Typography, Alert } from "antd";
import { LoginOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import type { UserView } from "../../../modules/users/models/UserView";
import { loginUser } from "../../../redux/users/user.actions";
import type { RootState } from "../../../redux/store";
import Spinner from "../../../layout/util/Spinner";

const { Title, Paragraph } = Typography;

const UserLogin: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isAuthenticated, error } = useSelector(
    (state: RootState) => state.user
  );

  // ✅ Navigate when authentication becomes true
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profiles/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const onFinish = (values: UserView) => {
    dispatch(loginUser({ user: values }));
  };

  // Show loading spinner
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner tip="Logging in..." />
      </div>
    );
  }

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
        variant="borderless"
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

        {/* Show error message if any */}
        {error && (
          <Alert
            message="Login Error"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: 24 }}
            closable
          />
        )}

        <Form
          layout="vertical"
          onFinish={onFinish}
          style={{ marginTop: 20 }}
          disabled={loading}
        >
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
              disabled={loading}
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Password is required" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              disabled={loading}
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 30 }}>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              block
              icon={<LoginOutlined />}
              loading={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center", marginTop: 15 }}>
            Don't have an account?{" "}
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
