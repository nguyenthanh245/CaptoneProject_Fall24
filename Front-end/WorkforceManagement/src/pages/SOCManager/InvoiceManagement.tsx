import { useState } from "react";
import Loading from "../../components/Loading";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DollarOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import {
  getAllInvoice,
  TAllInvoiceDataInvoices,
} from "../../services/soc-manager-api";
import { Modal } from "antd";

export default function InvoiceManagement() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoiceDetail, setInvoiceDetail] =
    useState<TAllInvoiceDataInvoices | null>();

  const { data, isLoading } = useQuery({
    queryKey: ["fetchAllInvoices"],
    queryFn: async () => {
      const response = await getAllInvoice();
      return response;
    },
  });

  const handleOpenModal = (invoiceId: string) => {
    if (data?.data && invoiceId) {
      const invoiceDetail = data.data.invoices.find(
        (item) => item.invoiceId == invoiceId
      );
      setInvoiceDetail(invoiceDetail);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setInvoiceDetail(null);
  };

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <div className="flex flex-col space-y-4 p-5 py-6 bg-gray-50 rounded-lg shadow-md">
        <div className="flex justify-center items-center space-x-2">
          <h1 className="text-xl font-semibold text-gray-800">
            All Invoice Created
          </h1>
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
              User ID
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
          {data?.data.invoices ? (
            data.data.invoices.map((item) => (
              <tr className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{item.invoiceId}</td>
                <td className="px-6 py-4">{item.userId}</td>
                <td className="px-6 py-4">{item.projectId}</td>
                <td className="px-6 py-4">{item.projectName}</td>
                <td className="px-6 py-4">{item.price} VND</td>
                <td className="px-6 py-4 flex items-center space-x-2">
                  {item.statusInvoice === "Đã Thanh Toán" ? (
                    <>
                      <span className="text-green-600">
                        <CheckCircleOutlined />
                      </span>
                      <span className="text-green-600 font-semibold">Paid</span>
                    </>
                  ) : item.statusInvoice === "Chưa Thanh Toán" ? (
                    <>
                      <span className="text-red-600">
                        <CloseCircleOutlined />
                      </span>
                      <span className="text-red-600 font-semibold">Unpaid</span>
                    </>
                  ) : (
                    <>
                      <span className="text-gray-500">
                        <QuestionCircleOutlined />
                      </span>
                      <span className="text-gray-500 font-semibold">
                        {item.statusInvoice}
                      </span>
                    </>
                  )}
                </td>
                <td className="px-6 py-4">
                  {" "}
                  <button
                    className="px-4 py-2 text-white rounded-lg shadow-md bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    onClick={() => handleOpenModal(item.invoiceId)}
                  >
                    Details
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
      <Modal
        title="Invoice Details"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        centered
        width={600}
        className="rounded-lg shadow-lg"
      >
        {invoiceDetail ? (
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4 text-gray-800">
              <div className="font-semibold">Invoice ID:</div>
              <div>{invoiceDetail.invoiceId.trim()}</div>
              <div className="font-semibold">User ID:</div>
              <div>{invoiceDetail.userId}</div>
              <div className="font-semibold">User Name:</div>
              <div>{invoiceDetail.userName}</div>
              <div className="font-semibold">Project ID:</div>
              <div>{invoiceDetail.projectId}</div>
              <div className="font-semibold">Project Name:</div>
              <div>{invoiceDetail.projectName.trim()}</div>
              <div className="font-semibold">Price:</div>
              <div>{`${invoiceDetail.price.toLocaleString()} VND`}</div>
              <div className="font-semibold">Creation Date:</div>
              <div>
                {new Date(invoiceDetail.createDate).toLocaleDateString("en-US")}
              </div>
              <div className="font-semibold">Invoice Description:</div>
              <div>
                {invoiceDetail.invoiceDescription || "No description available"}
              </div>
              <div className="font-semibold">Status:</div>
              <div
                className={`text-lg font-semibold ${
                  invoiceDetail.statusInvoice === "Đã Thanh Toán"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {invoiceDetail.statusInvoice === "Đã Thanh Toán"
                  ? "Paid"
                  : invoiceDetail.statusInvoice === "Chưa Thanh Toán"
                  ? "Unpaid"
                  : invoiceDetail.statusInvoice}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-32">
            <Loading />
          </div>
        )}
      </Modal>
    </div>
  );
}
