import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Card,
  Input,
  Button,
  Typography,
  Row,
  Col,
  Avatar,
  Space,
  Divider,
  Image,
  Form,
  Empty,
  Popconfirm,
  message,
} from "antd";
import {
  LikeOutlined,
  DislikeOutlined,
  MessageOutlined,
  DeleteOutlined,
  SendOutlined,
  GlobalOutlined,
  PictureOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { RootState } from "../../../redux/store";
import {
  CREATE_POST,
  GET_ALL_POSTS,
  LIKE_POST,
  DISLIKE_POST,
  DELETE_POST,
} from "../../../redux/posts/post.types";
import Spinner from "../../../layout/util/Spinner";
import type { PostView } from "../../../modules/posts/models/PostView";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const PostList: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  // Load all posts on mount
  useEffect(() => {
    dispatch({ type: GET_ALL_POSTS });
  }, [dispatch]);

  // Redux State
  const { user } = useSelector((state: RootState) => state.user);
  const { loading: postsLoading, posts } = useSelector(
    (state: RootState) => state.post
  );

  // Create Post Handler
  const onCreatePost = (values: { text: string; image: string }) => {
    setLoading(true);
    dispatch({
      type: CREATE_POST,
      payload: values,
    });
    form.resetFields();
    setLoading(false);
  };

  // Like Post Handler
  const handleLikePost = (postId: string) => {
    dispatch({
      type: LIKE_POST,
      payload: { postId },
    });
  };

  // Dislike Post Handler
  const handleDislikePost = (postId: string) => {
    dispatch({
      type: DISLIKE_POST,
      payload: { postId },
    });
  };

  // Delete Post Handler
  const handleDeletePost = (postId: string) => {
    dispatch({
      type: DELETE_POST,
      payload: { postId },
    });
    message.success("Post deleted successfully");
  };

  // Check if user liked the post
  const hasLiked = (post: PostView) => {
    return post.likes?.some((like) => like.user === user?._id) || false;
  };

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
          {/* Header */}
          <Card style={{ marginBottom: 24 }}>
            <Title level={3}>
              <GlobalOutlined style={{ marginRight: 8 }} />
              Welcome to React Social Community
            </Title>
            <Text type="secondary">
              Share posts, engage, and interact with developers around the
              world.
            </Text>
          </Card>

          {/* Create Post Card */}
          <Card style={{ marginBottom: 24 }} title="Create a Post">
            <Form form={form} onFinish={onCreatePost} layout="vertical">
              <Row gutter={16} align="middle">
                <Col xs={24} md={3}>
                  <Avatar
                    size={64}
                    src={user?.avatar}
                    icon={!user?.avatar && <UserOutlined />}
                  />
                </Col>
                <Col xs={24} md={21}>
                  <Form.Item
                    name="text"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your post content",
                      },
                      { min: 1, message: "Post content cannot be empty" },
                    ]}
                  >
                    <TextArea
                      rows={3}
                      placeholder="What's on your mind?"
                      maxLength={500}
                      showCount
                    />
                  </Form.Item>

                  <Form.Item
                    name="image"
                    rules={[
                      { required: false },
                      { type: "url", message: "Please enter a valid URL" },
                    ]}
                  >
                    <Input
                      placeholder="Image URL (optional)"
                      prefix={<PictureOutlined />}
                      allowClear
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<SendOutlined />}
                      loading={loading}
                    >
                      Post
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>

          {/* Posts List */}
          <Card title="All Posts">
            {postsLoading ? (
              <div style={{ textAlign: "center", padding: "40px" }}>
                <Spinner tip="Loading posts..." />
              </div>
            ) : posts.length === 0 ? (
              <Empty
                description="No posts yet. Be the first to share something!"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            ) : (
              posts.map((post) => (
                <Card
                  key={post._id}
                  style={{ marginBottom: 16 }}
                  bodyStyle={{ padding: 0 }}
                >
                  <div style={{ padding: 24 }}>
                    <Row gutter={16}>
                      {/* User Info */}
                      <Col xs={24} sm={4} style={{ textAlign: "center" }}>
                        <Avatar
                          size={64}
                          src={post.avatar}
                          icon={!post.avatar && <UserOutlined />}
                        />
                        <div style={{ marginTop: 8 }}>
                          <Text strong>{post.name}</Text>
                        </div>
                      </Col>

                      {/* Post Content */}
                      <Col xs={24} sm={20}>
                        <Paragraph style={{ marginBottom: 16 }}>
                          {post.text}
                        </Paragraph>

                        {post.image && (
                          <div style={{ marginBottom: 16 }}>
                            <Image
                              src={post.image}
                              alt="Post image"
                              style={{ maxWidth: "100%", borderRadius: 8 }}
                            />
                          </div>
                        )}

                        <Text type="secondary" style={{ fontSize: 12 }}>
                          Posted on{" "}
                          {new Date(post.createdAt || "").toLocaleDateString()}{" "}
                          at{" "}
                          {new Date(post.createdAt || "").toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </Text>
                      </Col>
                    </Row>
                  </div>

                  <Divider style={{ margin: 0 }} />

                  {/* Post Actions */}
                  <Row style={{ padding: "12px 24px" }}>
                    <Col span={24}>
                      <Space wrap>
                        <Button
                          type={hasLiked(post) ? "primary" : "default"}
                          icon={<LikeOutlined />}
                          onClick={() => post._id && handleLikePost(post._id)}
                        >
                          Like ({post.likes?.length || 0})
                        </Button>

                        <Button
                          type="default"
                          icon={<DislikeOutlined />}
                          onClick={() =>
                            post._id && handleDislikePost(post._id)
                          }
                        >
                          Dislike
                        </Button>

                        <Link to={`/posts/${post._id}`}>
                          <Button type="default" icon={<MessageOutlined />}>
                            Comments ({post.comments?.length || 0})
                          </Button>
                        </Link>

                        {/* Delete button (only for post owner) */}
                        {user?._id === post.user && post._id && (
                          <Popconfirm
                            title="Are you sure you want to delete this post?"
                            onConfirm={() => handleDeletePost(post._id!)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button
                              type="primary"
                              danger
                              icon={<DeleteOutlined />}
                            >
                              Delete
                            </Button>
                          </Popconfirm>
                        )}
                      </Space>
                    </Col>
                  </Row>
                </Card>
              ))
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PostList;
