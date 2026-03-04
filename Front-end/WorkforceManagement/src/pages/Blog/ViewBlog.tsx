// src/components/BlogPage.tsx

import React, { useState } from "react";
import AddNew from "../../components/Blog/AddNewBlog";
import { Modal } from "antd";
import { useQuery } from "@tanstack/react-query";
import { deleteBlogById, getAllBlog } from "../../services/blog-api";
import { Pagination } from "../../components/Pagination";
import { useDebounce } from "../../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import TrashIcon from "../../assets/images/trash-icon.svg";
import { useUserStore } from "../../stores/user";
import { toast } from "sonner";

const BlogPage: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchString, setSearchString] = useState<string>("");
  const debouncedSearchString = useDebounce(searchString, 300);
  const [pageSize, setPageSize] = useState<number>(6);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  const { data, refetch } = useQuery({
    queryKey: ["fetchAllBlog", debouncedSearchString, currentPage, pageSize],
    queryFn: async () => {
      const response = await getAllBlog({
        SearchString: searchString,
        PageNumber: currentPage,
        PageSize: pageSize,
      });
      return response;
    },
    enabled: !!debouncedSearchString || debouncedSearchString === "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDeleteBlog = async (blogId: number) => {
    try {
      const response = await deleteBlogById({ blogId });
      toast.success("Delete blog success !");
      refetch();
      return response;
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end">
        <button
          className="px-4 py-2 text-base font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 transform hover:scale-[1.03] transition-all duration-200"
          onClick={showModal}
        >
          Add New Blog
        </button>
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <AddNew setIsModalOpen={setIsModalOpen} refetch={refetch} />
      </Modal>
      <div className="flex items-center justify-between flex-col md:flex-row flex-wrap space-y-4 md:space-y-0 py-8 bg-white">
        <div className="relative">
          <button
            id="dropdownActionButton"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5"
            type="button"
          >
            <span className="sr-only">Action button</span>
            Filter
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1l4 4 4-4"
              />
            </svg>
          </button>
          {/* Dropdown menu */}
          <div
            id="dropdownAction"
            className={`${
              dropdownOpen ? "" : "hidden"
            } absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}
          >
            <ul
              className="py-1 text-sm text-gray-700"
              aria-labelledby="dropdownActionButton"
            >
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Reward
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Promote
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Activate account
                </a>
              </li>
            </ul>
            <div className="py-1">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Delete User
              </a>
            </div>
          </div>
        </div>
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 19l-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search-users"
            className="block py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search blog by blog name"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-6">Knowledge Sharing</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data ? (
          data.data.blogs.map((item) => (
            <>
              <div
                key={item.blogId}
                className="flex flex-col border border-gray-200 rounded-lg overflow-hidden shadow-md hover:scale-[1.02] duration-150 hover:bg-blue-50 cursor-default"
                onClick={() => {
                  navigate(`/blog-detail/${item.blogId}`);
                }}
              >
                {item.imageUrl && item.imageUrl.length > 0 ? (
                  <div>
                    {" "}
                    <img
                      src={`http://localhost:5173${item.imageUrl}`}
                      alt="anh blog"
                      className="h-48 w-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement; // Ép kiểu
                        target.onerror = null; // Ngăn lỗi lặp vô hạn
                        target.src =
                          "https://vina-aspire.com/wp-content/uploads/2019/08/Hackr-attaching-Car.jpg"; // Ảnh thay thế
                      }}
                    />
                  </div>
                ) : (
                  <div>
                    <img
                      src="https://tailieu.antoanthongtin.vn/files/images/site-2/20240827/17000-lo-hong-moi-de-doa-an-ninh-mang-viet-nam-trong-nua-dau-2024-17-27082024160904.png"
                      alt="anh blog2"
                      className="h-48 w-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="text-sm text-gray-500">
                    {item.authorName.trim() ? item.authorName : "Author Name"}
                    <span className="px-1">•</span>
                    {item.createdDate
                      ? new Date(item.createdDate).toLocaleString("en-GB", {
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
                  <h3 className="text-lg font-semibold mt-2 truncate">
                    {item.title}
                  </h3>
                  <p
                    className="text-gray-600 text-sm mt-1 truncate"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.content}
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex flex-wrap gap-2">
                      {["Leadership", "Management"].map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-800 py-1 px-2 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {(user?.role == "SOCMANAGER" ||
                      user?.id == item.authorId) && (
                      <div
                        className="bg-gray-200 p-2 rounded-lg inline-block shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteBlog(Number(item.blogId));
                        }}
                      >
                        <img src={TrashIcon} alt="" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          ))
        ) : (
          <div>No blog available</div>
        )}
      </div>

      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-10"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing{" "}
          <span className="font-semibold text-gray-900">
            {data?.data.blogs.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900">
            {data?.data.totalBlog}
          </span>
        </span>
        <div className="flex items-center gap-2">
          <div>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              <option value="10">10 Record</option>
              <option value="15">15 Record</option>
              <option value="20">20 Record</option>
              <option value="30">30 Record</option>
            </select>
          </div>
          {data && (
            <Pagination
              totalPage={data?.data.totalPages}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          )}
        </div>
      </nav>
    </div>
  );
};

export default BlogPage;
