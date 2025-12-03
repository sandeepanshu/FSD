import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Row, Col, Button, Typography, Card, Grid } from "antd";
import {
  UserAddOutlined,
  LoginOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  GithubOutlined,
  LinkedinOutlined,
  DashboardOutlined,
  UserOutlined,
} from "@ant-design/icons";

import type { RootState } from "../../redux/store";

const { Title, Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;

const OAUTH_GITHUB = "/auth/github";
const OAUTH_LINKEDIN = "/auth/linkedin";

const Home: React.FC = () => {
  const { isAuthenticated } = useSelector((s: RootState) => s.user);
  const mode = useSelector((s: RootState) => s.theme?.mode ?? "light");
  const screens = useBreakpoint();

  const COLORS = {
    bg: mode === "dark" ? "#0d1117" : "#f4f7fb",
    hero: mode === "dark" ? "#0b1220" : "#ffffff",
    card: mode === "dark" ? "#0b1228" : "#ffffff",
    text: mode === "dark" ? "#e5e7eb" : "#111827",
    muted: mode === "dark" ? "#9ca3af" : "#4b5563",
    primary: "#1890ff",
    accent: "#faad14",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.bg,
        padding: "32px 12px",
      }}
    >
      <div style={{ maxWidth: 1250, margin: "0 auto" }}>
        <Row gutter={[24, 24]} align="middle">
          {/* HERO / LEFT */}
          <Col xs={24} sm={24} md={13} lg={14}>
            <Card
              bordered={false}
              style={{
                borderRadius: 12,
                background: COLORS.hero,
                padding: screens.xs ? 18 : 28,
              }}
            >
              <Title
                style={{
                  color: COLORS.text,
                  marginBottom: 8,
                  fontSize: screens.xs ? 28 : 40,
                }}
              >
                Build. Share. Connect.
                <br />
                <Text style={{ color: COLORS.primary }}>React Social App</Text>
              </Title>

              <Paragraph
                style={{ color: COLORS.muted, fontSize: screens.xs ? 14 : 16 }}
              >
                Connect with developers, create your profile, share ideas and
                collaborate — built with MERN, Redux Toolkit, and Ant Design.
              </Paragraph>

              <div
                style={{
                  display: "flex",
                  gap: 12,
                  flexWrap: "wrap",
                  marginTop: 16,
                }}
              >
                {!isAuthenticated ? (
                  <>
                    <Link to="/users/register">
                      <Button
                        type="primary"
                        size={screens.xs ? "middle" : "large"}
                        icon={<UserAddOutlined />}
                      >
                        Register
                      </Button>
                    </Link>

                    <Link to="/users/login">
                      <Button
                        size={screens.xs ? "middle" : "large"}
                        icon={<LoginOutlined />}
                      >
                        Login
                      </Button>
                    </Link>

                    <a href={OAUTH_GITHUB}>
                      <Button
                        size={screens.xs ? "middle" : "large"}
                        icon={<GithubOutlined />}
                      >
                        GitHub
                      </Button>
                    </a>

                    <a href={OAUTH_LINKEDIN}>
                      <Button
                        size={screens.xs ? "middle" : "large"}
                        icon={<LinkedinOutlined />}
                      >
                        LinkedIn
                      </Button>
                    </a>
                  </>
                ) : (
                  <>
                    <Link to="/profiles/dashboard">
                      <Button
                        type="primary"
                        size={screens.xs ? "middle" : "large"}
                        icon={<DashboardOutlined />}
                      >
                        Dashboard
                      </Button>
                    </Link>

                    <Link to="/profiles/dashboard">
                      <Button
                        size={screens.xs ? "middle" : "large"}
                        icon={<UserOutlined />}
                      >
                        View Profile
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </Card>
          </Col>

          {/* FEATURES / RIGHT */}
          <Col xs={24} sm={24} md={11} lg={10}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Card
                  bordered={false}
                  style={{ borderRadius: 10, padding: 16, minHeight: 140 }}
                >
                  <TeamOutlined
                    style={{ fontSize: 28, color: COLORS.primary }}
                  />
                  <Title
                    level={4}
                    style={{ marginTop: 10, color: COLORS.text }}
                  >
                    Meet Developers
                  </Title>
                  <Paragraph style={{ color: COLORS.muted, marginBottom: 0 }}>
                    Explore profiles & collaborate.
                  </Paragraph>
                </Card>
              </Col>

              <Col xs={24} sm={12}>
                <Card
                  bordered={false}
                  style={{ borderRadius: 10, padding: 16, minHeight: 140 }}
                >
                  <ThunderboltOutlined
                    style={{ fontSize: 28, color: COLORS.accent }}
                  />
                  <Title
                    level={4}
                    style={{ marginTop: 10, color: COLORS.text }}
                  >
                    Share Posts
                  </Title>
                  <Paragraph style={{ color: COLORS.muted, marginBottom: 0 }}>
                    Post ideas, questions & updates.
                  </Paragraph>
                </Card>
              </Col>

              <Col xs={24}>
                <Card
                  bordered={false}
                  style={{ borderRadius: 10, padding: 14 }}
                >
                  <div
                    style={{ display: "flex", gap: 12, alignItems: "center" }}
                  >
                    <GithubOutlined
                      style={{ fontSize: 26, color: COLORS.text }}
                    />
                    <div>
                      <Title
                        level={5}
                        style={{ margin: 0, color: COLORS.text }}
                      >
                        Showcase Projects
                      </Title>
                      <Text style={{ color: COLORS.muted }}>
                        Highlight open-source contributions.
                      </Text>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
