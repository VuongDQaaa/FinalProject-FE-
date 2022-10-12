import EditUserPage from "../pages/users/AdminUser/EditUserPage";
import Home from "../pages/Home";
import ManageUser from "../pages/users/AdminUser/ManageUser";
import CreateUserPage from "../pages/users/AdminUser/CreateUserPage";
import ManageAssets from "../pages/assets/ManageAssets";
import CreateAssetPage from "../pages/assets/CreateAssetPage";
import EditAssetPage from "../pages/assets/EditAssetPage";
import ReportPage from "../pages/report/ReportPage";
import RequestForReturningPage from "../pages/request/RequestForReturning";
import ManageAssignment from "../pages/assignments/ManageAssignment";
import CreateAssignmentPage from "../pages/assignments/CreateAssignmentPage";
import EditAssignmentPage from "../pages/assignments/EditAssignmentPage";
import ManageEmployee from "../pages/users/AdminEmployee/ManageEmployee";
import CreateEmployeePage from "../pages/users/AdminEmployee/CreateEmployeePage";
import EditEmployeePage from "../pages/users/AdminEmployee/EditEmployeePage";

export const AppRoutes = [
  {
    path: "/",
    element: <Home />,
    title: "Home",
  },
  {
    path: "/user",
    element: <ManageUser />,
    title: "Manage User",
  },
  {
    path: "/employee",
    element: <ManageEmployee />,
    title: "Manage Employee",
  },
  {
    path: "/asset",
    element: <ManageAssets />,
    title: "Manage Asset",
  },
  {
    path: "/editAsset/:id",
    element: <EditAssetPage />,
    title: "Manage Asset > Edit Asset",
  },
  {
    path: "/assignment",
    element: <ManageAssignment />,
    title: "Manage Assignment",
  },
  {
    path: "/createAssignment",
    element: <CreateAssignmentPage />,
    title: "Manage Assignment > Create Assignment",
  },
  {
    path: "/editAssignment/:id",
    element: <EditAssignmentPage />,
    title: "Manage Assignment > Edit Assignment",
  },
  {
    path: "/request",
    element: <RequestForReturningPage />,
    title: "Request for Returning",
  },

  {
    path: "/report",
    element: <ReportPage />,
    title: "Report",
  },

  {
    path: "/createUser",
    element: <CreateUserPage />,
    title: "Manage User > Create User",
  },
  {
    path: "/editUser/:studentId",
    element: <EditUserPage />,
    title: "Manage User > Edit User",
  },
  {
    path: "/createAsset",
    element: <CreateAssetPage />,
    title: "Manage Asset > Create Asset",
  },

  {
    path: "/createEmployee",
    element: <CreateEmployeePage />,
    title: "Manage Employee > Create Employee",
  },
  {
    path: "/editEmployee/:userId",
    element: <EditEmployeePage />,
    title: "Manage Employee > Edit Employee",
  },
];
