import { toast } from "sonner";
import { createPentestRequest } from "../../services/customer-api";

type TTicketForm = {
  projectName: string;
  description: string;
  urls: string;
  estimatedate: string;
};

export default function TicketConfirm({
  ticketForm,
  setStep,
}: {
  ticketForm: TTicketForm;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="p-4 max-w-lg mx-auto bg-gray-50 shadow-md rounded-md my-10">
      <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center border-b pb-4">
        Verify Ticket
      </h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <strong className="w-1/3 text-gray-700">Project URL:</strong>
          <span className="text-blue-500 w-2/3 bg-gray-100 px-4 py-2 rounded-md break-all">
            <a href={ticketForm.urls} target="_blank" rel="noopener noreferrer">
              {ticketForm.urls}
            </a>
          </span>
        </div>
        <div className="flex items-center">
          <strong className="w-1/3 text-gray-700">Project Name:</strong>
          <span className="text-gray-900 w-2/3 bg-gray-100 px-4 py-2 rounded-md">
            {ticketForm.projectName}
          </span>
        </div>
        <div className="flex items-center">
          <strong className="w-1/3 text-gray-700">Description:</strong>
          <span className="text-gray-900 w-2/3 bg-gray-100 px-4 py-2 rounded-md">
            {ticketForm.description}
          </span>
        </div>
        <div className="flex items-center">
          <strong className="w-1/3 text-gray-700">Estimate End Date:</strong>
          <span className="text-gray-900 w-2/3 bg-gray-100 px-4 py-2 rounded-md">
            {new Date(ticketForm.estimatedate).toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
      <div className="flex justify-between py-5">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-blue-600 font-semibold text-base"
          onClick={() => setStep((prev) => prev - 1)}
        >
          Back
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 font-semibold text-base"
          onClick={async () => {
            try {
              await createPentestRequest({ data: ticketForm });
              setStep((prev) => prev + 1);
            } catch (error) {
              toast.error(error as string);
            }
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
