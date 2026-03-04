import React, { useState } from "react";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBlogById } from "../../services/blog-api";
import BlogPostCard from "../../components/Blog/BlogPostCard";
import CommentBlog from "../../components/Blog/CommentBlog";
import { EditOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import EditBlogModal from "../../components/Blog/EditBlogModal";
import { useUserStore } from "../../stores/user";

const suggestPosts = [
  {
    author: "Alec Whitten",
    date: "1 Jan 2023",
    title: "Bill Walsh leadership lessons",
    description:
      "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
    tags: ["Leadership", "Management"],
    imageUrl:
      "https://tailieu.antoanthongtin.vn/files/images/site-2/20240827/17000-lo-hong-moi-de-doa-an-ninh-mang-viet-nam-trong-nua-dau-2024-17-27082024160904.png",
  },
  {
    author: "Alec Whitten1",
    date: "1 Jan 2023",
    title: "Bill Walsh leadership lessons",
    description:
      "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
    tags: ["Leadership", "Management"],
    imageUrl:
      "https://tailieu.antoanthongtin.vn/files/images/site-2/20240827/17000-lo-hong-moi-de-doa-an-ninh-mang-viet-nam-trong-nua-dau-2024-17-27082024160904.png",
  },
  {
    author: "Alec Whitten2",
    date: "1 Jan 2023",
    title: "Bill Walsh leadership lessons",
    description:
      "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
    tags: ["Leadership", "Management"],
    imageUrl:
      "https://media.istockphoto.com/id/1420039900/vi/anh/cyber-security-security-ransomware-email-phishing-c%C3%B4ng-ngh%E1%BB%87-m%C3%A3-h%C3%B3a-th%C3%B4ng-tin-k%E1%BB%B9-thu%E1%BA%ADt-s%E1%BB%91-%C4%91%C6%B0%E1%BB%A3c.jpg?s=612x612&w=0&k=20&c=N8r6hbstnXisoQQQzQ3uP5JUwO04veRJ_IceAJt0Ih8=",
  },
];

const BlogDetail: React.FC = () => {
  const user = useUserStore((state) => state.user);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { blogId } = useParams();
  const { data, refetch } = useQuery({
    queryKey: ["fetchBlogDetail", blogId],
    queryFn: async () => {
      const response = await getBlogById({ blogId: Number(blogId) });
      return response;
    },
  });

  // Tính số phút đọc
  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 100; // Tốc độ đọc trung bình
    const wordCount = content.split(/\s+/).length; // Đếm số từ
    return Math.ceil(wordCount / wordsPerMinute); // Làm tròn lên
  };

  const readingTime = data?.data ? calculateReadingTime(data.data.content) : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {data?.data && (
        <>
          <div className="text-left text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2">
            <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {readingTime} {readingTime === 1 ? "minute" : "minutes"} read
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-4">
            {data?.data.title}{" "}
            {(user?.role == "SOCMANAGER" || user?.id == data.data.authorId) && (
              <span
                className="cursor-pointer"
                onClick={() => {
                  setIsOpenModal(true);
                }}
              >
                <EditOutlined />
              </span>
            )}
          </h1>
          <div className="flex gap-2 justify-center items-center text-center pb-2">
            <h6 className="text-base italic">
              {data.data.authorName.trim()
                ? data.data.authorName
                : "Author Name"}
            </h6>
            <h6>-</h6>
            <div className="text-blue-600 text-base">
              {data?.data?.createdDate
                ? new Date(data.data.createdDate).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false, // Đặt thành `true` nếu muốn sử dụng định dạng 12 giờ
                  })
                : "Not specified"}
            </div>
          </div>

          {data.data.imageUrl ? (
            <div>
              {" "}
              <img
                src={`http://localhost:5173${data.data.imageUrl}`}
                alt="anh blog"
                className="max-w-3xl h-auto rounded-lg shadow-lg mb-6 mx-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src =
                    "https://tailieu.antoanthongtin.vn/files/images/site-2/20240827/17000-lo-hong-moi-de-doa-an-ninh-mang-viet-nam-trong-nua-dau-2024-17-27082024160904.png";
                }}
              />
            </div>
          ) : (
            <div>
              <img
                src="https://tailieu.antoanthongtin.vn/files/images/site-2/20240827/17000-lo-hong-moi-de-doa-an-ninh-mang-viet-nam-trong-nua-dau-2024-17-27082024160904.png"
                alt="anh blog2"
                className="max-w-3xl h-auto rounded-lg shadow-lg mb-6 mx-auto"
              />
            </div>
          )}

          <div className="text-gray-700 text-base leading-relaxed mb-8 text-left px-40">
            {data.data.content.split("\n").map(
              (paragraph, index) =>
                paragraph.trim() && (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                )
            )}
          </div>

          {/* comment */}
          <div>{blogId && <CommentBlog blogId={blogId} />}</div>

          <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Blog suggested</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestPosts.map((post, index) => (
                <BlogPostCard
                  key={index}
                  id={index}
                  author={post.author}
                  date={post.date}
                  title={post.title}
                  description={post.description}
                  tags={post.tags}
                  imageUrl={post.imageUrl}
                />
              ))}
            </div>
          </div>

          <Modal
            open={isOpenModal}
            onCancel={() => {
              setIsOpenModal(false);
            }}
            footer={null}
          >
            <EditBlogModal
              blogData={data.data}
              refetch={refetch}
              setIsOpenModal={setIsOpenModal}
            />
          </Modal>
        </>
      )}
    </div>
  );
};

export default BlogDetail;
