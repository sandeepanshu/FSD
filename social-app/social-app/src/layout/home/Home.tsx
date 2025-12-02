import React from "react";
import { Button, Typography, Row, Col, Card } from "antd";
import { Link } from "react-router-dom";
import {
  UserAddOutlined,
  LoginOutlined,
  TeamOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #001529 0%, #1890ff 100%)",
        display: "flex",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <Row
        gutter={[32, 32]}
        justify="center"
        style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}
      >
        {/* Left Content */}
        <Col xs={24} md={12}>
          <Title style={{ color: "white", fontSize: 48, fontWeight: 800 }}>
            React Social App 🌐
          </Title>

          <Paragraph
            style={{ color: "#e6f7ff", fontSize: 18, marginBottom: 32 }}
          >
            Connect with developers, share posts, grow your network, and
            maintain your dev profile. Built using MERN + Redux Toolkit + Ant
            Design.
          </Paragraph>

          <div style={{ display: "flex", gap: 16 }}>
            <Link to="/users/register">
              <Button
                type="primary"
                size="large"
                icon={<UserAddOutlined />}
                style={{ fontWeight: 600 }}
              >
                Register
              </Button>
            </Link>

            <Link to="/users/login">
              <Button
                size="large"
                icon={<LoginOutlined />}
                style={{ fontWeight: 600 }}
              >
                Login
              </Button>
            </Link>
          </div>
        </Col>

        {/* Right Feature Cards */}
        <Col xs={24} md={12}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card
                variant="borderless"
                hoverable
                style={{ borderRadius: 12, minHeight: 150 }}
              >
                <TeamOutlined style={{ fontSize: 40, color: "#1890ff" }} />
                <Title level={4} style={{ marginTop: 12 }}>
                  Meet Developers
                </Title>
                <Paragraph>Explore profiles and collaborate.</Paragraph>
              </Card>
            </Col>

            <Col span={12}>
              <Card
                variant="borderless"
                hoverable
                style={{ borderRadius: 12, minHeight: 150 }}
              >
                <ThunderboltOutlined
                  style={{ fontSize: 40, color: "#faad14" }}
                />
                <Title level={4} style={{ marginTop: 12 }}>
                  Share Posts
                </Title>
                <Paragraph>Post ideas, questions and updates.</Paragraph>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
