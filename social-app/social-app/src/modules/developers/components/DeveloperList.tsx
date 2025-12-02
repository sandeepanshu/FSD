import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col, Tag, Avatar, Typography, Button, Spin } from "antd";
import { UserOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import type { RootState } from "../../../redux/store";
import type { IDeveloper } from "../models/IDeveloper";
import { FETCH_ALL_DEVELOPERS } from "../../../redux/developers/developer.types";

const { Title, Text } = Typography;

const DeveloperList: React.FC = () => {
  const dispatch = useDispatch();

  // FIXED reducer key
  const { loading, developers } = useSelector(
    (state: RootState) => state.developer
  );

  useEffect(() => {
    dispatch({ type: FETCH_ALL_DEVELOPERS });
  }, [dispatch]);

  return (
    <div style={{ padding: "32px" }}>
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
          {developers?.map((developer: IDeveloper) => (
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
                    src={developer.user?.avatar}
                    icon={!developer.user?.avatar && <UserOutlined />}
                  />

                  <div>
                    <Title level={4} style={{ margin: 0 }}>
                      {developer.user?.name}
                    </Title>
                    <Text type="secondary">{developer.designation}</Text>
                    <br />
                    <Text>{developer.company}</Text>
                    <br />
                    <Text>{developer.location}</Text>
                  </div>
                </div>

                <div style={{ marginTop: 16 }}>
                  <Title level={5}>Skills</Title>
                  {developer.skills?.map((skill: string) => (
                    <Tag
                      key={skill}
                      color="success"
                      style={{ marginBottom: 6 }}
                      icon={<CheckCircleOutlined />}
                    >
                      {skill}
                    </Tag>
                  ))}
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
          ))}
        </Row>
      )}
    </div>
  );
};

export default DeveloperList;
