import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  deleteComment,
  editComment,
  getCommentByBlogId,
  TCommentByBlogDataComments,
} from "../../services/blog-api";
import BoxAddComment from "./BoxAddComment";
import { Pagination } from "../Pagination";
import { toast } from "sonner";
import { useUserStore } from "../../stores/user";

export default function CommentBlog({ blogId }: { blogId: string }) {
  const user = useUserStore((state) => state.user);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(5);
  const [listComment, setListComment] = useState<TCommentByBlogDataComments[]>(
    []
  );
  const [newComment, setNewComment] = useState<string>("");
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const { data, refetch } = useQuery({
    queryKey: ["fetchCommentByBlog", blogId, currentPage],
    queryFn: async () => {
      const response = await getCommentByBlogId({
        blogId: Number(blogId),
        pageNumber: currentPage,
        pageSize,
      });
      return response;
    },
  });

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment({ commentId });
      toast.success("Delete comment success !");
      refetch();
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleEditComment = async (commentId: number) => {
    // save
    try {
      await editComment({ commentId, content: editContent });
      setEditCommentId(null);
      toast.success("Update comment success !");
      refetch();
    } catch (error) {
      setEditCommentId(null);
      toast.error("Fail update comment !");
    }
  };

  useEffect(() => {
    if (data?.data.comments) {
      setListComment(data.data.comments);
    }
  }, [data]);

  return (
    <>
      <div className="border p-2 rounded-lg w-[60%] mx-auto">
        {listComment && listComment.length > 0 ? (
          listComment.map((item) => (
            <div key={item?.commentId} className="flex gap-2 items-center my-2">
              {/* Avatar */}
              {item?.userAvatar ? (
                <img
                  src={`http://localhost:5173${item.userAvatar}`}
                  className="rounded-full w-12 h-12 shadow-md object-cover"
                  alt="avatar"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src =
                      "https://static.vecteezy.com/system/resources/previews/036/744/532/non_2x/user-profile-icon-symbol-template-free-vector.jpg";
                  }}
                />
              ) : (
                <img
                  src="https://static.vecteezy.com/system/resources/previews/036/744/532/non_2x/user-profile-icon-symbol-template-free-vector.jpg"
                  className="rounded-full w-12 h-12 shadow-md object-cover"
                  alt="avatar"
                />
              )}
              <div className="flex gap-1 flex-col text-start p-2 rounded-lg bg-gray-50 text-base w-full">
                <div className="flex justify-between items-center">
                  <div className="font-bold">
                    {item?.userName}{" "}
                    <span className="text-sm text-gray-400 font-normal">
                      {new Date(item.createdDate).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                      })}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    {user?.id == item.userId && (
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => {
                          setEditCommentId(item.commentId);
                          setEditContent(item.content);
                        }}
                      >
                        Edit
                      </button>
                    )}

                    {(user?.id == item.userId ||
                      user?.role == "SOCMANAGER") && (
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => handleDeleteComment(item.commentId)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
                {editCommentId === item.commentId ? (
                  <div className="flex flex-col gap-2 mt-2">
                    <textarea
                      className="border p-2 rounded-lg w-full"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    />
                    <button
                      className="bg-green-500 text-white py-1 px-3 rounded-lg self-start"
                      onClick={() => handleEditComment(item.commentId)}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div>{item?.content}</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-4 font-medium">
            No comments yet. Be the first to leave a comment!
          </div>
        )}
      </div>
      <BoxAddComment
        blogId={blogId}
        newComment={newComment}
        setNewComment={setNewComment}
        refetch={refetch}
      />
      {data?.data && (
        <div className="mt-5">
          <Pagination
            totalPage={data?.data.totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      )}
    </>
  );
}
