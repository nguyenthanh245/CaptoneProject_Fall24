import React, { useState } from "react";
import { useUserStore } from "../../stores/user";
import { toast } from "sonner";
import { addNewBlog } from "../../services/blog-api";
import LoadingInButton from "../LoadingInButton";

export type TFormData = {
  title: string;
  content: string;
  image: FileList | null;
};

const AddNew: React.FC<{
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}> = ({ setIsModalOpen, refetch }) => {
  const user = useUserStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [formCreateBlog, setFormCreateBlog] = useState<TFormData>({
    title: "",
    content: "",
    image: null,
  });

  // Xử lý khi submit
  const onSubmit = async () => {
    setIsLoading(true);
    try {
      await addNewBlog({ formData: formCreateBlog });
      setIsModalOpen(false);
      setIsLoading(false);
      toast.success("Add Blog Success");
      refetch();
    } catch (error) {
      setIsModalOpen(false);
      setIsLoading(false);
      toast.error(error as string);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {    
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setFormCreateBlog((prev) => ({
        ...prev,
        image: e.target.files,
      }));
    }
  };

  // Xử lý khi thay đổi trường input
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { id, value } = e.target;
    setFormCreateBlog((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center p-4 rounded-lg w-full mx-auto mt-10">
      <div className="flex items-center gap-2 mb-3">
        <img
          src="https://via.placeholder.com/40"
          alt="Avatar"
          className="rounded-full"
        />
        <div>
          <div className="font-bold text-sm">{user?.fullName}</div>
        </div>
      </div>

      {/* Form */}
      <label htmlFor="title">Title</label>
      <textarea
        id="title"
        value={formCreateBlog.title}
        onChange={handleChange}
        className="w-full border rounded-lg p-2 text-sm mb-3"
        placeholder="Phạm ơi, bạn đang nghĩ gì thế?"
        rows={4}
      />
      <label htmlFor="content">Content</label>
      <textarea
        id="content"
        value={formCreateBlog.content}
        onChange={handleChange}
        className="w-full border rounded-lg p-2 text-sm mb-3"
        placeholder="Phạm ơi, bạn đang nghĩ gì thế?"
        rows={4}
      />
      {/* Phần Thêm Ảnh/Video */}
      <div className="border rounded-lg p-3 flex flex-col items-center justify-center mb-3">
        {previewImage ? (
          <div className="relative">
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-auto rounded-md"
            />
            <button
              type="button"
              className="absolute top-0 right-0 bg-gray-300 text-black rounded-full px-2 py-1"
              onClick={() => {
                setPreviewImage(null);
                setFormCreateBlog((prev) => ({ ...prev, image: null }));
              }}
            >
              ✕
            </button>
          </div>
        ) : (
          <>
            <label
              htmlFor="mediaFile"
              className="cursor-pointer text-blue-500 hover:underline"
            >
              Upload Image / Video
            </label>
            <input
              type="file"
              id="mediaFile"
              className="hidden"
              accept="image/*,video/*"
              onChange={handleImageChange}
            />
          </>
        )}
      </div>
      {/* Nút Đăng */}
      <button
        type="submit"
        className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 ${
          isLoading && "cursor-not-allowed"
        }`}
        onClick={onSubmit}
        disabled={isLoading}
      >
        {isLoading ? <LoadingInButton /> : "Up Blog"}
      </button>
    </div>
  );
};

export default AddNew;
