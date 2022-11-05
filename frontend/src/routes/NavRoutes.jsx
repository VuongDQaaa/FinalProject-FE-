
import ManageUser from "../pages/users/AdminUser/ManageUser";
import ManageClassrom from "../pages/classroom/ManageClassrom";
//import ReportPage from "../pages/report/ReportPage";
import ManageSubject from "../pages/subject/ManageSubject";
import RequestForReturningPage from "../pages/request/RequestForReturning";
import ManageEmployee from "../pages/users/AdminEmployee/ManageEmployee";
// import ReportPage from "../pages/report/ReportPage";

export const NavRoutes = [

  {
    path: "/employee",
    element: <ManageEmployee />,
    title: "Manage Employee",
  },
  {
    path: "/student",
    element: <ManageUser />,
    title: "Manage Student",
  },
  {
    path: "/classroom",
    element: <ManageClassrom />,
    title: "Manage Classroom",
  },
  {
    path: "/subject",
    element: <ManageSubject />,
    title: "Manage Subject",
  },
  {
    path: "/tasks",
    element: <RequestForReturningPage />,
    title: "Manage Task",
  },

  // {
  //   path: "/report",
  //   element: <ReportPage />,
  //   title: "Manage Schedule",
  // },
];
