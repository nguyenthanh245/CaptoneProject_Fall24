import { useState } from "react";
import PersonIcon from "../../assets/images/icons8-person-50.png";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../services/admin-api";
import { useDebounce } from "../../hooks/useDebounce";
import { Pagination } from "../../components/Pagination";
import Loading from "../../components/Loading";
import EditProfileUser from "../../components/Admin/EditProfileUser";
import UserActiveLineChart from "../../components/Admin/UserActiveLineChart";
import UserRolePieChart from "../../components/Admin/UserRolePieChart";

export default function UserManagement() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isShowBoxEdit, setIsShowBoxEdit] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedEmail, setSelectedEmail] = useState<string>("");
  const [searchString, setSearchString] = useState<string>("");
  const debouncedSearchString = useDebounce(searchString, 300);
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["admin-getUser", debouncedSearchString, currentPage],
    queryFn: async () => {
      const pageSize = 10;
      const response = await getAllUsers({
        searchString,
        pageSize: pageSize,
        pageNumber: currentPage,
      });
      return response;
    },
    enabled: !!debouncedSearchString || debouncedSearchString === "", // Chỉ chạy query nếu có searchString
  });

  function handleClickEdit(email: string) {
    setIsShowBoxEdit(!isShowBoxEdit);
    setSelectedEmail(email);
  }

  if (error) {
    return (
      <div className="text-red-500">
        Error fetching data: {error.message || "Something went wrong"}
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <div className="flex flex-col space-y-4 p-4 bg-gray-50 rounded-lg shadow-md">
        <div className="flex justify-around">
          <div className="w-1/2">
            <UserActiveLineChart />
          </div>
          <div className="w-1/2">
            <UserRolePieChart />
          </div>
        </div>
      </div>
      <div className="my-6 border-t border-gray-300"></div>
      <div className="flex items-center justify-between flex-col md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white">
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
            placeholder="Search users by name"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Active
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={6}>
                <div className="flex items-center justify-center h-40">
                  <Loading />
                </div>
              </td>
            </tr>
          )}
          {error && <div>Error loading users</div>}
          {data?.data.users.map((user) => (
            <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="checkbox-table-search-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <td className="px-6 py-4">{user?.id}</td>
              <td
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
              >
                <img
                  className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden"
                  src={PersonIcon}
                  alt="avatar user"
                />
                <div className="ps-3">
                  <div className="text-base font-semibold">
                    {user?.fullName}
                  </div>
                  <div className="font-normal text-gray-500">{user?.email}</div>
                </div>
              </td>
              <td className="px-6 py-4">{user.roleValue}</td>
              <td className="px-6 py-4">
                {user.isActive ? (
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                    Active
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-gray-400 me-2"></div>{" "}
                    Inactive
                  </div>
                )}
              </td>
              <td className="px-6 py-4">
                <div className="flex space-x-4">
                  <a
                    type="button"
                    className="font-medium text-blue-600 hover:underline"
                    onClick={() => handleClickEdit(user.email)}
                  >
                    Edit
                  </a>
                  <span>/</span>
                  <a
                    type="button"
                    className="font-medium text-red-600 hover:underline"
                  >
                    Delete
                  </a>
                </div>
              </td>
            </tr>
          ))}
          {/* Repeat other rows as necessary */}
        </tbody>
      </table>
      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing <span className="font-semibold text-gray-900">5</span> of{" "}
          <span className="font-semibold text-gray-900">
            {data?.data.totalUsers}
          </span>
        </span>
        {data && (
          <Pagination
            totalPage={data?.data.totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )}
      </nav>
      <div>
        {isShowBoxEdit && (
          <EditProfileUser
            setIsShowBoxEdit={setIsShowBoxEdit}
            selectedEmail={selectedEmail}
            refetch = {refetch}
          />
        )}
      </div>
    </div>
  );
}
