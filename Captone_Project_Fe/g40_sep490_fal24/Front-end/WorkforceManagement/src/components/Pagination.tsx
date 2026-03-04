type TProps = {
  totalPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
};

export const Pagination = ({
  totalPage,
  setCurrentPage,
  currentPage,
}: TProps) => {
  function renderPageNumber() {
    const pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <li key={i}>
          <a
            href="#"
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-gray-50 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
              currentPage == i ? "font-bold" : ""
            }`}
            onClick={(e) => {
              e.preventDefault(); // Ngăn chặn hành vi cuộn lên đầu trang
              setCurrentPage(i);
            }}
          >
            {i}
          </a>
        </li>
      );
    }
    return pages;
  }

  return (
    <div>
      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        <li>
          <a
            href="#"
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-gray-50 border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
            onClick={(e) => {
              if (currentPage > 1) {
                e.preventDefault();
                setCurrentPage(currentPage - 1);
              }
            }}
          >
            Previous
          </a>
        </li>
        {renderPageNumber()}
        <li>
          <a
            href="#"
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-gray-50 border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
            onClick={(e) => {
              if (currentPage < totalPage) {
                e.preventDefault();
                setCurrentPage(currentPage + 1);
              }
            }}
          >
            Next
          </a>
        </li>
      </ul>
    </div>
  );
};
