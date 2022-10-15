import Home from "../pages/Home";
import ManageUser from "../pages/users/AdminUser/ManageUser";
import ManageAssets from "../pages/assets/ManageAssets";
import ReportPage from "../pages/report/ReportPage";
import ManageAssignment from "../pages/assignments/ManageAssignment";
import RequestForReturningPage from "../pages/request/RequestForReturning";
import ManageEmployee from "../pages/users/AdminEmployee/ManageEmployee";
// import ReportPage from "../pages/report/ReportPage";

export const NavRoutes = [
  {
    path: "/",
    element: <Home />,
    title: "Home",
  },
  {
    path: "/employee",
    element: <ManageEmployee />,
    title: "Manage Employee",
  },
  {
    path: "/user",
    element: <ManageUser />,
    title: "Manage Student",
  },
  {
    path: "/asset",
    element: <ManageAssets />,
    title: "Manage Asset",
  },
  {
    path: "/assignment",
    element: <ManageAssignment />,
    title: "Manage Assignment",
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
];
