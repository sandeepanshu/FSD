import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  Card, 
  Table, 
  Button, 
  Typography, 
  Space, 
  Tag, 
  Row, 
  Col,
  Divider,
  Empty,
  Statistic
} from "antd";
import { 
  UserOutlined, 
  EditOutlined, 
  PlusOutlined, 
  ReadOutlined,
  ShopOutlined,
  DeleteOutlined,
  DashboardOutlined,
  RocketOutlined 
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../../layout/util/Spinner";
import type { RootState } from "../../../redux/store";
import type { BaseExperience, BaseEducation } from "../../../shared/types";
import {
  FETCH_MY_PROFILE,
  DELETE_EXPERIENCE,
  DELETE_EDUCATION,
} from "../../../redux/profiles/profile.types";

const { Title, Text, Paragraph } = Typography;

 
const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, user, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );
  const { profile, loading: profileLoading } = useSelector(
    (state: RootState) => state.profile
  );

  // ✅ Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate("/users/login");
    }
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch({ type: FETCH_MY_PROFILE });
    }
  }, [dispatch, isAuthenticated]);

  const handleDeleteExperience = (expId?: string) => {
    if (expId) {
      if (window.confirm("Are you sure you want to delete this experience?")) {
        dispatch({ type: DELETE_EXPERIENCE, payload: { id: expId } });
      }
    }
  };

  const handleDeleteEducation = (eduId?: string) => {
    if (eduId) {
      if (window.confirm("Are you sure you want to delete this education?")) {
        dispatch({ type: DELETE_EDUCATION, payload: { id: eduId } });
      }
    }
  };

  // Experience table columns
  const experienceColumns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (location: string) => location || '-'
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
      render: (date: string) => new Date(date).toLocaleDateString()
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
      render: (date: string) => date ? new Date(date).toLocaleDateString() : 'Present'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: unknown, record: BaseExperience) => (
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          size="small"
          onClick={() => handleDeleteExperience(record._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  // Education table columns
  const educationColumns = [
    {
      title: 'School',
      dataIndex: 'school',
      key: 'school',
    },
    {
      title: 'Degree',
      dataIndex: 'degree',
      key: 'degree',
    },
    {
      title: 'Field of Study',
      dataIndex: 'fieldOfStudy',
      key: 'fieldOfStudy',
      render: (field: string) => field || '-'
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
      render: (date: string) => new Date(date).toLocaleDateString()
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
      render: (date: string) => date ? new Date(date).toLocaleDateString() : 'Present'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: unknown, record: BaseEducation) => (
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          size="small"
          onClick={() => handleDeleteEducation(record._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  // Prepare data for tables
  const experienceData = (profile?.experience || []).map((exp: BaseExperience, index: number) => ({
    ...exp,
    key: exp._id || `exp-${index}`
  }));

  const educationData = (profile?.education || []).map((edu: BaseEducation, index: number) => ({
    ...edu,
    key: edu._id || `edu-${index}`
  }));

  if (loading || profileLoading) {
    return <Spinner tip="Loading dashboard..." />;
  }

  // ✅ Show loading while checking authentication
  if (!isAuthenticated && loading) {
    return <Spinner tip="Checking authentication..." />;
  }

  return (
    <div style={{ padding: '24px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Row gutter={[24, 24]}>
        {/* Left Side - Welcome Card */}
        <Col xs={24} md={8}>
          <Card 
            style={{ height: '100%' }}
            cover={
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ 
                  width: 100, 
                  height: 100, 
                  borderRadius: '50%', 
                  backgroundColor: '#1890ff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16
                }}>
                  <UserOutlined style={{ fontSize: 48, color: '#fff' }} />
                </div>
                <Title level={3}>{user?.name}</Title>
                <Text type="secondary">{user?.email}</Text>
              </div>
            }
          >
            <div style={{ textAlign: 'center' }}>
              <Statistic 
                title="Experience" 
                value={profile?.experience?.length || 0} 
                prefix={<ShopOutlined />}
              />
              <Divider style={{ margin: '12px 0' }} />
              <Statistic 
                title="Education" 
                value={profile?.education?.length || 0} 
                prefix={<ReadOutlined />}
              />
            </div>
          </Card>
        </Col>

        {/* Right Side - Main Content */}
        <Col xs={24} md={16}>
          {/* Dashboard Header */}
          <Card style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Title level={2} style={{ margin: 0 }}>
                  <DashboardOutlined /> Dashboard
                </Title>
                <Text type="secondary">Welcome back, {user?.name}!</Text>
              </div>
              <div>
                <Space>
                  {profile ? (
                    <>
                      <Link to={`/profiles/edit/${profile._id}`}>
                        <Button type="primary" icon={<EditOutlined />}>
                          Edit Profile
                        </Button>
                      </Link>
                      <Link to="/profiles/experience">
                        <Button icon={<PlusOutlined />}>
                          Add Experience
                        </Button>
                      </Link>
                      <Link to="/profiles/education">
                        <Button icon={<ReadOutlined />}>
                          Add Education
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <Link to="/profiles/create">
                      <Button type="primary" icon={<RocketOutlined />}>
                        Create Profile
                      </Button>
                    </Link>
                  )}
                </Space>
              </div>
            </div>
          </Card>

          {/* Skills Section */}
          {profile?.skills && profile.skills.length > 0 && (
            <Card title="Skills" style={{ marginBottom: 24 }}>
              <Space wrap>
                {profile.skills.map((skill: string, index: number) => (
                  <Tag color="blue" key={index} style={{ padding: '4px 12px', fontSize: '14px' }}>
                    {skill}
                  </Tag>
                ))}
              </Space>
            </Card>
          )}

          {/* Bio Section */}
          {profile?.bio && (
            <Card title="About" style={{ marginBottom: 24 }}>
              <Paragraph>{profile.bio}</Paragraph>
            </Card>
          )}

          {/* Experience Section */}
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ShopOutlined style={{ marginRight: 8 }} />
                Experience Details
              </div>
            }
            style={{ marginBottom: 24 }}
          >
            {profile?.experience && profile.experience.length > 0 ? (
              <Table 
                dataSource={experienceData}
                columns={experienceColumns}
                rowKey="_id"
                pagination={false}
                size="middle"
              />
            ) : (
              <Empty 
                description="No experience added yet" 
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              >
                <Link to="/profiles/experience">
                  <Button type="primary" icon={<PlusOutlined />}>
                    Add First Experience
                  </Button>
                </Link>
              </Empty>
            )}
          </Card>

          {/* Education Section */}
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ReadOutlined style={{ marginRight: 8 }} />
                Education Details
              </div>
            }
          >
            {profile?.education && profile.education.length > 0 ? (
              <Table 
                dataSource={educationData}
                columns={educationColumns}
                rowKey="_id"
                pagination={false}
                size="middle"
              />
            ) : (
              <Empty 
                description="No education added yet" 
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              >
                <Link to="/profiles/education">
                  <Button type="primary" icon={<PlusOutlined />}>
                    Add First Education
                  </Button>
                </Link>
              </Empty>
            )}
          </Card>

          {/* Additional Info */}
          <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
            {profile?.company && (
              <Col xs={24} sm={12} md={8}>
                <Card size="small">
                  <Text strong>Company</Text>
                  <br />
                  <Text>{profile.company}</Text>
                </Card>
              </Col>
            )}
            {profile?.website && (
              <Col xs={24} sm={12} md={8}>
                <Card size="small">
                  <Text strong>Website</Text>
                  <br />
                  <a href={profile.website} target="_blank" rel="noopener noreferrer">
                    {profile.website}
                  </a>
                </Card>
              </Col>
            )}
            {profile?.location && (
              <Col xs={24} sm={12} md={8}>
                <Card size="small">
                  <Text strong>Location</Text>
                  <br />
                  <Text>{profile.location}</Text>
                </Card>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;