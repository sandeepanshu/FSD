// src/components/developers/DeveloperList.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col, Tag, Avatar, Typography, Button, Spin } from "antd";
import { UserOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import type { RootState } from "../../../redux/store";
import type { IDeveloper } from "../../developers/models/IDeveloper";
import { FETCH_ALL_DEVELOPERS } from "../../../redux/developers/developer.types";

const { Title, Text } = Typography;

const DeveloperList: React.FC = () => {
  const dispatch = useDispatch();

  const { loading, developers } = useSelector(
    (state: RootState) => state.developer
  );

  useEffect(() => {
    dispatch({ type: FETCH_ALL_DEVELOPERS });
  }, [dispatch]);

  return (
    <div style={{ padding: 32 }}>
      <Title level={2} style={{ marginBottom: 8 }}>
        👨‍💻 Developers
      </Title>
      <Text type="secondary" style={{ fontSize: 16 }}>
        Explore talented developers, view their profiles, and collaborate.
      </Text>

      {loading ? (
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
          {developers && developers.length ? (
            developers.map((developer: IDeveloper) => {
              // user might be populated object or just id string — handle both
              const userObj =
                typeof developer.user === "string" || !developer.user
                  ? { name: "Unknown", avatar: undefined }
                  : developer.user;

              return (
                <Col xs={24} md={12} lg={8} key={developer._id}>
                  <Card
                    hoverable
                    style={{ borderRadius: 12 }}
                    bodyStyle={{ padding: 20 }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        marginBottom: 12,
                      }}
                    >
                      <Avatar
                        size={64}
                        src={userObj?.avatar || undefined}
                        icon={!userObj?.avatar ? <UserOutlined /> : undefined}
                      />
                      <div>
                        <Title level={4} style={{ margin: 0 }}>
                          {userObj?.name || "Unknown"}
                        </Title>
                        <Text type="secondary">
                          {developer.designation || "—"}
                        </Text>
                        <br />
                        <Text>{developer.company || "—"}</Text>
                        <br />
                        <Text>{developer.location || "—"}</Text>
                      </div>
                    </div>

                    <div style={{ marginTop: 16 }}>
                      <Title level={5}>Skills</Title>
                      {developer.skills && developer.skills.length ? (
                        developer.skills.map((skill) => (
                          <Tag
                            key={skill}
                            icon={<CheckCircleOutlined />}
                            style={{ marginBottom: 6 }}
                          >
                            {skill}
                          </Tag>
                        ))
                      ) : (
                        <Text type="secondary">No skills added</Text>
                      )}
                    </div>

                    <Link to={`/developers/${developer._id}`}>
                      <Button
                        type="primary"
                        block
                        style={{ marginTop: 16, fontWeight: 600 }}
                      >
                        View Profile
                      </Button>
                    </Link>
                  </Card>
                </Col>
              );
            })
          ) : (
            <Col span={24}>
              <Card>
                <Text type="secondary">No developers found.</Text>
              </Card>
            </Col>
          )}
        </Row>
      )}
    </div>
  );
};

export default DeveloperList;
