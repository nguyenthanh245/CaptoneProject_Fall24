import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  createPentestProject,
  getApprovedRequest,
  TFormCreateProject,
} from "../../services/soc-manager-api";
import Loading from "../../components/Loading";
import { toast } from "sonner";
import { useDebounce } from "../../hooks/useDebounce";
import { Pagination } from "../../components/Pagination";

export default function ApprovedTicket() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isShowModalForm, setIsShowModalForm] = useState(false);
  const [selectedId, setSelectedId] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchString, setSearchString] = useState<string>("");
  const debouncedSearchString = useDebounce(searchString, 300);
  const [formValues, setFormValues] = useState<TFormCreateProject>({
    name: "",
    description: "",
    endDate: "",
  });
  const { data, isLoading } = useQuery({
    queryKey: ["pending-ticket", debouncedSearchString, currentPage, pageSize],
    queryFn: async () => {
      const response = await getApprovedRequest({        searchString,
        currentPage,
        pageSize,});
      return response;
    },
    enabled: !!debouncedSearchString || debouncedSearchString === "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  async function handleCreateProject() {
    // Handle form submission
    try {
      if (selectedId) {
        try {
          await createPentestProject({
            id: selectedId,
            data: formValues,
          });
          setFormValues({
            name: "",
            description: "",
            endDate: "",
          });
          toast.success("Create Project Success !!");
        } catch (error) {
          toast.error(error as string);
          setFormValues({
            name: "",
            description: "",
            endDate: "",
          });
        }
      }
    } catch (error) {}
    setIsShowModalForm(false); // Close modal after submission
  }

  const isFormValid =
    formValues.name && formValues.description && formValues.endDate;

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <div className="flex flex-col space-y-4 p-5 bg-gray-50 rounded-lg shadow-md">
        <div className="flex justify-center items-center space-x-2">
          <h1 className="text-lg font-semibold text-gray-800">
            Approved Ticket
          </h1>
          <svg
            className="w-6 h-6 text-green-500" // Adjust size and color as needed
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
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
            placeholder="Search ticket accept by name"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-500 mt-4">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Project Name Suggest
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              TeamLead
            </th>
            <th scope="col" className="px-6 py-3">
              CreateAt
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={5}>
                <div className="flex items-center justify-center h-40">
                  <Loading />
                </div>
              </td>
            </tr>
          )}
          {data?.data ? (
            data.data.requests
              .sort((a, b) => b.id - a.id)
              .map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{item.id}</td>
                  <td className="px-6 py-4">{item.projectName}</td>
                  <td className="px-6 py-4">{item.description}</td>
                  <td className="px-6 py-4">
                    {item.teamLead ? (
                      <div className="relative group">
                        <span className="cursor-default">
                          {item.teamLead.email}
                        </span>
                        <div className="absolute bottom-full mb-2 hidden w-max p-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg group-hover:block">
                          <p>ID: {item.teamLead.id}</p>
                          <p>Full Name: {item.teamLead.fullName}</p>
                          <p>Email: {item.teamLead.email}</p>
                        </div>
                      </div>
                    ) : (
                      "none"
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(item.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-4">
                      <button
                        className={`px-6 py-3 font-semibold text-white rounded-md shadow-lg transition ease-in-out duration-200 focus:outline-none focus:ring-4 ${
                          item.teamLead
                            ? "bg-gray-400 cursor-not-allowed focus:ring-gray-300" // Điều kiện khi có teamLead
                            : "bg-green-600 hover:bg-green-700 focus:ring-green-400" // Điều kiện khi không có teamLead
                        }`}
                        onClick={() => {
                          if (!item.teamLead) {
                            // Chỉ thực hiện khi không có teamLead
                            setIsShowModalForm(true);
                            setSelectedId(item.id);
                          }
                        }}
                        disabled={!!item.teamLead} // Vô hiệu hóa button khi có teamLead
                      >
                        Create Project Pentest
                      </button>
                    </div>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                No pentest request available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing{" "}
          <span className="font-semibold text-gray-900">
            {data?.data.requests.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900">
            {data?.data.totalRequests}
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

      {/* Modal Form */}
      {isShowModalForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              onClick={() => setIsShowModalForm(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Create Project Pentest
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              <span className="font-semibold text-gray-700">
                Selected Ticket ID:{" "}
              </span>
              {selectedId}
            </p>
            <form onSubmit={handleCreateProject}>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-200"
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  name="description"
                  value={formValues.description}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-200"
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formValues.endDate}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-200"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsShowModalForm(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition ease-in-out duration-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreateProject}
                  disabled={!isFormValid}
                  className={`px-4 py-2 text-white rounded-md shadow-md transition ease-in-out duration-200 ${
                    isFormValid
                      ? "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
