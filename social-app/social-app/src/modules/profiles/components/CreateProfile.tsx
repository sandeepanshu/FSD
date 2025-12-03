import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Row,
  Col,
  Select,
  Space,
  Divider,
  Alert,
} from "antd";
import {
  UserOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  CodeOutlined,
  EditOutlined,
  GithubOutlined,
  YoutubeOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import type { ProfileView } from "../../../modules/profiles/models/ProfileView";
import {
  CREATE_PROFILE,
  type SubmitProfilePayload,
} from "../../../redux/profiles/profile.types";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const CreateProfile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Designation options
  const designationOptions = [
    { value: "Junior Developer", label: "Junior Developer" },
    { value: "Developer", label: "Developer" },
    { value: "Senior Developer", label: "Senior Developer" },
    { value: "Tech Lead", label: "Tech Lead" },
    { value: "Software Engineer", label: "Software Engineer" },
    { value: "Full Stack Developer", label: "Full Stack Developer" },
    { value: "Frontend Developer", label: "Frontend Developer" },
    { value: "Backend Developer", label: "Backend Developer" },
    { value: "DevOps Engineer", label: "DevOps Engineer" },
    { value: "Junior Manager", label: "Junior Manager" },
    { value: "Senior Manager", label: "Senior Manager" },
    { value: "Director", label: "Director" },
    { value: "CTO", label: "CTO" },
    { value: "CEO", label: "CEO" },
  ];

  const onFinish = (values: any) => {
    setLoading(true);
    setError(null);

    try {
      // Prepare profile data for backend
      const profileData: ProfileView = {
        company: values.company,
        website: values.website,
        location: values.location,
        designation: values.designation,
        skills: values.skills.split(",").map((skill: string) => skill.trim()).filter(Boolean),
        bio: values.bio,
        githubUsername: values.githubUsername,
        social: {
          youtube: values.youtube || undefined,
          facebook: values.facebook || undefined,
          twitter: values.twitter || undefined,
          instagram: values.instagram || undefined,
          linkedin: values.linkedin || undefined,
        },
      };

      const payload: SubmitProfilePayload = {
        profile: profileData,
        navigate,
      };

      dispatch({ type: CREATE_PROFILE, payload });
    } catch (err) {
      setError("Failed to process form data. Please try again.");
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  // Social media input configuration
  const socialInputs = [
    {
      name: "youtube",
      placeholder: "YouTube URL",
      prefix: <YoutubeOutlined />,
      icon: <YoutubeOutlined />,
    },
    {
      name: "facebook",
      placeholder: "Facebook URL",
      prefix: <FacebookOutlined />,
      icon: <FacebookOutlined />,
    },
    {
      name: "twitter",
      placeholder: "Twitter URL",
      prefix: <TwitterOutlined />,
      icon: <TwitterOutlined />,
    },
    {
      name: "instagram",
      placeholder: "Instagram URL",
      prefix: <InstagramOutlined />,
      icon: <InstagramOutlined />,
    },
    {
      name: "linkedin",
      placeholder: "LinkedIn URL",
      prefix: <LinkedinOutlined />,
      icon: <LinkedinOutlined />,
    },
  ];

  return (
    <div style={{ padding: "24px", backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Card
            style={{ borderRadius: 8 }}
            title={
              <div style={{ textAlign: "center" }}>
                <Title level={3} style={{ margin: 0 }}>
                  <UserOutlined style={{ marginRight: 8 }} />
                  Create Your Profile
                </Title>
                <Text type="secondary">
                  Build your profile to showcase your skills, experience, and social presence
                </Text>
              </div>
            }
          >
            {error && (
              <Alert
                message="Error"
                description={error}
                type="error"
                showIcon
                style={{ marginBottom: 24 }}
                closable
                onClose={() => setError(null)}
              />
            )}

            <Form
              form={form}
              name="create-profile"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              {/* Company */}
              <Form.Item
                label="Company"
                name="company"
                rules={[
                  { required: true, message: "Please enter your company" },
                  { min: 2, message: "Company must be at least 2 characters" },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter your company name"
                  prefix={<UserOutlined />}
                  allowClear
                />
              </Form.Item>

              {/* Website */}
              <Form.Item
                label="Website"
                name="website"
                rules={[
                  { required: true, message: "Please enter your website" },
                  { type: "url", message: "Please enter a valid URL" },
                ]}
              >
                <Input
                  size="large"
                  placeholder="https://example.com"
                  prefix={<GlobalOutlined />}
                  allowClear
                />
              </Form.Item>

              {/* Location */}
              <Form.Item
                label="Location"
                name="location"
                rules={[
                  { required: true, message: "Please enter your location" },
                ]}
              >
                <Input
                  size="large"
                  placeholder="City, Country"
                  prefix={<EnvironmentOutlined />}
                  allowClear
                />
              </Form.Item>

              {/* Designation */}
              <Form.Item
                label="Designation"
                name="designation"
                rules={[
                  { required: true, message: "Please select your designation" },
                ]}
              >
                <Select
                  size="large"
                  placeholder="Select your designation"
                  allowClear
                >
                  {designationOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Skills */}
              <Form.Item
                label="Skills"
                name="skills"
                extra="Separate skills with commas (e.g., JavaScript, React, Node.js)"
                rules={[
                  { required: true, message: "Please enter your skills" },
                ]}
              >
                <Input
                  size="large"
                  placeholder="JavaScript, React, Node.js, etc."
                  prefix={<CodeOutlined />}
                  allowClear
                />
              </Form.Item>

              {/* GitHub Username */}
              <Form.Item
                label="GitHub Username"
                name="githubUsername"
                rules={[
                  { required: true, message: "Please enter your GitHub username" },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Your GitHub username"
                  prefix={<GithubOutlined />}
                  allowClear
                />
              </Form.Item>

              {/* Bio */}
              <Form.Item
                label="Bio"
                name="bio"
                rules={[
                  { required: true, message: "Please enter your bio" },
                  { min: 10, message: "Bio must be at least 10 characters" },
                  { max: 500, message: "Bio must not exceed 500 characters" },
                ]}
              >
                <TextArea
                  rows={4}
                  placeholder="Tell us about yourself, your experience, and your interests..."
                  showCount
                  maxLength={500}
                />
              </Form.Item>

              <Divider>
                <Text strong>Social Media Links (Optional)</Text>
              </Divider>

              {/* Social Media Inputs */}
              <Row gutter={[16, 16]}>
                {socialInputs.map((social) => (
                  <Col xs={24} sm={12} key={social.name}>
                    <Form.Item
                      name={social.name}
                      rules={[
                        {
                          type: "url",
                          message: "Please enter a valid URL",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder={social.placeholder}
                        prefix={social.prefix}
                        allowClear
                      />
                    </Form.Item>
                  </Col>
                ))}
              </Row>

              {/* Submit Button */}
              <Form.Item style={{ marginTop: 32 }}>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    icon={<PlusOutlined />}
                    loading={loading}
                  >
                    {loading ? "Creating Profile..." : "Create Profile"}
                  </Button>
                  <Button
                    type="default"
                    size="large"
                    icon={<EditOutlined />}
                    onClick={() => navigate("/profiles/dashboard")}
                  >
                    Back to Dashboard
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>

          {/* Help Text */}
          <div style={{ marginTop: 24, textAlign: "center" }}>
            <Text type="secondary">
              <small>
                Note: All fields are required except social media links.
                Your profile will be visible to other developers once created.
              </small>
            </Text>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CreateProfile;