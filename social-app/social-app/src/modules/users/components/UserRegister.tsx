import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Typography } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import type { RootState } from "../../../redux/store";
import Spinner from "../../../layout/util/Spinner";
import type { UserView } from "../models/UserView";
import { registerUser } from "../../../redux/users/user.actions";

const { Title } = Typography;

const UserRegister: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { loading, isRegistered, error } = useSelector(
    (state: RootState) => state.user
  );

  // ✅ Navigate after successful registration
  useEffect(() => {
    console.log(isRegistered, loading, "fdsfsdfdsf");
    if (isRegistered && !loading) {
      // Show success message and navigate
      setTimeout(() => {
        navigate("/users/login");
      }, 1500);
    }
  }, [isRegistered, loading, navigate]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (values: any) => {
    const userData: UserView = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    dispatch(registerUser({ user: userData, navigate }));
  };

  if (loading) {
    return <Spinner tip="Creating your account..." />;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        padding: "20px",
      }}
    >
      <Card style={{ width: 400, maxWidth: "90%" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: 30 }}>
          Create Account
        </Title>

        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
          disabled={loading}
        >
          <Form.Item
            name="name"
            label="Full Name"
            rules={[
              { required: true, message: "Please enter your full name" },
              { min: 2, message: "Name must be at least 2 characters" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your full name"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Enter your email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              size="large"
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
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
            >
              Register
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Button type="link" onClick={() => navigate("/users/login")}>
              Login here
            </Button>
          </div>
        </Form>

        {isRegistered && (
          <div
            style={{
              marginTop: 16,
              padding: 12,
              backgroundColor: "#f6ffed",
              border: "1px solid #b7eb8f",
              borderRadius: 4,
              textAlign: "center",
            }}
          >
            ✅ Registration successful! Redirecting to login...
          </div>
        )}

        {error && !isRegistered && (
          <div
            style={{
              marginTop: 16,
              padding: 12,
              backgroundColor: "#fff2f0",
              border: "1px solid #ffccc7",
              borderRadius: 4,
              textAlign: "center",
            }}
          >
            ❌ {error}
          </div>
        )}
      </Card>
    </div>
  );
};

export default UserRegister;
