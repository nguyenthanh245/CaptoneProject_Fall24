// AppRouter.tsx
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import VerifyEmail from "./pages/Authentication/VerifyEmail";
import ProtectedRoute from "./routes/ProtectedRoute";
import AccessDenied from "./pages/Authentication/AccessDenied";
import UserManagement from "./pages/Admin/UserManagement";
import CustomerTicket from "./pages/Customer/CustomerTicket";
import GetStarted from "./pages/GetStarted";
import Profile from "./pages/Profile";
import RequestStatus from "./pages/Customer/RequestStatus";
import TicketManagement from "./pages/SOCManager/TicketManagement";
import PendingTicket from "./pages/SOCManager/PendingTicket";
import ApprovedTicket from "./pages/SOCManager/ApprovedTicket";
import ProjectManagement from "./pages/SOCManager/ProjectManagement";
import TeamManagement from "./pages/SOCManager/TeamManagement";
import OwnerVerification from "./pages/SOCManager/OwnerVerification";
import CommonLayout from "./layouts/Common/CommonLayout";
import NotFound from "./pages/NotFound";
import LeaderTeamManagement from "./pages/Leader/LeaderTeamManagement";
import ProjectAssignment from "./pages/Leader/ProjectManagement";
import ProjectDetails from "./pages/SOCManager/ProjectDetails";
import TaskManagement from "./pages/Pentester/TaskManagement";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import HistoryAssignedTask from "./pages/Leader/HistoryAssignedTask";
import HistoryTask from "./pages/Pentester/HistoryTask";
import Contract from "./pages/Contract";
import BlogDetail from "./pages/Blog/DetailBlog";
import BlogPage from "./pages/Blog/ViewBlog";
import MyProject from "./pages/Customer/MyProject";
import InvoiceManagement from "./pages/SOCManager/InvoiceManagement";
import MyInvoice from "./pages/Customer/MyInvoices";
import PaymentSuccess from "./pages/Customer/PaymentSuccess";
import PaymentFail from "./pages/Customer/PaymentFail";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify" element={<VerifyEmail />} />
      <Route path="/access-denied" element={<AccessDenied />} />
      <Route path="*" element={<NotFound />} />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute
            allowedRoles={[
              "ADMIN",
              "CUSTOMER",
              "SOCMANAGER",
              "LEADER",
              "PENTESTER",
            ]}
          />
        }
      >
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-fail" element={<PaymentFail />} />
        <Route element={<CommonLayout />}>
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/project-details/:id" element={<ProjectDetails />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contract/:pentestRequestId" element={<Contract />} />
          <Route path="/blog-detail/:blogId" element={<BlogDetail />} />
          <Route path="/blog-view" element={<BlogPage />} />

          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            <Route path="/admin/user-management" element={<UserManagement />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["SOCMANAGER"]} />}>
            <Route
              path="/socmanager/ticket-management"
              element={<TicketManagement />}
            />
            <Route
              path="/socmanager/pending-ticket"
              element={<PendingTicket />}
            />
            <Route
              path="/socmanager/approved-ticket"
              element={<ApprovedTicket />}
            />
            <Route
              path="/socmanager/project-management"
              element={<ProjectManagement />}
            />
            <Route
              path="/socmanager/team-management"
              element={<TeamManagement />}
            />
            <Route
              path="/socmanager/owner-verify"
              element={<OwnerVerification />}
            />
            <Route
              path="/socmanager/invoice-management"
              element={<InvoiceManagement />}
            />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["CUSTOMER"]} />}>
            <Route path="/customer/ticket" element={<CustomerTicket />} />
            <Route
              path="/customer/request-status"
              element={<RequestStatus />}
            />
            <Route path="/customer/my-project" element={<MyProject />} />
            <Route path="/customer/my-invoices" element={<MyInvoice />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["LEADER"]} />}>
            <Route
              path="/leader/project-assignment"
              element={<ProjectAssignment />}
            />
            <Route
              path="/leader/teamlead-management"
              element={<LeaderTeamManagement />}
            />
            <Route
              path="/leader/assigned-task"
              element={<HistoryAssignedTask />}
            />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["PENTESTER"]} />}>
            <Route
              path="/pentester/task-management"
              element={<TaskManagement />}
            />
            <Route path="/pentester/history-task" element={<HistoryTask />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
