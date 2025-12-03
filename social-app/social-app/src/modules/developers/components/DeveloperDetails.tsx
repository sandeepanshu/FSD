// src/components/developers/DeveloperDetails.tsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col, Avatar, Typography, Tag, Divider, Spin } from "antd";
import { UserOutlined, CheckCircleOutlined } from "@ant-design/icons";

import type { RootState } from "../../../redux/store";
import type { IDeveloper } from "../../developers/models/IDeveloper";
import { FETCH_DEVELOPER } from "../../../redux/developers/developer.types";

const { Title, Text, Paragraph } = Typography;

const DeveloperDetails: React.FC = () => {
  const dispatch = useDispatch();
  const { developerId } = useParams<{ developerId: string }>();

  const { loading, selectedDeveloper } = useSelector(
    (state: RootState) => state.developer
  );

  useEffect(() => {
    if (developerId) {
      dispatch({ type: FETCH_DEVELOPER, payload: { profileId: developerId } });
    }
  }, [developerId, dispatch]);

  if (loading || !selectedDeveloper) {
    return (
      <div style={{ textAlign: "center", padding: 40 }}>
        <Spin size="large" />
      </div>
    );
  }

  const dev: IDeveloper = selectedDeveloper;
  const userObj =
    typeof dev.user === "string" || !dev.user
      ? { name: "Unknown", avatar: undefined }
      : dev.user;

  return (
    <div style={{ padding: 32 }}>
      <Card style={{ borderRadius: 12, marginBottom: 24 }} bodyStyle={{ padding: 24 }}>
        <Row gutter={24} align="middle">
          <Col xs={24} md={6} style={{ textAlign: "center" }}>
            <Avatar
              size={150}
              src={userObj?.avatar || undefined}
              icon={<UserOutlined />}
              style={{ border: "4px solid #1890ff" }}
            />
            <Title level={3} style={{ marginTop: 16 }}>
              {userObj?.name || "Unknown"}
            </Title>
            <Text strong>{dev.designation || "—"}</Text>
            <br />
            <Text>{dev.company || "—"}</Text>
            <br />
            <Text type="secondary">{dev.location || "—"}</Text>
          </Col>

          <Col xs={24} md={18}>
            <Title level={4}>About</Title>
            <Paragraph>{dev.bio || "No biography available."}</Paragraph>

            <Divider />

            <Title level={4}>Social Links</Title>
            <Row gutter={16}>
              {dev.social &&
                Object.entries(dev.social).map(([platform, url]) =>
                  url ? (
                    <Col key={platform}>
                      <a href={url} target="_blank" rel="noreferrer">
                        <Tag color="blue" style={{ padding: "6px 12px" }}>
                          {platform.toUpperCase()}
                        </Tag>
                      </a>
                    </Col>
                  ) : null
                )}
            </Row>
          </Col>
        </Row>
      </Card>

      <Card title="Skills" style={{ borderRadius: 12, marginBottom: 24 }} bodyStyle={{ padding: 24 }}>
        {dev.skills && dev.skills.length ? (
          dev.skills.map((skill) => (
            <Tag key={skill} icon={<CheckCircleOutlined />} style={{ marginBottom: 8 }}>
              {skill}
            </Tag>
          ))
        ) : (
          <Text>No skills added.</Text>
        )}
      </Card>

      <Row gutter={24}>
        <Col xs={24} md={12}>
          <Card title="Experience" style={{ borderRadius: 12, marginBottom: 24 }} bodyStyle={{ padding: 24 }}>
            {dev.experience && dev.experience.length ? (
              dev.experience.map((exp) => (
                <Card key={exp._id} style={{ marginBottom: 12 }}>
                  <Title level={5}>{exp.title}</Title>
                  <Text strong>{exp.company}</Text>
                  <br />
                  <Text>{exp.location}</Text>
                  <br />
                  <Text type="secondary">
                    {exp.from} - {exp.to || "Current"}
                  </Text>
                  <Paragraph>{exp.description}</Paragraph>
                </Card>
              ))
            ) : (
              <Text>No experience added.</Text>
            )}
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Education" style={{ borderRadius: 12, marginBottom: 24 }} bodyStyle={{ padding: 24 }}>
            {dev.education && dev.education.length ? (
              dev.education.map((edu) => (
                <Card key={edu._id} style={{ marginBottom: 12 }}>
                  <Title level={5}>{edu.degree}</Title>
                  <Text strong>{edu.school}</Text>
                  <br />
                  <Text>{edu.fieldOfStudy}</Text>
                  <br />
                  <Text type="secondary">
                    {edu.from} - {edu.to || "Current"}
                  </Text>
                  <Paragraph>{edu.description}</Paragraph>
                </Card>
              ))
            ) : (
              <Text>No education added.</Text>
            )}
          </Card>
        </Col>
      </Row>

      <div style={{ height: 80 }} />
    </div>
  );
};

export default DeveloperDetails;
