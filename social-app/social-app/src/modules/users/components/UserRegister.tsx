import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Typography, Alert } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { registerUser } from "../../../redux/users/user.actions";
import type { RootState } from "../../../redux/store";
import Spinner from "../../../layout/util/Spinner";
import type { UserView } from "../models/UserView";

const { Title } = Typography;

const UserRegister: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loading, isRegistered, error, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );

  // ✅ Navigate to login after successful registration
  useEffect(() => {
    if (isRegistered) {
      // Show success message for 2 seconds then navigate
      setTimeout(() => {
        navigate("/users/login");
      }, 2000);
    }
  }, [isRegistered, navigate]);

  // ✅ If user is already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profiles/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (values: any) => {
    const userData: UserView = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    
    dispatch(registerUser({ user: userData }));
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <Spinner tip="Creating your account..." />
      </div>
    );
  }

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "100vh",
      padding: "20px",
      backgroundColor: "#f0f2f5"
    }}>
      <Card style={{ width: 400, maxWidth: "90%" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: 30 }}>
          Create Account
        </Title>
        
        {/* Show success message after registration */}
        {isRegistered && (
          <Alert
            message="Registration Successful!"
            description="You will be redirected to login page shortly."
            type="success"
            showIcon
            style={{ marginBottom: 24 }}
          />
        )}

        {/* Show error message if any */}
        {error && !isRegistered && (
          <Alert
            message="Registration Error"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: 24 }}
            closable
          />
        )}
        
        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
          disabled={loading || isRegistered}
        >
          <Form.Item
            name="name"
            label="Full Name"
            rules={[
              { required: true, message: "Please enter your full name" },
              { min: 2, message: "Name must be at least 2 characters" }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Enter your full name" 
              size="large"
              disabled={loading}
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="Enter your email" 
              size="large"
              disabled={loading}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" }
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Enter your password" 
              size="large"
              disabled={loading}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Confirm your password" 
              size="large"
              disabled={loading}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              disabled={isRegistered}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Button type="link" onClick={() => navigate("/users/login")} disabled={loading}>
              Login here
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default UserRegister;