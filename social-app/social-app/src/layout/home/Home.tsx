/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Row, Col, Button, Typography, Card } from "antd";

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

const OAUTH_GITHUB = "/auth/github";
const OAUTH_LINKEDIN = "/auth/linkedin";

const Home: React.FC = () => {
  const { isAuthenticated } = useSelector((s: RootState) => s.user);
  const mode = useSelector((s: RootState) => s.theme.mode);

  /** ----------------------------------
   * BRAND NEW COLOR SYSTEM (Perfected)
   * ---------------------------------- */
  const COLORS = {
    bg: mode === "dark" ? "#0d1117" : "#f4f7fb",
    hero: mode === "dark" ? "#111827" : "#ffffff",
    card: mode === "dark" ? "#1f2937" : "#ffffff",
    text: mode === "dark" ? "#e5e7eb" : "#111827",
    muted: mode === "dark" ? "#9ca3af" : "#4b5563",
    primary: "#1890ff",
    accent: "#faad14",
  };

  /** ----------------------------------
   * PAGE OUTER WRAPPER
   * ---------------------------------- */
  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.bg,
        padding: "80px 24px",
        transition: "0.3s ease",
      }}
    >
      <style>
        {`
          .fade {
            opacity: 0;
            transform: translateY(10px);
            animation: fadeUp 0.7s ease forwards;
          }
          .delay1 { animation-delay: .15s; }
          .delay2 { animation-delay: .30s; }
          .delay3 { animation-delay: .45s; }

          @keyframes fadeUp {
            to { opacity: 1; transform: translateY(0); }
          }

          .feature-card { 
            transition: .25s ease;
          }
          .feature-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 12px 32px rgba(0,0,0,0.15);
          }
        `}
      </style>

      <div style={{ maxWidth: 1250, margin: "0 auto" }}>
        <Row gutter={[40, 40]} align="middle">
          {/* LEFT HERO SECTION */}
          <Col xs={24} md={12}>
            <div className="fade delay1">
              <Card
                bordered={false}
                style={{
                  background: COLORS.hero,
                  padding: "40px 36px",
                  borderRadius: 20,
                  boxShadow:
                    mode === "dark"
                      ? "0 10px 30px rgba(0,0,0,0.5)"
                      : "0 12px 32px rgba(0,0,0,0.06)",
                }}
              >
                <Title
                  level={1}
                  style={{
                    fontWeight: 900,
                    fontSize: 46,
                    color: COLORS.text,
                    marginBottom: 16,
                    lineHeight: 1.15,
                  }}
                >
                  A Social Network
                  <br />
                  <Text style={{ color: COLORS.primary }}>Built for Devs</Text>
                </Title>

                <Paragraph style={{ fontSize: 16, color: COLORS.muted }}>
                  Connect with developers, showcase skills, share posts, and
                  collaborate on real-world projects. A clean and powerful MERN
                  + Redux Toolkit + Ant Design application.
                </Paragraph>

                {/* AUTH / CTA BUTTONS */}
                <div
                  className="fade delay2"
                  style={{
                    display: "flex",
                    gap: 16,
                    flexWrap: "wrap",
                    marginTop: 20,
                  }}
                >
                  {!isAuthenticated ? (
                    <>
                      <Link to="/users/register">
                        <Button
                          type="primary"
                          size="large"
                          icon={<UserAddOutlined />}
                          style={{ borderRadius: 8, fontWeight: 600 }}
                        >
                          Register
                        </Button>
                      </Link>

                      <Link to="/users/login">
                        <Button
                          size="large"
                          icon={<LoginOutlined />}
                          style={{ borderRadius: 8, fontWeight: 600 }}
                        >
                          Login
                        </Button>
                      </Link>

                      <a href={OAUTH_GITHUB}>
                        <Button
                          size="large"
                          icon={<GithubOutlined />}
                          style={{ borderRadius: 8, fontWeight: 600 }}
                        >
                          GitHub
                        </Button>
                      </a>

                      <a href={OAUTH_LINKEDIN}>
                        <Button
                          size="large"
                          icon={<LinkedinOutlined />}
                          style={{ borderRadius: 8, fontWeight: 600 }}
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
                          size="large"
                          icon={<DashboardOutlined />}
                          style={{ borderRadius: 8, fontWeight: 600 }}
                        >
                          Dashboard
                        </Button>
                      </Link>

                      <Link to="/profiles/dashboard">
                        <Button
                          size="large"
                          icon={<UserOutlined />}
                          style={{ borderRadius: 8, fontWeight: 600 }}
                        >
                          View Profile
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </Card>
            </div>
          </Col>

          {/* RIGHT FEATURES */}
          <Col xs={24} md={12}>
            <Row gutter={[20, 20]}>
              <Col xs={12}>
                <Card
                  bordered={false}
                  className="feature-card fade delay1"
                  style={{
                    borderRadius: 16,
                    padding: 22,
                    background: COLORS.card,
                    minHeight: 160,
                  }}
                >
                  <TeamOutlined
                    style={{ fontSize: 40, color: COLORS.primary }}
                  />
                  <Title
                    level={4}
                    style={{ marginTop: 12, color: COLORS.text }}
                  >
                    Meet Developers
                  </Title>
                  <Paragraph style={{ color: COLORS.muted }}>
                    Explore dev profiles & collaborate.
                  </Paragraph>
                </Card>
              </Col>

              <Col xs={12}>
                <Card
                  bordered={false}
                  className="feature-card fade delay2"
                  style={{
                    borderRadius: 16,
                    padding: 22,
                    background: COLORS.card,
                    minHeight: 160,
                  }}
                >
                  <ThunderboltOutlined
                    style={{ fontSize: 40, color: COLORS.accent }}
                  />
                  <Title
                    level={4}
                    style={{ marginTop: 12, color: COLORS.text }}
                  >
                    Share Posts
                  </Title>
                  <Paragraph style={{ color: COLORS.muted }}>
                    Ask questions & share ideas.
                  </Paragraph>
                </Card>
              </Col>

              <Col xs={24}>
                <Card
                  bordered={false}
                  className="feature-card fade delay3"
                  style={{
                    borderRadius: 16,
                    padding: 24,
                    background: COLORS.card,
                  }}
                >
                  <Row gutter={16} align="middle">
                    <Col span={6}>
                      <GithubOutlined
                        style={{ fontSize: 32, color: COLORS.text }}
                      />
                    </Col>
                    <Col span={18}>
                      <Title
                        level={5}
                        style={{ marginBottom: 2, color: COLORS.text }}
                      >
                        Showcase Projects
                      </Title>
                      <Text style={{ color: COLORS.muted }}>
                        Highlight your open-source work.
                      </Text>
                    </Col>
                  </Row>
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
