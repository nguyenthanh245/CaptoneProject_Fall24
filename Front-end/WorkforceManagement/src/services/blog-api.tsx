import { TFormData } from "../components/Blog/AddNewBlog";
import { get, post, remove, update } from "./axios-config";

type TBaseResponse<T> = {
  code: number;
  message: string;
  data: T;
};

type TAllBlogResposne = TBaseResponse<TAllBlogData>;

type TAllBlogData = {
  totalBlog: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  blogs: [
    {
      blogId: number;
      title: string;
      content: string;
      createdDate: string;
      authorId: number;
      authorName: string;
      imageUrl: string;
    }
  ];
};

type TBlogDetailsResponse = TBaseResponse<TBlogDetailData>;

type TBlogDetailData = {
  blogId: number;
  title: string;
  content: string;
  createdDate: string;
  authorId: number;
  authorName: string;
  imageUrl: string;
};

type TCommentByBlogResponse = TBaseResponse<TCommentByBlogData>;

type TCommentByBlogData = {
  totalComments: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  comments: TCommentByBlogDataComments[];
};

export type TCommentByBlogDataComments = {
  commentId: number;
  blogId: number;
  userId: number;
  userName: string;
  content: string;
  createdDate: string;
  userAvatar: string;
};

export async function getAllBlog({
  SearchString,
  sortBy,
  PageNumber,
  PageSize,
}: {
  SearchString: string;
  sortBy?: string;
  PageNumber: number;
  PageSize: number;
}) {
  return await get<TAllBlogResposne>({
    url: "/Blog/GetAllBlog",
    params: { SearchString, sortBy, PageNumber, PageSize },
  });
}

export async function addNewBlog({ formData }: { formData: TFormData }) {
  const body = new FormData();
  body.append("Title", formData.title);
  body.append("Content", formData.content);

  if (formData.image && formData.image[0]) {
    body.append("image", formData.image[0]); // Thêm file ảnh đầu tiên
  }

  return await post({
    url: `/Blog/CreateBlog`,
    data: body,
    config: {
      headers: {
        "Content-Type": "multipart/form-data", // Đặt header chính xác
      },
    },
  });
}

export async function editBlogById({
  blogId,
  title,
  content,
  imageUrl,
}: {
  blogId: number;
  title: string;
  content: string;
  imageUrl?: FileList | null;
}) {
  const body = new FormData();
  body.append("Title", title);
  body.append("content", content);
  if (imageUrl && imageUrl[0]) {
    body.append("image", imageUrl[0]); // Thêm file ảnh đầu tiên
  }
  return update({
    url: `/Blog/UpdateBlog/${blogId}`,
    data: body,
    config: {
      headers: {
        "Content-Type": "multipart/form-data", // Đặt header chính xác
      },
    },
  });
}

export async function deleteBlogById({ blogId }: { blogId: number }) {
  return await remove({
    url: `/Blog/ActorDeleteBlog/${blogId}`,
  });
}

export async function getBlogById({ blogId }: { blogId: number }) {
  return get<TBlogDetailsResponse>({
    url: `/Blog/GetBlogById/${blogId}`,
  });
}

export async function getCommentByBlogId({
  blogId,
  pageNumber,
  pageSize,
}: {
  blogId: number;
  pageNumber: number;
  pageSize: number;
}) {
  return await get<TCommentByBlogResponse>({
    url: `/Blog/GetCommentsByBlogId/${blogId}`,
    params: {
      blogId,
      pageNumber,
      pageSize,
    },
  });
}

export async function createComment({
  blogId,
  authorId,
  content,
}: {
  blogId: number;
  authorId: number;
  content: string;
}) {
  return await post({
    url: `/Comment/CreateComment/${blogId}`,
    data: {
      authorId,
      content,
    },
  });
}

export async function editComment({
  commentId,
  content,
}: {
  commentId: number;
  content: string;
}) {
  return await update({
    url: `/Comment/EditComment/${commentId}`,
    data: {
      content,
    },
  });
}

export async function deleteComment({ commentId }: { commentId: number }) {
  return await remove({
    url: `/Comment/DeleteComment/${commentId}`,
  });
}
