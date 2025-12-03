import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Input,
  Button,
  Typography,
  Row,
  Col,
  Avatar,
  Space,
  Image,
  Form,
  Divider,
  Empty,
  Popconfirm,
  message,
} from "antd";
import {
  ArrowLeftOutlined,
  SendOutlined,
  DeleteOutlined,
  UserOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import type { RootState } from "../../../redux/store";
import {
  GET_POST,
  CREATE_COMMENT,
  DELETE_COMMENT,
} from "../../../redux/posts/post.types";
import Spinner from "../../../layout/util/Spinner";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const PostDetails: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const [form] = Form.useForm();

  // Redux State
  const { loading, selectedPost } = useSelector(
    (state: RootState) => state.post
  );
  const { user } = useSelector((state: RootState) => state.user);

  // Load post on mount
  useEffect(() => {
    if (postId) {
      dispatch({ type: GET_POST, payload: { postId } });
    }
  }, [postId, dispatch]);

  // Create Comment Handler
  const onCreateComment = (values: { text: string }) => {
    if (!postId) return;

    dispatch({
      type: CREATE_COMMENT,
      payload: { postId, comment: values.text },
    });
    form.resetFields();
  };

  // Delete Comment Handler
  const handleDeleteComment = (commentId: string) => {
    if (!postId) return;

    dispatch({
      type: DELETE_COMMENT,
      payload: { postId, commentId },
    });
    message.success("Comment deleted");
  };

  if (loading || !selectedPost) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <Spinner tip="Loading post..." />
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
      }}
    >
      <Row justify="center">
        <Col xs={24} lg={18} xl={16}>
          {/* Back Button */}
          <Card style={{ marginBottom: 16 }}>
            <Button
              type="default"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate("/posts/list")}
            >
              Back to Posts
            </Button>
          </Card>

          {/* Post Details Card */}
          <Card style={{ marginBottom: 24 }}>
            <Row gutter={24}>
              {/* User Info */}
              <Col xs={24} sm={4} style={{ textAlign: "center" }}>
                <Avatar
                  size={80}
                  src={selectedPost.avatar}
                  icon={!selectedPost.avatar && <UserOutlined />}
                />
                <div style={{ marginTop: 12 }}>
                  <Title level={5} style={{ margin: 0 }}>
                    {selectedPost.name}
                  </Title>
                </div>
              </Col>

              {/* Post Content */}
              <Col xs={24} sm={20}>
                <Paragraph style={{ fontSize: 16, marginBottom: 16 }}>
                  {selectedPost.text}
                </Paragraph>

                {selectedPost.image && (
                  <div style={{ marginBottom: 16 }}>
                    <Image
                      src={selectedPost.image}
                      alt="Post image"
                      style={{ maxWidth: "100%", borderRadius: 8 }}
                    />
                  </div>
                )}

                <Text type="secondary" style={{ fontSize: 12 }}>
                  Posted on{" "}
                  {new Date(selectedPost.createdAt || "").toLocaleDateString()}{" "}
                  at{" "}
                  {new Date(selectedPost.createdAt || "").toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </Text>
              </Col>
            </Row>
          </Card>

          {/* Comments Section */}
          <Card
            title={
              <Space>
                <MessageOutlined />
                <span>Comments ({selectedPost.comments?.length || 0})</span>
              </Space>
            }
          >
            {/* Add Comment Form */}
            {user && (
              <div style={{ marginBottom: 24 }}>
                <Form form={form} onFinish={onCreateComment} layout="vertical">
                  <Row gutter={16} align="middle">
                    <Col xs={24} sm={2}>
                      <Avatar
                        size={48}
                        src={user.avatar}
                        icon={!user.avatar && <UserOutlined />}
                      />
                    </Col>
                    <Col xs={24} sm={22}>
                      <Form.Item
                        name="text"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your comment",
                          },
                          { min: 1, message: "Comment cannot be empty" },
                        ]}
                      >
                        <TextArea
                          rows={3}
                          placeholder="Write a comment..."
                          maxLength={500}
                          showCount
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          icon={<SendOutlined />}
                        >
                          Add Comment
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            )}

            <Divider />

            {/* Comments List */}
            {selectedPost.comments && selectedPost.comments.length > 0 ? (
              selectedPost.comments.map((comment) => (
                <Card
                  key={comment._id}
                  style={{ marginBottom: 16 }}
                  size="small"
                >
                  <Row gutter={16}>
                    <Col xs={24} sm={2} style={{ textAlign: "center" }}>
                      <Avatar
                        size={48}
                        src={comment.avatar}
                        icon={!comment.avatar && <UserOutlined />}
                      />
                    </Col>
                    <Col xs={24} sm={19}>
                      <div>
                        <Text strong>{comment.name}</Text>
                        <div style={{ marginTop: 8 }}>
                          <Paragraph style={{ marginBottom: 8 }}>
                            {comment.text}
                          </Paragraph>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {new Date(comment.date || "").toLocaleDateString()}
                          </Text>
                        </div>
                      </div>
                    </Col>
                    <Col xs={24} sm={3} style={{ textAlign: "right" }}>
                      {user && comment.user === user._id && comment._id && (
                        <Popconfirm
                          title="Delete this comment?"
                          onConfirm={() => handleDeleteComment(comment._id!)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            size="small"
                          />
                        </Popconfirm>
                      )}
                    </Col>
                  </Row>
                </Card>
              ))
            ) : (
              <Empty
                description="No comments yet. Be the first to comment!"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PostDetails;
