import { toast } from "sonner";
import {
  createInvoice,
  TProjectDetailsInfoData,
} from "../../services/soc-manager-api";

type TProps = {
  setIsShowInvoiceModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: TProjectDetailsInfoData;
};

export default function InvoiceModal({ setIsShowInvoiceModal, data }: TProps) {
  const handleCreateInvoice = async (
    userId: number,
    projectId: number,
    price: number
  ) => {
    try {
      if (userId && projectId && price) {
        const timestamp = Date.now();
          const invoiceId = `INV-${userId}-${projectId}-${timestamp}`.trim();
        await createInvoice({ invoiceId, userId, projectId, price });
        toast.success("Create Invoice Success !");
        setIsShowInvoiceModal(false);
      }
    } catch (error) {
      toast.error(error as string);
      setIsShowInvoiceModal(false);
    }
  };
  return (
    <div className="p-6 bg-white ">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Invoice</h2>
        <p className="text-gray-600">Details of the Invoice</p>
      </div>

      {/* Invoice Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed border-collapse border border-gray-300 text-gray-700">
          <tbody>
            {/* Customer Information */}
            <tr className="bg-gray-50 border-b border-gray-300">
              <td className="py-3 px-4 font-semibold w-1/3">Customer ID</td>
              <td className="py-3 px-4">
                {data.pentestRequest.customer.customerId}
              </td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="py-3 px-4 font-semibold">Customer Name</td>
              <td className="py-3 px-4">
                {data.pentestRequest.customer.customerName}
              </td>
            </tr>
            <tr className="bg-gray-50 border-b border-gray-300">
              <td className="py-3 px-4 font-semibold">Customer Username</td>
              <td className="py-3 px-4">exam@gmail.com</td>
            </tr>

            {/* Project Information */}
            <tr className="border-b border-gray-300">
              <td className="py-3 px-4 font-semibold">Project ID</td>
              <td className="py-3 px-4">{data.project.id}</td>
            </tr>
            <tr className="bg-gray-50 border-b border-gray-300">
              <td className="py-3 px-4 font-semibold">Project Name</td>
              <td className="py-3 px-4">{data.project.name}</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="py-3 px-4 font-semibold">Project Description</td>
              <td className="py-3 px-4">{data.project.description}</td>
            </tr>
            <tr className="bg-gray-50 border-b border-gray-300">
              <td className="py-3 px-4 font-semibold">Project URL</td>
              <td className="py-3 px-4">
                <a
                  href={data.pentestRequest.urls}
                  className="text-blue-500 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.pentestRequest.urls}
                </a>
              </td>
            </tr>

            {/* Pricing Information */}
            <tr className="border-b border-gray-300">
              <td className="py-3 px-4 font-semibold">Price</td>
              <td className="py-3 px-4 text-green-600 font-bold">${data.project.totalCost + "0"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end mt-6 space-x-3 font-medium">
        <button
          type="button"
          className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition ease-in-out duration-200"
          onClick={() => {
            setIsShowInvoiceModal(false);
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 min-w-[57.5px] min-h-[37px] text-white rounded-md shadow-md transition ease-in-out duration-200 bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          onClick={() => {
            handleCreateInvoice(
              data.pentestRequest.customer.customerId,
              data.project.id,
              data.project.totalCost * 10
            );
          }}
        >
          Create Invoice
        </button>
      </div>
    </div>
  );
}
