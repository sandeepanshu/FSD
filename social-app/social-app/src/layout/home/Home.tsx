import React from "react";
import { Button, Typography, Row, Col, Card } from "antd";
import { Link } from "react-router-dom";
import {
  UserAddOutlined,
  LoginOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  CodeOutlined,
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
        {/* LEFT SIDE CONTENT */}
        <Col xs={24} md={12}>
          <Title
            style={{
              color: "white",
              fontSize: 52,
              fontWeight: 900,
              lineHeight: "1.2",
            }}
          >
            React Developer Hub 🚀
          </Title>

          <Paragraph
            style={{
              color: "#e6f7ff",
              fontSize: 18,
              marginBottom: 32,
              lineHeight: 1.6,
            }}
          >
            A powerful MERN + Redux + Ant Design based developer community.
            Create your profile, showcase skills, share posts, explore
            developers, and collaborate with top talent.
          </Paragraph>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
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

            {/* NEW BUTTON */}
            <Link to="/developers">
              <Button
                size="large"
                icon={<TeamOutlined />}
                style={{
                  fontWeight: 600,
                  background: "#52c41a",
                  color: "white",
                }}
              >
                Explore Developers
              </Button>
            </Link>
          </div>
        </Col>

        {/* RIGHT SIDE FEATURE CARDS */}
        <Col xs={24} md={12}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card
                hoverable
                style={{
                  borderRadius: 12,
                  minHeight: 160,
                  textAlign: "center",
                  paddingTop: 20,
                }}
              >
                <TeamOutlined style={{ fontSize: 42, color: "#1890ff" }} />
                <Title level={4} style={{ marginTop: 12 }}>
                  Meet Developers
                </Title>
                <Paragraph type="secondary">
                  Explore profiles, tech stacks & collaborate.
                </Paragraph>
              </Card>
            </Col>

            <Col span={12}>
              <Card
                hoverable
                style={{
                  borderRadius: 12,
                  minHeight: 160,
                  textAlign: "center",
                  paddingTop: 20,
                }}
              >
                <ThunderboltOutlined
                  style={{ fontSize: 42, color: "#faad14" }}
                />
                <Title level={4} style={{ marginTop: 12 }}>
                  Share Posts
                </Title>
                <Paragraph type="secondary">
                  Post ideas, updates & questions.
                </Paragraph>
              </Card>
            </Col>

            <Col span={12}>
              <Card
                hoverable
                style={{
                  borderRadius: 12,
                  minHeight: 160,
                  textAlign: "center",
                  paddingTop: 20,
                }}
              >
                <CodeOutlined style={{ fontSize: 42, color: "#722ed1" }} />
                <Title level={4} style={{ marginTop: 12 }}>
                  Build Your Profile
                </Title>
                <Paragraph type="secondary">
                  Showcase skills, experience & education.
                </Paragraph>
              </Card>
            </Col>

            <Col span={12}>
              <Card
                hoverable
                style={{
                  borderRadius: 12,
                  minHeight: 160,
                  textAlign: "center",
                  paddingTop: 20,
                }}
              >
                <LoginOutlined style={{ fontSize: 42, color: "#eb2f96" }} />
                <Title level={4} style={{ marginTop: 12 }}>
                  Secure Auth
                </Title>
                <Paragraph type="secondary">
                  JWT-based authentication & protected routes.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
