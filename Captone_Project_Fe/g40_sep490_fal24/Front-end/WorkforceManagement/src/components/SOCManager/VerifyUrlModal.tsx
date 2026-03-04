import { useMutation } from "@tanstack/react-query";
import { verifyUrl } from "../../services/soc-manager-api";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type TProps = {
  setIsShowVerifyUrlModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedId: number;
  selectedUrl: string;
};

export default function VerifyUrlModal({
  setIsShowVerifyUrlModal,
  selectedId,
  selectedUrl,
}: TProps) {
  const [parsedRawData, setParsedRawData] = useState<any>(null);

  const { mutate, isPending, data, isError } = useMutation({
    mutationKey: ["fetchVerifyUrl"],
    mutationFn: async () => {
      const response = await verifyUrl({ url: selectedUrl });
      return response;
    },
    onSuccess: () => {
      toast.success("Verify success!");
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });

  useEffect(() => {
    mutate();
  }, [selectedId]);

  // Parse `rawData` khi có dữ liệu
  useEffect(() => {
    if (data?.domainInfo?.whoisInformation?.rawData) {
      try {
        const parsedData = JSON.parse(data.domainInfo.whoisInformation.rawData);
        setParsedRawData(parsedData.WhoisRecord); // Lấy đối tượng WhoisRecord
      } catch (error) {
        console.error("Error parsing rawData:", error);
      }
    }
  }, [data]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
          Verify URL
        </h2>

        {isPending && (
          <div className="flex flex-col items-center justify-center h-full space-y-4 text-blue-600 animate-pulse">
            <svg
              className="w-5 h-5 text-blue-600 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            <span className="text-lg font-medium">Scanning...</span>
          </div>
        )}

        {isError && <div className="text-red-500">Error verifying URL</div>}

        {data && !isPending && (
          <div className="space-y-3">
            <p>
              <strong>Ticket ID:</strong> {selectedId}
            </p>
            <p>
              <strong>URL:</strong> {data.url}
            </p>
            <p>
              <strong>Status:</strong> {data.status}
            </p>
            {data.message && (
              <p>
                <strong>Message:</strong> {data.message}
              </p>
            )}
            {data.domainInfo && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-700">
                  Domain Information
                </h3>
                <p>
                  <strong>Domain:</strong> {data.domainInfo.domain}
                </p>
                <p>
                  <strong>Registrar:</strong>{" "}
                  {data.domainInfo.whoisInformation?.registrar || "N/A"}
                </p>
                <p>
                  <strong>Estimated Domain Age:</strong>{" "}
                  {data.domainInfo.whoisInformation?.estimatedDomainAge ||
                    "N/A"}{" "}
                  days
                </p>
              </div>
            )}
          </div>
        )}

        {data && !isPending && parsedRawData && (
          <div className="space-y-2 mt-4">
            <h3 className="text-lg font-semibold text-gray-700">
              WHOIS Raw Data
            </h3>
            <p>
              <strong>Domain Name:</strong> {parsedRawData.domainName}
            </p>
            <p>
              <strong>Name Servers:</strong>{" "}
              {parsedRawData.nameServers?.hostNames.join(", ") || "N/A"}
            </p>
            <p>
              <strong>Registrant Name:</strong>{" "}
              {parsedRawData.registrant?.name || "N/A"}
            </p>
            <p>
              <strong>Registrant Organization:</strong>{" "}
              {parsedRawData.registrant?.organization || "N/A"}
            </p>
            <p>
              <strong>Registrant Country:</strong>{" "}
              {parsedRawData.registrant?.country || "N/A"}
            </p>
            <p>
              <strong>Created Date:</strong>{" "}
              {parsedRawData.createdDateNormalized || "N/A"}
            </p>
            <p>
              <strong>Updated Date:</strong>{" "}
              {parsedRawData.updatedDateNormalized || "N/A"}
            </p>
          </div>
        )}

        <div className="flex justify-end space-x-4 mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none"
            onClick={() => setIsShowVerifyUrlModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
