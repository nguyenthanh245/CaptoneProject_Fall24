import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProjectDetails } from "../../services/soc-manager-api";
import CountVulStatusDetailsChart from "../../components/SOCManager/CountVulStatusDetailsChart";
import OrgChartMember from "../../components/SOCManager/OrgChartMember";
import SeverityCountDetails from "../../components/SOCManager/SeverityCountDetails";
import DashboardByDate from "../../components/SOCManager/DashboardByDate";
import VulTableProjectDetails from "../../components/SOCManager/VulTableProjectDetails";
import GanttChart from "../../components/SOCManager/GanttChart";
import { useEffect, useState } from "react";
import BeautifulProgressBar from "../../components/BeautifulProgressBar";
import ContractIcon from "../../assets/images/contract-icon.svg";
import InvoiceIcon from "../../assets/images/invoice-icon.svg";
import { Modal } from "antd";
import ContractModal from "../../components/ContractModal";
import { useUserStore } from "../../stores/user";
import InvoiceModal from "../../components/SOCManager/InvoiceModal";

export default function ProjectDetails() {
  const [progress, setProgress] = useState<number>(0);
  const [isShowContractModal, setIsShowContractModal] = useState(false);
  const [isShowInvoiceModal, setIsShowInvoiceModal] = useState(false);
  const user = useUserStore((state) => state.user);
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["fetchProductDetails", id],
    queryFn: async () => {
      if (id) {
        const response = getProjectDetails({ projectId: Number(id) });
        return response;
      }
    },
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="p-5 bg-gradient-to-r to-neutral-300 from-stone-400 rounded-lg shadow-md flex pr-10 justify-between">
        <div className="w-2/3">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-left">
            {data?.data?.project.name || "Project Name"}
          </h1>
          <p className="text-lg text-gray-600 mb-2 text-left">
            {data?.data?.project.description || "No description available."}
          </p>
          <p className="text-blue-600 text-left font-semibold text-lg pb-2">
            <a
              href={data?.data.pentestRequest.urls}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data?.data.pentestRequest.urls}
            </a>
          </p>
          <div className="flex text-sm text-gray-700 text-left">
            <p>
              <span className="font-semibold">Start Date:</span>{" "}
              {data?.data?.project.startDate
                ? new Date(data.data.project.startDate).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }
                  )
                : "Not specified"}
            </p>
            <p>
              <span className="font-semibold">&nbsp;- End Date:</span>{" "}
              {data?.data?.project.endDate
                ? new Date(data.data.project.endDate).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }
                  )
                : "Not specified"}
            </p>
          </div>
        </div>
        {user?.role == "SOCMANAGER" && (
          <>
            <div className="flex items-center justify-end space-x-2 w-full">
              <button
                className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center space-x-2 ${
                  (data?.data.project.statusId == 4 || data?.data.project.statusId == 14) && "cursor-not-allowed"
                }`}
                onClick={() => {
                  setIsShowInvoiceModal(true);
                }}
                disabled={!(data?.data.project.statusId == 5)}
              >
                <span>Create Invoice</span>
                <span className="">
                  <img
                    src={InvoiceIcon}
                    alt="Invoice Icon"
                    className="w-5 h-5 object-contain"
                  />
                </span>
              </button>

              <button
                className="flex items-center gap-2 bg-blue-500 text-white text-lg font-semibold py-3 px-3 rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl"
                onClick={() => {
                  setIsShowContractModal(true);
                }}
              >
                Create Contract
                <span className="w-5 h-5">
                  <img
                    src={ContractIcon}
                    alt="Contract Icon"
                    className="w-5 h-5 object-contain"
                  />
                </span>
              </button>
            </div>
          </>
        )}
        {user?.role == "CUSTOMER" && (
          <div className="flex items-center justify-center">
            <button
              className="flex items-center gap-2 bg-blue-500 text-white text-lg font-semibold py-3 px-3 rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl"
              onClick={() => {
                setIsShowContractModal(true);
              }}
            >
              View Contract
              <span className="w-5 h-5">
                <img
                  src={ContractIcon}
                  alt="Contract Icon"
                  className="w-5 h-5 object-contain"
                />
              </span>
            </button>
          </div>
        )}
      </div>
      <div className="my-6 border-t border-gray-300"></div>
      <div className="">
        <BeautifulProgressBar progress={progress} />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 mt-4 space-x-4">
        <div className="flex flex-col gap-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow-lg border">
            {id && (
              <CountVulStatusDetailsChart
                projectId={id}
                setProgress={setProgress}
              />
            )}
          </div>
          <div>
            <SeverityCountDetails id={id} />
          </div>
        </div>
        <div>
          <OrgChartMember id={id} />
        </div>
      </div>

      <div className="my-14">
        <DashboardByDate />
      </div>
      <div>
        <GanttChart id={id} />
      </div>
      <div className="">{id && <VulTableProjectDetails id={id} />}</div>
      {data?.data.pentestRequest && (
        <Modal
          open={isShowContractModal}
          footer={false}
          onCancel={() => {
            setIsShowContractModal(false);
          }}
          width="60%" // Chỉnh chiều rộng của modal theo tỷ lệ phần trăm của màn hình
          style={{ top: 5 }}
        >
          <ContractModal pentestId={data?.data.pentestRequest.id} />
        </Modal>
      )}
      {data?.data.project.statusId == 5 && user?.role == "SOCMANAGER" && (
        <Modal
          open={isShowInvoiceModal}
          onCancel={() => {
            setIsShowInvoiceModal(false);
          }}
          width="50%"
          style={{ top: 5 }}
          centered
          footer={null}
        >
          <InvoiceModal
            setIsShowInvoiceModal={setIsShowInvoiceModal}
            data={data.data}
          />
        </Modal>
      )}
    </>
  );
}
