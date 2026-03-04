import { useState } from "react";
import LoadingInButton from "../LoadingInButton";
import { editBlogById } from "../../services/blog-api";
import { toast } from "sonner";

type TBlogDetailData = {
  blogId: number;
  title: string;
  content: string;
  createdDate: string;
  authorId: number;
  authorName: string;
  imageUrl: string;
};

type TEditBlogData = {
  title: string;
  content: string;
  image: FileList | null;
};

export default function EditBlogModal({
  blogData,
  refetch,
  setIsOpenModal
}: {
  blogData: TBlogDetailData;
    refetch: () => void;
    setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [editBlogData, setEditBlogData] = useState<TEditBlogData>({
    title: blogData.title,
    content: blogData.content,
    image: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setImagePreview(fileURL);
      setEditBlogData((prev) => ({ ...prev, image: e.target.files }));
    } else {
      setImagePreview(null);
      setEditBlogData((prev) => ({ ...prev, image: null }));
    }
  };

  const handleOnchange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { id, value } = e.target;
    setEditBlogData((prev) => ({ ...prev, [id]: value }));
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await editBlogById({
        blogId: blogData.blogId,
        content: editBlogData.content,
        title: editBlogData.title,
        imageUrl: editBlogData.image,
      });
      toast.success("Update blog success !");
      setIsLoading(false);
      setIsOpenModal(false)
      refetch();
    } catch (error) {
      toast.error(error as string);
      setIsLoading(false);
    }
  };

  return (
    <div className="p-3 bg-white rounded-lg max-w-md mx-auto space-y-6">
      <h2 className="text-xl font-bold mb-4">Edit Blog</h2>
      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter blog title"
          value={editBlogData.title}
          onChange={handleOnchange}
        />
      </div>

      {/* Content */}
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          Content
        </label>
        <textarea
          id="content"
          rows={5}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Write your content here"
          value={editBlogData.content}
          onChange={handleOnchange}
        />
      </div>

      {/* Image */}
      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700"
        >
          Image
        </label>
        <input
          type="file"
          id="image"
          className="mt-1 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          accept="image/*,video/*"
          onChange={handleImageChange}
        />
      </div>

      {/* Image Preview */}
      {imagePreview && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-auto rounded-md shadow-md"
          />
        </div>
      )}
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
}
