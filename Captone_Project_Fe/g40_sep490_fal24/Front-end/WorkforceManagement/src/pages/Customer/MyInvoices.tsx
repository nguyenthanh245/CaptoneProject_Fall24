import { useState } from "react";
import { DollarOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import {
  createPaymentUrl,
  getInvoiceOfCustomer,
} from "../../services/customer-api";
import Loading from "../../components/Loading";
import { toast } from "sonner";

export default function MyInvoice() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  //   const [isLoadingCreateUrl, setIsLoadingCreateUrl] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["fetchInvoiceOfCustomer"],
    queryFn: async () => {
      const response = await getInvoiceOfCustomer();
      return response;
    },
  });

  const handlePayment = async (invoiceId: string) => {
    try {
      const response = await createPaymentUrl({ invoiceId });
      if (response.code == 200 && response.data) {
        window.location.href = response.data;
      } else {
        toast.error(response.message || "Failed to redirect payment URL.");
      }
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <div className="flex flex-col space-y-4 p-5 py-6 bg-gray-50 rounded-lg shadow-md">
        <div className="flex justify-center items-center space-x-2">
          <h1 className="text-xl font-semibold text-gray-800">My Invoice</h1>
          <div>
            <DollarOutlined style={{ fontSize: "24px" }} />
          </div>
        </div>
      </div>
      <div className="my-6 border-t border-gray-300"></div>
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
            placeholder="Search ticket by project name"
          />
        </div>
      </div>
      <table className="w-full text-sm text-gray-500 mt-4 text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Invoice ID
            </th>
            <th scope="col" className="px-6 py-3">
              Project ID
            </th>
            <th scope="col" className="px-6 py-3">
              Project Name
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={8}>
                <div className="flex items-center justify-center h-40">
                  <Loading />
                </div>
              </td>
            </tr>
          )}
          {data?.data.invoicePayment ? (
            data.data.invoicePayment.map((item) => (
              <tr className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{item.invoiceId}</td>
                <td className="px-6 py-4">{item.projectId}</td>
                <td className="px-6 py-4">{item.projectName}</td>
                <td className="px-6 py-4">{item.price}</td>
                <div>
                  {item.statusInvoice === "Đã Thanh Toán"
                    ? "Paid"
                    : item.statusInvoice === "Chưa Thanh Toán"
                    ? "Unpaid"
                    : item.statusInvoice}
                </div>
                <td className="px-6 py-4">
                  {" "}
                  <button
                    className="px-4 py-2 text-white rounded-lg shadow-md bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    onClick={() => {
                      handlePayment(item.invoiceId.trim());
                    }}
                  >
                    Payment
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                No invoice available now.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
