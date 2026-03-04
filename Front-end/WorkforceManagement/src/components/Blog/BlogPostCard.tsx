// src/components/BlogPostCard.tsx

import React from "react";

interface BlogPostProps {
  id: number,
  author: string;
  date: string;
  title: string;
  description: string;
  tags?: string[];
  imageUrl?: string;
}

const BlogPostCard: React.FC<BlogPostProps> = ({
  author,
  date,
  title,
  description,
  tags,
  imageUrl,
}) => {
  return (
    <div className="flex flex-col border border-gray-200 rounded-lg overflow-hidden shadow-md hover:scale-[1.02] duration-150 hover:bg-blue-50 cursor-pointer">
      {<img src={imageUrl} alt={title} className="h-48 w-full object-cover" />}
      <div className="p-4">
        <div className="text-sm text-gray-500">
          {author} • {date}
        </div>
        <h3 className="text-lg font-semibold mt-2">{title}</h3>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags?.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-800 py-1 px-2 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
