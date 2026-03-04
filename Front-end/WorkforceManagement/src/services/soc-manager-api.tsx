import { get, post, update } from "./axios-config";

type TBaseResponse<T> = {
  code: number;
  message: string;
  data: T;
};

type TPendingTicketResponse = {
  code: number;
  message: string;
  data: TPendingTicketData;
};

type TPendingTicketData = {
  currentPage: number;
  pageSize: number;
  requests: TPendingTicketDataRequest[];
  totalPages: number;
  totalRequests: number;
};

type TPendingTicketDataRequest = {
  id: number;
  projectName: string;
  description: string;
  urls: string;
  createdAt: string;
  customerEmail: String;
  customerTaxCode: string;
};

type TApprovedRequestResponse = {
  code: number;
  message: string;
  data: TApprovedRequestData;
};

type TApprovedRequestData = {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalRequests: number;
  requests: TApprovedRequestDataRequest[];
};

type TApprovedRequestDataRequest = {
  id: number;
  projectName: string;
  description: string;
  teamLead: TTeamLeadInfo;
  createdAt: string;
};

type TTeamLeadInfo = {
  id: number;
  fullName: string;
  email: string;
};

export type TFormCreateProject = {
  name: string;
  description: string;
  endDate: string;
};

type TProjectResponse = TBaseResponse<TProjectData>;

type TProjectData = {
  currentPage: number;
  pageSize: number;
  projects: TProject[];
  totalPages: number;
  totalProjects: number;
};

type TProject = {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  statusId: number;
  teamId: number;
  createAt: string;
  statusName: string;
};

type TCreatedProjectResponse = {
  code: number;
  data: null;
  message: string;
};

type TTeamResponse = TBaseResponse<TTeamData>;

type TTeamData = {
  currentPage: number;
  pageSize: number;
  teams: TTeamDataTeams[];
  totalPages: number;
  totalTeams: number;
};

type TTeamDataTeams = {
  teamId: number;
  teamName: string;
  isParticipating: boolean;
};

type TLeaderWithoutTeamResponse = TBaseResponse<TLeaderWithoutTeamData[]>;

type TLeaderWithoutTeamData = {
  id: number;
  fullName: string;
  email: string;
};

export type TFormCreateTeam = {
  teamName: string;
  leaderId: number | null;
};

type TTeamMemberResponse = TBaseResponse<TTeamMemberData>;

type TTeamMemberData = {
  leader: {
    leaderId: number;
    fullName: string;
    email: string;
    imageProfile: string;
  };
  members: TTeamMember[];
};

type TTeamMember = {
  pentesterId: number;
  fullName: string;
  email: string;
  skills: string;
  certifications: string;
  imageProfile: string;
};

type TMembersWithoutTeamResponse = TBaseResponse<TMemberWithoutTeamData[]>;

type TMemberWithoutTeamData = {
  id: number;
  fullName: string;
  email: string;
  skills: string;
  certifications: string;
};

type TTeamNoInProjectResponse = TBaseResponse<TTeamNoInProjectData[]>;

type TTeamNoInProjectData = {
  teamId: number;
  teamName: string;
  leaderName: string;
  leaderEmail: string;
};

type TVerifyUrlResponse = {
  url: string;
  status: string;
  message: string | null;
  domainInfo: {
    domain: string;
    whoisInformation: {
      registrar: string | null;
      status: string | null;
      expirationDate: string | null;
      rawData: string; // JSON chuỗi chứa thêm thông tin chi tiết
      createdDate: string | null;
      updatedDate: string | null;
      expiresDate: string | null;
      domainAvailability: string | null;
      contactEmail: string | null;
      domainNameExt: string | null;
      estimatedDomainAge: number;
      ips: string[];
    };
    dnsInformation: {
      aRecords: string[];
      aaaaRecords: string[];
      mxRecords: string[];
      nsRecords: string[];
      soaRecord: string;
    };
  };
};

type TTopVulnerabilitiesResponse = TBaseResponse<TTopVulnerabilitiesData[]>;

type TTopVulnerabilitiesData = {
  name: string;
  count: number;
};

type TTopProjectsResponse = TBaseResponse<TTopProjectsData[]>;

type TTopProjectsData = {
  name: string;
  vulnerabilityCount: number;
};

type TCountSeverityAllProjectResponse = TBaseResponse<
  TCountSeverityAllProjectData[]
>;

type TCountSeverityAllProjectData = {
  severity: string;
  count: number;
};

type TProjectDetailsInfoResponse = TBaseResponse<TProjectDetailsInfoData>;

export type TProjectDetailsInfoData = {
  pentestRequest: {
    createAt: string;
    customer: {
      customerId: number;
      customerName: string;
    };
    description: string;
    id: number;
    projectName: string;
    statusId: number;
    urls: string;
  };
  project: {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    team: TProjectDetailsTeam;
    statusId: number;
    totalCost: number;
  };
};

type TProjectDetailsTeam = {
  teamId: number;
  teamName: string;
  leader: TProjectDetailsLeader;
};

type TProjectDetailsLeader = {
  teamId: number;
  fullNam: string;
  email: string;
};

type TMembersByProjectResponse = TBaseResponse<TMembersByProjectData>;

type TMembersByProjectData = {
  leader: TMembersByProjectLeader;
  members: TMembersByProjectPentester[];
};

type TMembersByProjectLeader = {
  id: number;
  fullName: string;
  email: string;
  skills: string;
  certifications: string;
};

export type TMembersByProjectPentester = {
  id: number;
  fullName: string;
  email: string;
  skills: string;
  certifications: string;
};

type TVulByProjectResponse = TBaseResponse<TVulByProjectData>;

type TVulByProjectData = {
  vulnerabilities: TVulByProjectDataDetail[];
  totalVulnerabilities: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
};

type TVulByProjectDataDetail = {
  id: number;
  description: string;
  severity: string;
  statusId: number;
  riskSeverity: string;
  url: string;
  assignedAt: string;
  instances: number;
  firstDetectedAt: string;
  lastUpdatedAt: string;
  actionReason: string;
  statusName: string;
};

type TProjectWithAssignedVulnerabilitiesResponse =
  TBaseResponse<TProjectWithAssignedVulnerabilitiesData>;

type TProjectWithAssignedVulnerabilitiesData = {
  project: TProjectWithAssignedVulData;
  vulnerabilities: TAssignedVulData[];
};

type TProjectWithAssignedVulData = {
  projectId: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  statusId: number;
  createdAt: string;
  updateAt: string;
};

type TAssignedVulData = {
  vulnerabilityId: number;
  description: string;
  assignedAt: string;
  assignedTo: number;
  assignedToName: string;
  reason: string;
  instances: number;
  severity: string;
  statusId: number;
  fixedAt: string;
  riskSeverity: string;
  url: string;
  status: string;
};

type TAllStatusByVulResponse = TBaseResponse<TAllStatusByVulData[]>;

type TAllStatusByVulData = {
  statusId: number;
  statusName: string;
  count: number;
};

type TStatusByProjectResponse = TBaseResponse<TStatusByProjectData[]>;

type TStatusByProjectData = {
  statusId: number;
  statusName: string;
  count: number;
};

type TCombinedInfoResponse = TBaseResponse<TCombinedInfoData>;

type TAllInvoiceResponse = TBaseResponse<TAllInvoiceData>;

type TAllInvoiceData = {
  totalInvoice: number;
  invoices: TAllInvoiceDataInvoices[];
};

export type TAllInvoiceDataInvoices = {
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
};

export type TCombinedInfoData = {
  pentestRequest: {
    id: number;
    customerId: number;
    customerName: string;
    projectName: string;
    description: string;
    urls: string;
    customerTaxCode: string;
    statusId: number;
    createdAt: string;
    customerEmail: string;
  };
  projects: [
    {
      id: number;
      name: string;
      description: string;
      startDate: string;
      endDate: string;
      statusName: string;
      totalCost: number;
      vulnerabilities: [
        {
          id: number;
          description: string;
          severity: string;
          firstDetectedAt: string;
          lastUpdatedAt: string;
          url: string;
          cost: number;
          statusName: string;
        }
      ];
    }
  ];
};

type TTasksByDateResponse = TBaseResponse<TTasksByDateData[]>;

export type TTasksByDateData = {
  user: {
    fullName: string;
    email: string;
    address: string;
    skills: string;
    certifications: string;
    proficiency: string;
    profileImage: string;
  };
  taskName: string;
  actionReason: string;
  statusName: string;
};

export async function getPendingRequest({
  searchString,
  currentPage,
  pageSize,
}: {
  searchString: string;
  currentPage: number;
  pageSize: number;
}) {
  return await get<TPendingTicketResponse>({
    url: "/SocManager/GetPendingRequests",
    params: { searchString, pageNumber: currentPage, pageSize },
  });
}

export async function approveRequest({ id }: { id: number }) {
  return await post({
    url: `/SocManager/ApproveRequest/${id}`,
  });
}

export async function rejectRequest({
  id,
  rejectReason,
}: {
  id: number;
  rejectReason: string;
}) {
  return await post({
    url: `/SocManager/RejectRequest/${id}`,
    data: { rejectReason },
  });
}

export async function getApprovedRequest({
  searchString,
  currentPage,
  pageSize,
}: {
  searchString: string;
  currentPage: number;
  pageSize: number;
}) {
  return await get<TApprovedRequestResponse>({
    url: "/SocManager/GetPentestRequestsForSOCManager",
    params: { searchString, pageNumber: currentPage, pageSize },
  });
}

export async function createPentestProject({
  id,
  data,
}: {
  id: number;
  data: TFormCreateProject;
}) {
  return await post<TCreatedProjectResponse>({
    url: `/SocManager/CreatePentestProject/${id}`,
    data: data,
  });
}

export async function getAllProjects({
  searchString,
  currentPage,
  pageSize,
}: {
  searchString: string;
  currentPage: number;
  pageSize: number;
}) {
  return await get<TProjectResponse>({
    url: "/SocManager/GetAllProjects",
    params: { searchString, pageNumber: currentPage, pageSize },
  });
}

export async function getAllTeams({
  searchString,
  currentPage,
  pageSize,
}: {
  searchString: string;
  currentPage: number;
  pageSize: number;
}) {
  return await get<TTeamResponse>({
    url: "/SocManager/GetAllTeams",
    params: { searchString, pageNumber: currentPage, pageSize },
  });
}

export async function getLeadersWithoutTeam() {
  return await get<TLeaderWithoutTeamResponse>({
    url: "/SocManager/GetLeadersWithoutTeam",
  });
}

export async function createNewTeam({
  createFormData,
}: {
  createFormData: TFormCreateTeam;
}) {
  return await post({
    url: "/SocManager/CreateTeam",
    data: createFormData,
  });
}

export async function getTeamMembers({ teamId }: { teamId: number }) {
  return await get<TTeamMemberResponse>({
    url: `/SocManager/GetTeamMembers/${teamId}`,
  });
}

export async function getPentestersWiththoutTeam() {
  return await get<TMembersWithoutTeamResponse>({
    url: "/SocManager/GetPentestersWiththoutTeam",
  });
}

export async function addPentesterToTeam({
  teamId,
  pentesterId,
}: {
  teamId: number;
  pentesterId: number;
}) {
  return await post({
    url: `/SocManager/AddPentestersToTeam/${teamId}`,
    data: [{ pentesterId }],
  });
}

export async function getAllTeamsNotInProject() {
  return await get<TTeamNoInProjectResponse>({
    url: "/SocManager/GetTeamsNotInProject",
  });
}

export async function assignTeamToProject({
  teamId,
  selectedProjectId,
}: {
  teamId: number;
  selectedProjectId: number;
}) {
  return await post({
    url: `/SocManager/AssignTeamToProject/${selectedProjectId}`,
    data: { teamId },
  });
}

export async function verifyUrl({ url }: { url: string }) {
  return await post<TVerifyUrlResponse>({
    url: "/DomainVerification/VerifyUrlInternational",
    data: { url },
  });
}

export async function getTopVulnerabilities() {
  return await get<TTopVulnerabilitiesResponse>({
    url: "/SocManager/GetTopVulnerabilities",
  });
}

export async function getTopProjects() {
  return await get<TTopProjectsResponse>({
    url: "/SocManager/GetTopProjects",
  });
}

export async function getVulnerabilityCountBySeverity() {
  return await get<TCountSeverityAllProjectResponse>({
    url: "/SocManager/GetVulnerabilityCountBySeverity",
  });
}

export async function getProjectDetails({ projectId }: { projectId: number }) {
  return await get<TProjectDetailsInfoResponse>({
    url: `/SocManager/GetProjectInfo/${projectId}`,
  });
}

export async function getMembersByProject({
  projectId,
}: {
  projectId: number;
}) {
  return await get<TMembersByProjectResponse>({
    url: `/SocManager/GetMembersByProject/${projectId}`,
  });
}

export async function importVulnerabilities({
  projectId,
  htmlFile,
}: {
  projectId: number;
  htmlFile: File;
}) {
  const formData = new FormData();
  formData.append("htmlFile", htmlFile);

  return await post<TBaseResponse<null>>({
    url: `/SocManager/ImportReport/${projectId}`,
    data: formData,
    config: {
      headers: {
        "Content-Type": "multipart/form-data", // Đặt header chính xác
      },
    },
  });
}

export async function getVulnerabilitiesByProject({
  projectId,
  searchString,
  currentPage,
  pageSize,
}: {
  projectId: number;
  searchString: string;
  currentPage: number;
  pageSize: number;
}) {
  return await get<TVulByProjectResponse>({
    url: `SocManager/GetVulnerabilitiesByProject/${projectId}`,
    params: { searchString, pageNumber: currentPage, pageSize },
  });
}

export async function countSeverityByProject({
  projectId,
}: {
  projectId: number;
}) {
  return await get<TCountSeverityAllProjectResponse>({
    // tuong tu kieu nen lay luon
    url: `/SocManager/CountVulnerabilitiesBySeverityForProject/${projectId}`,
  });
}

export async function getProjectWithAssignedVulnerabilities({
  projectId,
}: {
  projectId: number;
}) {
  return await get<TProjectWithAssignedVulnerabilitiesResponse>({
    url: `/SocManager/GetProjectWithAssignedVulnerabilities/${projectId}`,
  });
}

export async function getCountVulByStatus() {
  return await get<TAllStatusByVulResponse>({
    url: "/SocManager/CountVulByStatus",
  });
}

export async function getCountVulByStatusByProject({
  projectId,
}: {
  projectId: number;
}) {
  return await get<TStatusByProjectResponse>({
    url: `/SocManager/GetVulnerabilityCountByStatusForProject/${projectId}`,
  });
}

export async function getCombinedInfo({
  pentestRequestId,
}: {
  pentestRequestId: number;
}) {
  return await get<TCombinedInfoResponse>({
    url: `/SocManager/GetCombinedInfo/${pentestRequestId}`,
  });
}

export async function sendContract({ projectId }: { projectId: number }) {
  return await update({
    url: `/SocManager/update-project-tstaus-contract/${projectId}`,
  });
}

export async function getTasksByDate({
  selectedDate,
}: {
  selectedDate: string;
}) {
  return await get<TTasksByDateResponse>({
    url: `/SocManager/GetTasksByDate`,
    params: { selectedDate },
  });
}

export async function createInvoice({
  invoiceId,
  invoiceName,
  userId,
  userName,
  projectId,
  projectName,
  price,
  invoiceDescription,
  statusInvoice,
  createDate,
}: {
  invoiceId: string;
  invoiceName?: string;
  userId: number;
  userName?: string;
  projectId: number;
  projectName?: string;
  price: number;
  invoiceDescription?: string;
  statusInvoice?: string;
  createDate?: string;
}) {
  return await post({
    url: "/InvoicePayment/CreateInvoice",
    data: {
      invoiceId,
      userId,
      projectId,
      price,
      invoiceName,
      userName,
      projectName,
      invoiceDescription,
      statusInvoice,
      createDate,
    },
  });
}

export async function getAllInvoice() {
  return await get<TAllInvoiceResponse>({
    url: "/InvoicePayment/GetAllInvoice",
  });
}
