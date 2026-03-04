import axios from "axios";
import { TTicketForm } from "../components/Customer/TicketForm";
import { get, post, update } from "./axios-config";
import Cookies from 'js-cookie';

type TBaseResponse<T> = {
  code: number;
  message: string;
  data: T;
};

type TResponseSubmittedTickets = {
  code: number;
  message: string;
  data: TResponseTicketsData;
};

type TResponseTicketsData = {
  currentPage: number;
  pageSize: number;
  requests: TResponseTicketsDataRequest[];
  totalPages: number;
  totalRequests: number;
};

type TResponseTicketsDataRequest = {
  id: number;
  projectName: string;
  description: string;
  urls: string;
  createdAt: string;
  statusId: number;
  statusName: string;
  teamId: number;
  teamLeadId: number;
  rejectReason: string;
  scanInitiatedAt: string;
  teamLeadAcceptedAt: string;
};

type TRequestsAndProjectsResponse = TBaseResponse<TRequestsAndProjectsData[]>;

type TRequestsAndProjectsData = {
  pentestRequestId: number;
  projectName: string;
  description: string;
  statusId: number;
  statusName: string;
  createdAt: string;
  projects: [
    {
      projectId: string;
      name: string;
      description: string;
      startDate: string;
      endDate: string;
      statusId: number;
      statusName: string;
      vulnerabilityCount: number;
    }
  ];
};

type TInvoiceOfCustomerResponse = TBaseResponse<TInvoiceOfCustomerData>;

type TInvoiceOfCustomerData = {
  invoicePayment: [
    {
      invoiceId: string;
      invoiceName: string;
      userId: number;
      userName: string;
      projectId: number;
      projectName: string;
      price: number;
      invoiceDescription: string;
      statusInvoice: string;
      createDate: string;
    }
  ];
};

type TCreatePaymentUrlResponse = {
  code: number;
  message: string;
  data: string;
};

export async function createPentestRequest({ data }: { data: TTicketForm }) {
  return await post({
    url: "/Customer/CreateRequest",
    data,
  });
}

export async function getSubmittedTickets({
  searchString,
  currentPage,
  pageSize,
}: {
  searchString: string;
  currentPage: number;
  pageSize: number;
}) {
  return await get<TResponseSubmittedTickets>({
    url: "/Customer/GetAllRequests",
    params: { searchString, pageNumber: currentPage, pageSize },
  });
}

export async function customerRejectRequest({
  id,
  rejectReason,
}: {
  id: number;
  rejectReason: string;
}) {
  return await post({
    url: `/Customer/RejectRequest/${id}`,
    data: { rejectReason },
  });
}

export async function getAllPentestRequestsAndProjects() {
  return await get<TRequestsAndProjectsResponse>({
    url: "/Customer/GetAllPentestRequestsAndProjects",
  });
}

export async function confirmCompleteProject({
  projectId,
}: {
  projectId: number;
}) {
  return await update({
    url: `/Customer/update-project-status-completed/${projectId}`,
  });
}

export async function getInvoiceOfCustomer() {
  return await get<TInvoiceOfCustomerResponse>({
    url: "/InvoicePayment/GetInvoiceOfCustomer",
  });
}

const paymentApiClient = axios.create({
  baseURL: "http://localhost:5173", // Không có `/api`
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

paymentApiClient.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");
    // console.log("🚀 ~ accessToken:", accessToken);
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Hàm lấy URL thanh toán từ API
export async function createPaymentUrl({
  invoiceId,
}: {
  invoiceId: string;
}): Promise<TCreatePaymentUrlResponse> {
  try {
    const response = await paymentApiClient.get<TCreatePaymentUrlResponse>(
      `/TransactionPayment/CreatePaymentUrl/${invoiceId}`
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Failed to create payment URL.";
  }
}
