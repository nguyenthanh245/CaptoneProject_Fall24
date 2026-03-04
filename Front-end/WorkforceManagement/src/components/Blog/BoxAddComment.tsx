import { useState } from "react";
import sendIcon from "../../../public/send.svg";
import { createComment } from "../../services/blog-api";
import { useUserStore } from "../../stores/user";
import LoadingCustom from "../LoadingCustom";
import { toast } from "sonner";

type TProps = {
  blogId: string;
  newComment: string;
  setNewComment: React.Dispatch<React.SetStateAction<string>>;
  refetch: () => void;
};

export default function BoxAddComment({
  blogId,
  newComment,
  setNewComment,
  refetch,
}: TProps) {
  const user = useUserStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const handleAddComment = async () => {
    if (newComment) {
      if (user) {
        setIsLoading(true);
        //         setListComment((prev) => [
        //   ...prev,
        //   {
        //     commentId: Date.now(),
        //     blogId: Number(blogId),
        //     userId: user.id,
        //     userName: user.fullName,
        //     content: newComment,
        //     createdDate: new Date().toISOString(),
        //   },
        // ]);
        await createComment({
          authorId: user.id,
          blogId: Number(blogId),
          content: newComment,
        });
        setIsLoading(false);
        refetch();
        setNewComment("");
      }
    } else {
      toast.message("Fill your comment at least 1 character");
    }
  };
  return (
    <div className="flex justify-center gap-4 mt-5 items-center">
      {user?.imageProfile ? (
        <img
          src={`http://localhost:5173${user?.imageProfile}`}
          className="rounded-full object-cover w-12 h-12"
          alt="avt"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src =
              "https://static.vecteezy.com/system/resources/previews/036/744/532/non_2x/user-profile-icon-symbol-template-free-vector.jpg";
          }}
        />
      ) : (
        <img
          src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png"
          className="rounded-full object-cover w-12 h-12"
          alt="avt"
        />
      )}
      <textarea
        className="w-[65%] border pl-2 pt-2 rounded-md"
        placeholder="Comment"
        value={newComment} // Liên kết với state
        onChange={(e) => setNewComment(e.target.value)} // Cập nhật state khi nhập
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleAddComment();
          }
        }}
        disabled={isLoading}
      ></textarea>
      <button
        onClick={handleAddComment} // Gọi hàm thêm comment khi nhấn nút
        disabled={isLoading}
      >
        {isLoading ? (
          <LoadingCustom />
        ) : (
          <img
            src={sendIcon}
            alt="Send"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        )}
      </button>
    </div>
  );
}
