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
  /* -----------------------------
     Global Auth + Theme State
  ------------------------------ */
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const themeMode = useSelector((state: RootState) => state.theme.mode);

  /* -----------------------------
     Colors Based on Theme
  ------------------------------ */
  const bgGradient =
    themeMode === "dark"
      ? "linear-gradient(135deg,#000c17 0%, #001529 70%)"
      : "linear-gradient(135deg,#e6f7ff 0%, #ffffff 70%)";

  const textColor = themeMode === "dark" ? "#e6f7ff" : "#001529";
  const mutedColor =
    themeMode === "dark" ? "rgba(230,247,255,0.85)" : "rgba(0,0,0,0.65)";
  const primary = "#1890ff";

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "48px 16px",
        display: "flex",
        alignItems: "center",
        background: bgGradient,
        transition: "all 0.3s ease",
      }}
    >
      {/* --- PAGE CSS --- */}
      <style>
        {`
        .fade-up {
          opacity: 0;
          transform: translateY(15px);
          animation: fadeUp 0.7s ease forwards;
        }
        .fade-delay-1 { animation-delay: 0.15s; }
        .fade-delay-2 { animation-delay: 0.3s; }
        .fade-delay-3 { animation-delay: 0.45s; }

        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .feature-card {
          transition: 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.15);
        }

        @media(max-width: 768px) {
          .hero-title {
            font-size: 32px !important;
          }
        }
      `}
      </style>

      {/* --- MAIN CONTENT --- */}
      <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto" }}>
        <Row gutter={[32, 32]} align="middle">
          {/* ---------- LEFT HERO SECTION ---------- */}
          <Col xs={24} md={12}>
            <div className="fade-up fade-delay-1">
              <Title
                level={1}
                className="hero-title"
                style={{
                  fontSize: 48,
                  fontWeight: 800,
                  color: textColor,
                  lineHeight: 1.15,
                  marginBottom: 14,
                }}
              >
                Build. Share. Connect.
                <br />
                <Text style={{ color: primary }}>React Social App</Text>
              </Title>
            </div>

            <div className="fade-up fade-delay-2">
              <Paragraph style={{ fontSize: 16, color: mutedColor }}>
                Connect with developers, create your profile, share ideas, post
                updates, and collaborate — all in one beautiful MERN + React +
                Redux Toolkit + Ant Design application.
              </Paragraph>
            </div>

            {/* ---------- AUTH BUTTONS ---------- */}
            <div
              className="fade-up fade-delay-3"
              style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
            >
              {!isAuthenticated ? (
                <>
                  <Link to="/users/register">
                    <Button
                      type="primary"
                      size="large"
                      icon={<UserAddOutlined />}
                      style={{
                        borderRadius: 8,
                        fontWeight: 600,
                      }}
                    >
                      Register
                    </Button>
                  </Link>

                  <Link to="/users/login">
                    <Button
                      size="large"
                      icon={<LoginOutlined />}
                      style={{
                        borderRadius: 8,
                        fontWeight: 600,
                      }}
                    >
                      Login
                    </Button>
                  </Link>

                  {/* OAuth */}
                  <a href={OAUTH_GITHUB}>
                    <Button
                      size="large"
                      icon={<GithubOutlined />}
                      style={{
                        borderRadius: 8,
                        fontWeight: 600,
                      }}
                    >
                      GitHub
                    </Button>
                  </a>

                  <a href={OAUTH_LINKEDIN}>
                    <Button
                      size="large"
                      icon={<LinkedinOutlined />}
                      style={{
                        borderRadius: 8,
                        fontWeight: 600,
                      }}
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
                      style={{
                        borderRadius: 8,
                        fontWeight: 600,
                      }}
                    >
                      Dashboard
                    </Button>
                  </Link>

                  <Link to="/profiles/dashboard">
                    <Button
                      size="large"
                      icon={<UserOutlined />}
                      style={{
                        borderRadius: 8,
                        fontWeight: 600,
                      }}
                    >
                      View Profile
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </Col>

          {/* ---------- RIGHT FEATURE SECTION ---------- */}
          <Col xs={24} md={12}>
            <Row gutter={[16, 16]}>
              <Col xs={12}>
                <Card
                  className="feature-card fade-up fade-delay-1"
                  bordered={false}
                  style={{
                    borderRadius: 14,
                    padding: 18,
                    background: themeMode === "dark" ? "#001529" : "#ffffff",
                  }}
                >
                  <TeamOutlined
                    style={{ fontSize: 36, color: primary, marginBottom: 12 }}
                  />
                  <Title level={4} style={{ margin: 0, color: textColor }}>
                    Meet Developers
                  </Title>
                  <Paragraph style={{ color: mutedColor }}>
                    Explore profiles & collaborate.
                  </Paragraph>
                </Card>
              </Col>

              <Col xs={12}>
                <Card
                  className="feature-card fade-up fade-delay-2"
                  bordered={false}
                  style={{
                    borderRadius: 14,
                    padding: 18,
                    background: themeMode === "dark" ? "#001529" : "#ffffff",
                  }}
                >
                  <ThunderboltOutlined
                    style={{ fontSize: 36, color: "#faad14", marginBottom: 12 }}
                  />
                  <Title level={4} style={{ margin: 0, color: textColor }}>
                    Share Posts
                  </Title>
                  <Paragraph style={{ color: mutedColor }}>
                    Post ideas, questions & updates.
                  </Paragraph>
                </Card>
              </Col>

              <Col xs={24}>
                <Card
                  className="feature-card fade-up fade-delay-3"
                  bordered={false}
                  style={{
                    borderRadius: 14,
                    padding: 18,
                    background: themeMode === "dark" ? "#001529" : "#ffffff",
                  }}
                >
                  <Row align="middle">
                    <Col span={6}>
                      <GithubOutlined
                        style={{ fontSize: 30, color: textColor }}
                      />
                    </Col>
                    <Col span={18}>
                      <Title level={5} style={{ margin: 0, color: textColor }}>
                        Showcase Projects
                      </Title>
                      <Text style={{ color: mutedColor }}>
                        Highlight open-source contributions.
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
