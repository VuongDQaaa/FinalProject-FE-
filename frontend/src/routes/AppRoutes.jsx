import EditUserPage from "../pages/users/AdminUser/EditUserPage";
import Home from "../pages/Home";
import ManageUser from "../pages/users/AdminUser/ManageUser";
import CreateUserPage from "../pages/users/AdminUser/CreateUserPage";
import ManageClassrom from "../pages/classroom/ManageClassrom";
import ReportPage from "../pages/report/ReportPage";
import RequestForReturningPage from "../pages/request/RequestForReturning";
import ManageSubject from "../pages/subject/ManageSubject";

import ManageEmployee from "../pages/users/AdminEmployee/ManageEmployee";
import CreateEmployeePage from "../pages/users/AdminEmployee/CreateEmployeePage";
import EditEmployeePage from "../pages/users/AdminEmployee/EditEmployeePage";
import CreateTask from "../pages/request/CreateTask";
import EditTask from "../pages/request/EditTask";

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
    path: "/request",
    element: <RequestForReturningPage />,
    title: "Request for Returning",
  },
  {
    path: "/createTask",
    element: <CreateTask />,
    title: "Manage Task > Create Task",
  },
  {
    path: "/editTask/:taskId",
    element: <EditTask />,
    title: "Manage Task > Edit Task",
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
